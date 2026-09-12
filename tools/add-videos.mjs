/* Keeps docs/js/work.js in step with docs/videos/, and adds Drive links
   without you opening a file. Run it with add-videos.cmd, or: node tools/add-videos.mjs
   Plain Node, no packages. */
import { readdir, readFile, writeFile, rename, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, extname, basename } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const videoDir = join(root, 'docs/videos');
const workFile = join(root, 'docs/js/work.js');
const KINDS = ['.mp4', '.webm', '.mov', '.m4v', '.ogv'];
const STILLS = ['.jpg', '.jpeg', '.png', '.webp'];
const HEADER = `/* YOUR PROJECTS. The first one in the list gets the big featured layout.

   Easiest way — a file in docs/videos/ only needs a title and the filename.
   The site reads the length, the shape and a thumbnail frame out of the file:

     { title: "Name of the edit", kind: "Reel", video: "videos/name.mp4" },

   A Google Drive video needs its sharing link, set to "Anyone with the link".
   Its thumbnail comes from Drive on its own:

     { title: "Name of the edit", kind: "Reel", drive: "https://drive.google.com/file/d/..." },

   Or run add-videos.cmd in the site folder and it writes these lines for you.

   THUMBNAILS. Save a picture next to the video with the same name --
   videos/name.mp4 and videos/name.jpg -- then run add-videos.cmd and it is
   picked up. Without one, the site uses a frame from the video itself.

   NEVER copy poster: or preview: from another entry. Those point at that
   entry's own picture files, which is why a copied block shows the wrong
   thumbnail. Leave them out and each video supplies its own.

   Everything else is optional: description, credit, duration, ratio,
   still (seconds — which frame to use as the thumbnail), feature: true.
   Instead of drive you can also use youtube or vimeo.                      */`;

// Field order in the file, so every entry reads the same way.
const ORDER = ['title', 'titleAr', 'kind', 'kindAr', 'description', 'descriptionAr',
  'credit', 'creditAr', 'client', 'duration', 'ratio', 'video', 'drive', 'youtube',
  'vimeo', 'poster', 'preview', 'still', 'feature'];

const webSafe = name => {
  const ext = extname(name).toLowerCase();
  const slug = basename(name, extname(name))
    .normalize('NFKD').replace(/[^\w\s-]/g, '').trim()
    .replace(/[\s_]+/g, '-').replace(/-+/g, '-').toLowerCase();
  return (slug || 'video') + ext;
};
const prettyTitle = file => basename(file, extname(file))
  .replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  .replace(/^./, c => c.toUpperCase());

function serialise(entries) {
  const blocks = entries.map(entry => {
    const lines = ORDER.filter(key => entry[key] !== undefined && entry[key] !== '')
      .map(key => `    ${key}: ${JSON.stringify(entry[key])}`);
    return '  {\n' + lines.join(',\n') + '\n  }';
  });
  return `${HEADER}\nconst CUTFORM_WORK = [\n${blocks.join(',\n')}\n];\n`;
}

async function readEntries() {
  if (!existsSync(workFile)) return [];
  const text = await readFile(workFile, 'utf8');
  const open = text.indexOf('[', text.indexOf('CUTFORM_WORK'));
  const close = text.lastIndexOf(']');
  if (open < 0 || close < open) throw new Error('Could not find the project list in docs/js/work.js');
  // The list is a plain array literal, so Node can read it directly.
  const list = new Function(`return ${text.slice(open, close + 1)};`)();
  return Array.isArray(list) ? list.filter(item => item && typeof item === 'object') : [];
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const lines = rl[Symbol.asyncIterator]();
// Pulling lines this way works the same whether someone is typing or the
// input is piped in, and running out of input just means "finished".
const ask = async question => {
  process.stdout.write(question);
  const next = await lines.next().catch(() => ({ done: true }));
  if (next.done) { process.stdout.write('\n'); return ''; }
  return String(next.value).trim();
};

console.log('\n  Cutform — project list\n  ----------------------\n');

let entries = await readEntries();
const notes = [];

// 1. Give every file in docs/videos/ a name that works in a URL.
let files = [];
const pictures = new Map();   // video stem -> picture filename beside it
if (existsSync(videoDir)) {
  for (const name of await readdir(videoDir)) {
    const ext = extname(name).toLowerCase();
    const isVideo = KINDS.includes(ext), isPicture = STILLS.includes(ext);
    if (!isVideo && !isPicture) continue;
    let safe = webSafe(name);
    if (safe !== name) {
      // Windows filenames are case-insensitive, so a name that differs only by
      // case is the same file, not a clash. GitHub Pages is case-sensitive, so
      // it is worth lowercasing anyway.
      const sameFile = safe.toLowerCase() === name.toLowerCase();
      if (!sameFile && existsSync(join(videoDir, safe))) {
        notes.push(`kept "${name}" as it is — a different "${safe}" is already here`);
        safe = name;
      } else {
        await rename(join(videoDir, name), join(videoDir, safe));
        notes.push(`renamed "${name}" to "${safe}" so it works in a web address`);
      }
    }
    if (isVideo) files.push(safe);
    else pictures.set(basename(safe, extname(safe)), safe);
  }
}

// A picture saved beside a video, under the same name, becomes its thumbnail.
const pictureFor = file => {
  const still = pictures.get(basename(file, extname(file)));
  return still ? `videos/${still}` : null;
};
function applyPicture(entry, file) {
  const still = pictureFor(file);
  const current = typeof entry.poster === 'string' ? entry.poster : '';
  if (still && current !== still) {
    entry.poster = still;
    notes.push(`thumbnail for "${entry.title || file}" set to ${still}`);
  } else if (!still && current.startsWith('videos/')) {
    delete entry.poster;
    notes.push(`thumbnail for "${entry.title || file}" removed — ${current} is gone`);
  }
}

// 2. Local entries follow the folder. Everything else is left exactly as it is.
const listed = new Set();
const kept = [];
for (const entry of entries) {
  if (typeof entry.video !== 'string') { kept.push(entry); continue; }
  const name = basename(entry.video);
  if (files.includes(name)) { listed.add(name); applyPicture(entry, name); kept.push(entry); }
  else notes.push(`removed "${entry.title || name}" — ${entry.video} is no longer in docs/videos/`);
}
entries = kept;

for (const name of files) {
  if (listed.has(name)) continue;
  const entry = { title: prettyTitle(name), kind: 'Reel', credit: 'Edit, motion & sound', video: `videos/${name}` };
  const still = pictureFor(name);
  if (still) entry.poster = still;
  entries.push(entry);
  notes.push(`added "${entry.title}" from videos/${name}${still ? ` with thumbnail ${still}` : ''}`);
}

// 3. Drive links, as many as you like.
console.log('  In the list now:');
entries.forEach((entry, i) => {
  const where = entry.video ? 'own file' : entry.drive ? 'Drive' : entry.youtube ? 'YouTube' : entry.vimeo ? 'Vimeo' : '?';
  console.log(`    ${String(i + 1).padStart(2, ' ')}. ${entry.title || '(no title)'}  [${where}]${i === 0 ? '  <- featured' : ''}`);
});
console.log('');

for (;;) {
  const link = await ask('  Paste a Google Drive link to add one (or just press Enter to finish): ');
  if (!link) break;
  const id = link.match(/\/file\/d\/([\w-]{10,})/)?.[1] || link.match(/[?&]id=([\w-]{10,})/)?.[1]
    || (/^[\w-]{10,}$/.test(link) ? link : null);
  if (!id) { console.log('  That does not look like a Drive file link. Try the one from Share > Copy link.\n'); continue; }
  if (entries.some(entry => typeof entry.drive === 'string' && entry.drive.includes(id))) {
    console.log('  That video is already in the list.\n'); continue;
  }
  const title = (await ask('  Title for it: ')) || 'Untitled edit';
  const shape = (await ask('  Shape — press Enter for vertical 9/16, or type 16/9, 1/1, 4/5: ')) || '9/16';
  const entry = { title, kind: 'Reel', credit: 'Edit, motion & sound', drive: `https://drive.google.com/file/d/${id}/view` };
  if (['16/9', '1/1', '4/5'].includes(shape)) entry.ratio = shape;
  entries.push(entry);
  notes.push(`added "${title}" from Drive`);
  console.log('  Added. Remember it must be shared as "Anyone with the link".\n');
}

if (!notes.length) {
  console.log('  Nothing to change — the list already matches your files.\n');
  rl.close();
  process.exit(0);
}

if (existsSync(workFile)) await copyFile(workFile, workFile + '.bak');
await writeFile(workFile, serialise(entries), 'utf8');

console.log('\n  Done:');
for (const note of notes) console.log('    - ' + note);
console.log(`\n  Wrote docs/js/work.js (the previous version is work.js.bak).`);
console.log('  Open the site and refresh. To reorder or rename, edit docs/js/work.js.\n');
rl.close();
