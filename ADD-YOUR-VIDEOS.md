# Add your videos to Cutform

Open `docs/js/work.js`. Each project is one entry in the list. The site replaces the “Next up” panel with your real projects automatically as soon as a valid entry is present.

## The quickest way: add-videos.cmd

Double-click `add-videos.cmd` in the site folder. It:

- lists what is in your project list already,
- picks up any new file you dropped into `docs/videos/` and writes the entry,
- renames files so they work in a web address (`full video.mp4` becomes
  `full-video.mp4`),
- drops entries whose file you deleted,
- and asks you to paste Google Drive links, one after another, so you never
  open a file to add one.

It keeps titles and descriptions you have already written, never touches your
Drive entries, and saves the previous list as `work.js.bak` before writing.

Afterwards, open `docs/js/work.js` only if you want to rename something or
change the order. The first entry in the list gets the big featured layout.

## Thumbnails

Save a picture next to the video, under the same name, and run
`add-videos.cmd`:

```
docs/videos/documentary.mp4
docs/videos/documentary.jpg     <- becomes its thumbnail
```

`.jpg`, `.png` and `.webp` all work. Delete the picture and run the tool again
and the site goes back to using a frame from the video. You can also write
`poster: "videos/documentary.jpg"` into the entry yourself.

Without a picture, a self-hosted video shows a frame from about a second in.
`still: 4` picks a different second. A Drive video uses Drive's own thumbnail.

## Shapes

You do not set the shape of a self-hosted video. The site measures the file and
fits the layout and the player to it, so a 16:9 documentary opens in a wide
player and a 9:16 reel opens in a tall one.

Every card in the grid is the same size whatever the video's shape — the video
sits inside that frame. That is deliberate: a mixed grid of tall and wide boxes
reads as clutter, and nothing on the page should be louder than the work.

Drive cannot tell the page anything about the file, so for a landscape Drive
video add `ratio: "16/9"` yourself. The options are `"9/16"`, `"16/9"`,
`"1/1"` and `"4/5"`.

## The kind field is just a label

`kind: "Reel"` prints the word next to your credit, as `REEL / EDIT, MOTION &
SOUND`. Write whatever describes the piece — `Documentary`, `Short film`,
`Ad` — it has no effect on where the video comes from. Where it comes from is
decided by `video:`, `drive:`, `youtube:` or `vimeo:`.

## What an entry actually needs

For a file in `docs/videos/`, just this:

```js
{ title: "Name of the edit", kind: "Reel", video: "videos/name.mp4" },
```

The site reads the rest out of the file itself: the real length for the badge,
the shape of the frame for the layout, and a frame about a second in for the
thumbnail. Add `still: 3` to pick a different second for that frame.

For Google Drive, just this:

```js
{ title: "Name of the edit", kind: "Reel", drive: "https://drive.google.com/file/d/…/view" },
```

Drive supplies the thumbnail. Drive cannot tell the page the length or shape, so
add `duration: "00:38"` and `ratio: "9/16"` yourself if you want those shown.

**Do not copy `poster:` or `preview:` from another entry.** Those two lines point
at one specific video's picture files. Copying a whole block, including those
lines, is why a new video shows the previous video's thumbnail. Leave them out
and each video supplies its own.

## The videos folder

`docs/videos/` is yours. Put the finished file there and point an entry at it:

```js
{
  title: "Your actual project name",
  kind: "Reel",
  credit: "Edit, motion & sound",
  description: "One line about the edit.",
  duration: "00:24",
  ratio: "9/16",
  video: "videos/my-reel.mp4",
  poster: "videos/my-reel.jpg"
}
```

Why this is the better option: the video plays inside your own page with normal
controls and full screen, and the visitor is never sent to Drive. There is no
“Open original” link on a self-hosted file, because there is nowhere else to go.

An entry may carry both `video` and `drive`. The file in `videos/` always wins;
Drive stays as a silent backup you do not have to remove. Whenever you do get a
file out of Drive, drop it in `videos/`, add the one `video:` line, and that
project stops depending on Drive.

If you skip `poster`, a self-hosted file shows its own first frame as the
thumbnail and plays the clip quietly on hover. A real chosen frame still looks
better, so add one when you have it.

Paths must start with `videos/` or `assets/`. MP4 with H.264 video and AAC audio
plays everywhere. GitHub rejects any single file over 100 MB, so keep exports
lean (a 9:16 reel at 1080p is usually well under 20 MB) or use Git LFS for the
big ones.

## Google Drive

1. Open a video in Drive. Choose Share and give your intended visitors permission to view it. For a public portfolio, the video needs “Anyone with the link” viewer access. Only use work you have permission to show publicly.
2. Copy the sharing link.
3. Add an entry like this inside the square brackets in `work.js`:

```js
{
  title: "Your actual project name",
  kind: "Reel",
  credit: "Edit, motion & sound",
  description: "whatever.",
  duration: "00:24",
  ratio: "9/16",
  drive: "https://drive.google.com/file/d/1zBNLAlJJDwegrQ3157HmN4SzKfm4J6UL/view?usp=drivesdk",
  poster: "assets/work/project-01.jpg",
  feature: false
},
```

The site converts Drive sharing links into embedded previews. The viewer can also choose “Open original” if Drive requires sign-in, blocks playback, or the embed does not load. Drive controls video availability and processing; the site cannot override its access settings.

## Thumbnails and preview clips

Create `docs/assets/work/` and put your thumbnail there. Use a real frame from the video; a portrait thumbnail works well for a portrait reel. Set `poster` to the matching path. If you omit the poster or it cannot load, the site tries a Drive or YouTube thumbnail automatically. If the provider also cannot supply a thumbnail, a branded frame appears. Vimeo and local files need a supplied poster for a photographic thumbnail.

Optional: add `preview: "assets/work/project-01-preview.mp4"` for a short silent local MP4. The most visible preview can play automatically when its frame comes into view; hover or keyboard focus also starts it. Only one preview plays at a time. Preview files should be small and contain no audio. Previews are disabled for visitors who prefer reduced motion. Your first reel now includes a real frame and a six-second silent preview derived from the supplied Drive video.

The first project automatically gets the large featured layout. Add `feature: true` to any additional project that deserves the same treatment. Other projects form an offset two-column contact sheet on larger screens and adapt to smaller screens. Set `ratio` to `"9/16"`, `"16/9"`, `"1/1"` or `"4/5"` to match the video. The images and preview clips show the complete frame rather than cropping out your editing.

You can use `youtube: "VIDEO_ID_OR_HTTPS_URL"`, `vimeo: "VIDEO_ID_OR_PUBLIC_URL"`, or `video: "assets/work/video.mp4"` instead of `drive`. Use one video source per entry. Vimeo private/unlisted hash links are not supported by this simple config; use a public Vimeo URL or Drive/YouTube instead.

## Contact

The primary action opens Gmail in a new tab with `cutform.agency@gmail.com`, a subject and the visitor's project details filled in. Visitors can select Outlook or their configured email app instead. A sign-in may be needed. The site never sends the email automatically. The Instagram link opens a message conversation with `cutform.agency`; Instagram may require sign-in. Visitors can copy their brief and paste it into the conversation.

## Languages and number of videos

There is no hard limit on the number of entries in the list. All valid entries appear; thumbnails load lazily and the full player is only created when a visitor clicks. A very large collection will still make the page long, so put your strongest projects first.

Videos play inside a dialog on your site. A self-hosted file from `videos/`
never offers a way off the page. A Drive or YouTube entry plays in place too,
and carries one quiet line underneath — “Video not loading? Open the backup” —
for the case where the provider refuses to play inside an embed. Visitors also
leave only if their browser is too old to support the in-page dialog.

The language button switches English and Arabic, including controls, form messages and right-to-left layout. It remembers the visitor's choice on their device. The Arabic is written as its own copy rather than a translation of the English, so the two are deliberately not line-for-line matches. Project names and descriptions stay in their original language unless you add the optional fields `titleAr`, `descriptionAr`, `kindAr` and `creditAr` to an entry. These contain your own Arabic wording; the site does not machine-translate your projects.

## If the opening looks still

The title sequence respects the visitor's reduced-motion setting. With it on, the
lines still change on a cross dissolve, but the letter-by-letter assembly, the
glow and the colour split are held back.

On Windows that setting is Settings → Accessibility → Visual effects → Animation
effects. It is currently **off** on this machine, so the full sequence will not
play here until it is switched on. Nothing is wrong with the site if you see the
dissolve instead.

## Hosting elsewhere

The `docs` folder is the complete deployable site. Upload its contents to your hosting provider. Update the canonical URL, `og:url`, and absolute `og:image` URL in `docs/index.html` to the real public address before sharing the public site. The supplied social-preview image is retained.

## GitHub

Every link inside the site is relative, so it runs from any folder or subpath
without edits.

For GitHub Pages, the cleanest setup is Settings → Pages → Deploy from a branch,
branch `main`, folder `/ (root)` — then move the *contents* of `dist` to the top
level of the repository so `index.html` sits beside `assets/`, `css/`, `js/` and
`videos/`. If you would rather keep the `dist` folder as it is, Pages can serve
`/docs` instead: rename `dist` to `docs` and pick that folder.

Either way, remember to update the canonical and `og:` URLs in `index.html` to
the github.io address, or the previews will keep pointing at the old host.

Large video files live in git history forever, so add them deliberately. If a
file is over 100 MB, GitHub will refuse the push; use Git LFS or leave that one
on `drive:`.

The original Downloads folder has not been edited. This is the enhanced copy.
