/* Cutform: native controls, no animation or form dependencies. */
(function () {
  'use strict';
  function safeAsset(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    const input = value.trim();
    if (/^(?:assets\/|\.\/assets\/)/.test(input) && !input.includes('..')) return input;
    try { const url = new URL(input); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
  }
  function mediaSource(item) {
    if (!item || typeof item !== 'object') return null;
    if (item.drive) {
      const raw = String(item.drive).trim();
      let id = raw, resource = '';
      if (raw.includes('://')) {
        try {
          const u = new URL(raw);
          if (u.protocol !== 'https:' || u.hostname !== 'drive.google.com') return null;
          id = u.pathname.match(/\/file\/d\/([\w-]+)/)?.[1] || u.searchParams.get('id') || '';
          resource = u.searchParams.get('resourcekey') || '';
        } catch { return null; }
      }
      if (!/^[\w-]{10,}$/.test(id)) return null;
      const suffix = resource ? '?resourcekey=' + encodeURIComponent(resource) : '';
      return { type: 'iframe', embed: 'https://drive.google.com/file/d/' + id + '/preview' + suffix, original: 'https://drive.google.com/file/d/' + id + '/view' + suffix };
    }
    if (item.youtube) {
      let id = String(item.youtube).trim();
      if (id.includes('://')) {
        try {
          const u = new URL(id);
          if (u.protocol !== 'https:') return null;
          if (u.hostname === 'youtu.be') id = u.pathname.slice(1);
          else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(u.hostname)) id = u.searchParams.get('v') || u.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] || '';
          else return null;
        } catch { return null; }
      }
      if (!/^[\w-]{11}$/.test(id)) return null;
      return { type: 'iframe', embed: 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0', original: 'https://www.youtube.com/watch?v=' + id };
    }
    if (item.vimeo) {
      let id = String(item.vimeo).trim();
      if (id.includes('://')) {
        try { const u = new URL(id); if (u.protocol !== 'https:' || !['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(u.hostname)) return null; id = u.pathname.match(/(?:\/video)?\/(\d+)\/?$/)?.[1] || ''; } catch { return null; }
      }
      if (!/^\d+$/.test(id)) return null;
      return { type: 'iframe', embed: 'https://player.vimeo.com/video/' + id + '?autoplay=1', original: 'https://vimeo.com/' + id };
    }
    const asset = safeAsset(item.video);
    return asset ? { type: 'video', embed: asset, original: asset } : null;
  }
  function buildBrief(values) {
    return 'Hi Cutform,\n\nI’m ' + values.name.trim() + '.\n\nI need a hand with: ' + values.service + '\n\n' + values.project.trim() + (values.footage.trim() ? '\n\nFootage / reference: ' + values.footage.trim() : '') + '\n\nThanks,\n' + values.name.trim();
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { safeAsset, mediaSource, buildBrief };
  if (typeof document === 'undefined') return;

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const consoleElement = document.querySelector('[data-console]');
  const scrub = document.querySelector('#scrubber');
  const play = document.querySelector('[data-play]');
  const heading = document.querySelector('#hero-title');
  const beats = [{ first: 'Make them', second: 'stay.', label: 'The hook' }, { first: 'Find the', second: 'rhythm.', label: 'The rhythm' }, { first: 'Leave a', second: 'feeling.', label: 'The feeling' }];
  let currentBeat = 0, frame = 0, started = 0, playing = false;
  function showFrame(value) {
    const time = Math.min(6000, Math.max(0, Number(value) || 0));
    scrub.value = String(time);
    scrub.parentElement.style.setProperty('--position', (time / 60) + '%');
    document.querySelector('.timecode').textContent = '00:' + String(Math.floor(time / 1000)).padStart(2, '0') + ':' + String(Math.floor(time % 1000 / 1000 * 24)).padStart(2, '0');
    const beat = Math.min(2, Math.floor(time / 2000));
    scrub.setAttribute('aria-valuetext', beats[beat].label + ', ' + (time / 1000).toFixed(1) + ' seconds');
    if (beat !== currentBeat) {
      currentBeat = beat;
      heading.replaceChildren(document.createTextNode(beats[beat].first), document.createElement('br'));
      const em = document.createElement('em'); em.textContent = beats[beat].second; heading.append(em);
      const caret = document.createElement('span'); caret.className = 'cut-caret'; caret.setAttribute('aria-hidden', 'true'); heading.append(caret);
    }
  }
  function stop() { playing = false; cancelAnimationFrame(frame); play.textContent = '▶'; play.setAttribute('aria-label', 'Play the title sequence'); }
  function tick(now) { if (!playing) return; const time = now - started; showFrame(time); if (time >= 6000) stop(); else frame = requestAnimationFrame(tick); }
  play.addEventListener('click', () => { if (playing) return stop(); if (+scrub.value >= 6000) showFrame(0); playing = true; started = performance.now() - +scrub.value; play.textContent = 'Ⅱ'; play.setAttribute('aria-label', 'Pause the title sequence'); frame = requestAnimationFrame(tick); });
  scrub.addEventListener('input', () => { stop(); showFrame(scrub.value); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(consoleElement);
  consoleElement.hidden = false;

  const dialog = document.querySelector('#player');
  const stage = document.querySelector('#player-stage');
  let trigger = null;
  function openVideo(item, source, button) {
    if (!dialog.showModal) { window.open(source.original, '_blank', 'noopener,noreferrer'); return; }
    trigger = button;
    document.querySelector('#player-title').textContent = item.title || 'Selected work';
    document.querySelector('#player-description').textContent = item.description || '';
    document.querySelector('#player-source').href = source.original;
    const media = document.createElement(source.type);
    if (source.type === 'iframe') {
      media.title = item.title || 'Selected work video';
      media.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      media.allowFullscreen = true;
      media.referrerPolicy = 'strict-origin-when-cross-origin';
    } else { media.controls = true; media.autoplay = true; media.playsInline = true; }
    media.src = source.embed;
    stage.replaceChildren(media);
    dialog.showModal();
    document.querySelector('[data-close-player]').focus();
  }
  document.querySelector('[data-close-player]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { stage.replaceChildren(); trigger?.focus(); });
  function element(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; }
  const projects = typeof CUTFORM_WORK !== 'undefined' && Array.isArray(CUTFORM_WORK) ? CUTFORM_WORK : [];
  const grid = document.querySelector('#work-grid');
  let count = 0;
  for (const item of projects) {
    const source = mediaSource(item);
    if (!source || !item.title) continue;
    count++;
    const card = element('article', 'work-item' + (item.feature ? ' work-feature' : ''));
    const button = element('button', 'work-open'); button.type = 'button'; button.setAttribute('aria-label', 'Play ' + item.title);
    if (['9/16','16/9','1/1','4/5'].includes(item.ratio)) button.style.aspectRatio = item.ratio;
    const fallback = element('span', 'work-fallback', String(count).padStart(2, '0')); fallback.setAttribute('aria-hidden','true'); button.append(fallback);
    const poster = safeAsset(item.poster);
    if (poster) { const img = element('img'); img.src = poster; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); button.append(img); }
    const preview = safeAsset(item.preview);
    if (preview && !reduced.matches) {
      const video = element('video'); video.src = preview; video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'none'; video.setAttribute('aria-hidden','true'); button.append(video);
      const begin = async () => { try { await video.play(); if (button.matches(':hover,:focus-visible')) button.classList.add('is-previewing'); else video.pause(); } catch {} };
      const end = () => { video.pause(); button.classList.remove('is-previewing'); };
      button.addEventListener('pointerenter', begin); button.addEventListener('focus', begin); button.addEventListener('pointerleave', end); button.addEventListener('blur', end);
      button.addEventListener('click', end);
      document.addEventListener('visibilitychange', () => { if (document.hidden) end(); });
    }
    const label = element('span','work-play'); label.append(element('span','play-circle','▶'),element('span','mono','Watch the cut')); button.append(label);
    if (item.duration) button.append(element('span','work-duration mono',item.duration));
    button.addEventListener('click', () => openVideo(item,source,button));
    const caption = element('div','work-caption'); caption.append(element('h3','',item.title));
    caption.append(element('p','work-meta mono',[item.kind,item.credit || item.client].filter(Boolean).join(' / ')));
    if (item.description) caption.append(element('p','work-desc',item.description));
    card.append(button,caption); grid.append(card);
  }
  if (count) { grid.hidden = false; document.querySelector('#work-empty').hidden = true; }

  const brief = document.querySelector('#brief');
  const status = document.querySelector('#form-status');
  function values() { const data = new FormData(brief); return { name: String(data.get('name') || ''), service: String(data.get('service') || ''), project: String(data.get('project') || ''), footage: String(data.get('footage') || '') }; }
  function validBrief() { const data = values(); if (!data.name.trim()) brief.elements.name.value = ''; if (!data.project.trim()) brief.elements.project.value = ''; return brief.reportValidity(); }
  async function copyText(text, success) {
    try { await navigator.clipboard.writeText(text); status.textContent = success; return true; }
    catch {
      let fallback = document.querySelector('#manual-copy');
      if (!fallback) { const label = element('label','field','Select and copy this text'); label.htmlFor = 'manual-copy'; fallback = element('textarea'); fallback.id = 'manual-copy'; fallback.readOnly = true; fallback.rows = 8; label.append(fallback); brief.append(label); }
      fallback.value = text; fallback.focus(); fallback.select(); status.textContent = 'Automatic copying is unavailable. The text below is selected for you to copy.'; return false;
    }
  }
  brief.addEventListener('submit', event => {
    event.preventDefault(); if (!validBrief()) return;
    const data = values(); const body = buildBrief(data);
    window.location.href = 'mailto:cutform.agency@gmail.com?subject=' + encodeURIComponent('Project enquiry — ' + data.service) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Your draft is ready for your mail app. If it didn’t open, copy your brief below and email us.';
  });
  document.querySelector('[data-copy-brief]').addEventListener('click', async () => { if (!validBrief()) return; await copyText(buildBrief(values()), 'Brief copied. Paste it into an email to cutform.agency@gmail.com.'); });
  const emailCopy = document.querySelector('[data-copy-email]');
  emailCopy.hidden = false; emailCopy.addEventListener('click', async () => { if (await copyText('cutform.agency@gmail.com', 'Email address copied.')) { emailCopy.textContent = 'Email copied'; setTimeout(() => emailCopy.textContent = 'Copy email', 2500); } });
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { const service = link.dataset.service; for (const radio of brief.querySelectorAll('input[name="service"]')) radio.checked = radio.value === service; }));
  brief.hidden = false;
})();
