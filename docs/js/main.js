/* Cutform: native controls, no animation or form dependencies. */
(function () {
  'use strict';
  function safeAsset(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    const input = value.trim();
    if (/^(?:\.\/)?(?:assets|videos)\//.test(input) && !input.includes('..')) return input;
    try { const url = new URL(input); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
  }
  function mediaSource(item) {
    if (!item || typeof item !== 'object') return null;
    // A file in videos/ always wins: it plays here, with no trip to Drive.
    const own = safeAsset(item.video);
    if (own) return { type: 'video', embed: own, original: own, local: true };
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
    return null;
  }
  function buildBrief(values) {
    const name=values.name.trim(), project=values.project.trim(), footage=values.footage.trim();
    if(values.language==='ar') return 'مرحبا كتفورم،\n\nأنا '+name+'.\n\nمحتاج مساعدة في: '+values.service+'\n\n'+project+(footage?'\n\nاللقطات / المرجع: '+footage:'')+'\n\nشكرا،\n'+name;
    return 'Hi Cutform,\n\nI’m '+name+'.\n\nI need a hand with: '+values.service+'\n\n'+project+(footage?'\n\nFootage / reference: '+footage:'')+'\n\nThanks,\n'+name;
  }
  function buildContactLinks(values) {
    const body=buildBrief(values), subject=(values.language==='ar'?'استفسار عن مشروع — ':'Project enquiry — ')+values.service;
    const to='cutform.agency@gmail.com';
    return {
      gmail:'https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to,su:subject,body}),
      outlook:'https://outlook.live.com/mail/0/deeplink/compose?'+new URLSearchParams({to,subject,body}),
      app:'mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body),
      instagram:'https://ig.me/m/cutform.agency'
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { safeAsset, mediaSource, buildBrief, buildContactLinks };
  if (typeof document === 'undefined') return;

  const t = key => window.CutformI18n.t(key);
  const language = () => window.CutformI18n.language;
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const consoleElement = document.querySelector('[data-console]');
  const scrub = document.querySelector('#scrubber');
  const play = document.querySelector('[data-play]');
  const heading = document.querySelector('#hero-title');
  const heroType = document.querySelector('.hero-type');
  let currentBeat=-1, frame=0, started=0, playing=false, animateTitles=false, titleAnimations=[];
  const EASE='cubic-bezier(.16,.84,.24,1)';
  const SPLIT='-9px 0 0 rgba(213,183,139,.85), 9px 0 0 rgba(116,196,214,.5)';
  const NOSPLIT='0 0 0 rgba(213,183,139,0), 0 0 0 rgba(116,196,214,0)';
  // Letters are only worth separating when they will move individually, and
  // never in Arabic: splitting it breaks the joins that hold a word together.
  const perLetter=()=>language()!=='ar' && !reduced.matches;
  function splitLine(container, text) {
    if(!perLetter()){container.textContent=text;return [container];}
    const parts=[], chunks=String(text).split(' ');
    chunks.forEach((chunk,index)=>{
      const group=document.createElement('span');group.className='ch-word';
      for(const character of Array.from(chunk)){
        const glyph=document.createElement('span');glyph.className='ch';glyph.textContent=character;
        group.append(glyph);parts.push(glyph);
      }
      container.append(group);
      if(index<chunks.length-1)container.append(document.createTextNode(' '));
    });
    return parts;
  }
  function renderTitle(beat) {
    titleAnimations.forEach(animation=>animation.cancel());titleAnimations=[];
    const words=t('beat'+beat);
    const spoken=document.createElement('span');spoken.className='sr-only';spoken.textContent=words[0]+' '+words[1];
    const visual=document.createElement('span');visual.className='title-visual';visual.setAttribute('aria-hidden','true');
    const first=document.createElement('span');first.className='title-top';
    const word=document.createElement('em');word.className='title-word';
    const caret=document.createElement('span');caret.className='cut-caret';
    const topGlyphs=splitLine(first,words[0]), wordGlyphs=splitLine(word,words[1]);
    visual.append(first,document.createElement('br'),word,caret);
    heading.replaceChildren(spoken,visual);
    if(!animateTitles || typeof visual.animate!=='function')return;
    // Every animation stays paused: the timeline sets its position, so the
    // sequence can be scrubbed backwards as easily as it plays forwards.
    const add=(element,frames,options)=>{
      const animation=element.animate(frames,Object.assign({fill:'both',easing:EASE},options));
      animation.pause();titleAnimations.push(animation);
    };
    if(reduced.matches){
      // Reduced motion still gets the change, as a dissolve with no movement.
      add(first,[{opacity:0},{opacity:1}],{duration:430,easing:'ease'});
      add(word,[{opacity:0},{opacity:1}],{duration:520,delay:150,easing:'ease'});
      add(caret,[{opacity:0},{opacity:1}],{duration:320,delay:280,easing:'ease'});
      return;
    }
    const rtl=language()==='ar', reveal=rtl?'inset(0 0 0 100%)':'inset(0 100% 0 0)';
    const held='inset(-22% -10% -34% -10%)';
    // Every effect is shaped to the letters rather than painted over them, so
    // nothing shows its own box: a bloom on the glyphs for the flash frame, two
    // frames of colour split, a whip settle, then the line assembles with a
    // highlight that travels letter by letter like a light passing across it.
    add(visual,[{filter:'drop-shadow(0 0 30px rgba(242,226,196,.85)) brightness(1.3)'},
      {filter:'drop-shadow(0 0 22px rgba(242,226,196,.5)) brightness(1.12)',offset:.32},
      {filter:'drop-shadow(0 0 0 rgba(242,226,196,0)) brightness(1)'}],{duration:340,easing:'ease-out'});
    for(const line of [first,word])add(line,
      [{textShadow:SPLIT},{textShadow:SPLIT,offset:.16},{textShadow:NOSPLIT}],
      {duration:270,easing:'ease-out'});
    add(visual,[{transform:'translateX('+(rtl?20:-20)+'px) skewX('+(rtl?-2.2:2.2)+'deg)'},{transform:'none'}],
      {duration:400});
    topGlyphs.forEach((glyph,index)=>add(glyph,
      [{opacity:0,transform:'translateY(24px) rotate(3deg)',filter:'blur(7px) drop-shadow(0 0 0 rgba(255,248,232,0))'},
       {opacity:1,transform:'none',filter:'blur(0) drop-shadow(0 0 14px rgba(255,248,232,.7))',offset:.66},
       {opacity:1,transform:'none',filter:'blur(0) drop-shadow(0 0 0 rgba(255,248,232,0))'}],
      {duration:620,delay:index*26}));
    wordGlyphs.forEach((glyph,index)=>add(glyph,
      [{opacity:0,transform:'translateY(18px) scale(.93)',filter:'blur(9px) drop-shadow(0 0 0 rgba(250,232,198,0))',clipPath:reveal},
       {opacity:1,transform:'none',filter:'blur(0) drop-shadow(0 0 20px rgba(250,232,198,.9))',offset:.62,clipPath:held},
       {opacity:1,transform:'none',filter:'blur(0) drop-shadow(0 0 0 rgba(250,232,198,0))',clipPath:held}],
      {duration:820,delay:170+index*34}));
    add(caret,[{opacity:0,transform:'rotate(15deg) translateY(26px) scaleY(.35)'},{opacity:1,transform:'rotate(15deg) translateY(0) scaleY(1)'}],
      {duration:500,delay:230,easing:'ease-out'});
    add(caret,[{opacity:1},{opacity:1,offset:.46},{opacity:.12,offset:.5},{opacity:.12,offset:.96},{opacity:1}],
      {duration:1000,delay:800,iterations:Infinity,fill:'forwards',easing:'steps(1,end)'});
  }
  function showFrame(value, force=false) {
    const time=Math.min(6000,Math.max(0,Number(value)||0));scrub.value=String(time);
    scrub.parentElement.style.setProperty('--position',(time/60)+'%');
    document.querySelector('.timecode').textContent='00:'+String(Math.floor(time/1000)).padStart(2,'0')+':'+String(Math.floor(time%1000/1000*24)).padStart(2,'0');
    const beat=Math.min(2,Math.floor(time/2000));
    scrub.setAttribute('aria-valuetext',t('beat'+beat)[2]+', '+(time/1000).toFixed(1)+' '+t('second'));
    if(beat!==currentBeat || force){currentBeat=beat;renderTitle(beat);}
    const local=time>=6000?2000:time%2000;
    titleAnimations.forEach(animation=>animation.currentTime=local);
    consoleElement.dataset.beat=String(beat);
  }
  function stop(){
    playing=false;cancelAnimationFrame(frame);
    const ended=Number(scrub.value)>=6000;
    play.textContent=ended?'↺':'▶';play.setAttribute('aria-label',t(ended?'replay':'play'));
    consoleElement.classList.remove('is-playing');heroType.classList.remove('is-cutting');
  }
  function tick(now){if(!playing)return;const time=now-started;showFrame(time);if(time>=6000)stop();else frame=requestAnimationFrame(tick);}
  play.addEventListener('click',()=>{
    if(playing)return stop();
    animateTitles=true;if(+scrub.value>=6000)scrub.value='0';showFrame(scrub.value,true);
    playing=true;started=performance.now()-+scrub.value;play.textContent='Ⅱ';play.setAttribute('aria-label',t('pause'));
    consoleElement.classList.add('is-playing');heroType.classList.add('is-cutting');play.classList.remove('is-waiting');
    frame=requestAnimationFrame(tick);
  });
  scrub.addEventListener('input',()=>{play.classList.remove('is-waiting');stop();const first=!animateTitles;animateTitles=true;showFrame(scrub.value,first);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(consoleElement);
  reduced.addEventListener('change',()=>{animateTitles=false;showFrame(scrub.value,true);});
  consoleElement.hidden=false;showFrame(0);
  // A single quiet pulse says the opening is playable, and stops on first use.
  play.classList.add('is-waiting');

  // A small playhead follows natural page scrolling; no scroll hijacking.
  const scrollCut=document.querySelector('[data-scroll-cut]');
  const scrollTrack=document.querySelector('.scroll-cut-track');
  const chapters=[['.hero','opening'],['#work','work'],['#services','services'],['#studio','studio'],['#process','process'],['.belief','belief'],['#contact','contact']].map(([selector,key])=>({element:document.querySelector(selector),key}));
  let scrollFrame=0;
  const revealing=[];
  function updateScroll(){
    scrollFrame=0;const y=window.scrollY,max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),percent=Math.round(Math.min(100,Math.max(0,y/max*100)));
    scrollCut.hidden=y<160 || document.querySelector('#player')?.open;
    scrollCut.style.setProperty('--scroll-progress',percent+'%');
    scrollTrack.setAttribute('aria-valuenow',String(percent));
    document.querySelector('[data-scroll-percent]').textContent=percent+'%';
    let chapter=chapters[0];for(const candidate of chapters)if(candidate.element.getBoundingClientRect().top<window.innerHeight*.45)chapter=candidate;
    document.querySelector('[data-scroll-section]').textContent=t(chapter.key);
    settleReveals();
  }
  function requestScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);}
  // Reveals settle straight off the scroll event rather than inside the animation
  // frame: a throttled or stalled frame must never leave a heading clipped away.
  function onScroll(){settleReveals();requestScroll();}
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
  if('ResizeObserver' in window)new ResizeObserver(onScroll).observe(document.body);
  // A reveal hides its element until it has been seen, so it must be impossible to
  // leave one hidden. Three independent triggers release it -- the observer, the raw
  // scroll event, and the sweeps below -- and once released the clip is dropped for
  // good. Relying on the observer alone left headings invisible on some phones.
  const revealWatcher='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting)release(entry.target);
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
  function arm(el,className){
    el.classList.add(className);revealing.push(el);revealWatcher?.observe(el);
  }
  function release(el){
    const at=revealing.indexOf(el);if(at<0)return;
    revealing.splice(at,1);revealWatcher?.unobserve(el);enter(el);
  }
  function enter(el){
    el.classList.add('has-entered');
    const done=()=>el.classList.add('reveal-done');
    el.addEventListener('transitionend',done,{once:true});
    setTimeout(done,1400);
  }
  function settleReveals(){
    for(let i=revealing.length-1;i>=0;i--){
      const el=revealing[i];
      if(el.getBoundingClientRect().top<window.innerHeight-40)release(el);
    }
  }
  if(!reduced.matches){
    document.querySelectorAll('.section h2,.belief h2').forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight)arm(el,'scroll-reveal');});
  }
  // Last resort: anything still armed and on screen after the page settles is shown,
  // so a stalled frame or a restored-from-cache page never leaves a title invisible.
  const sweep=()=>{settleReveals();requestScroll();};
  window.addEventListener('load',()=>{sweep();setTimeout(sweep,500);});
  window.addEventListener('pageshow',sweep);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)sweep();});
  requestScroll();settleReveals();

  const dialog = document.querySelector('#player');
  const stage = document.querySelector('#player-stage');
  let trigger = null, activeProject = null;
  const projectViews=[];
  const projectText=(item,key)=>language()==='ar'?(item[key+'Ar']||item[key]||''):(item[key]||'');
  function openVideo(item, source, button) {
    if (!dialog.showModal) { window.open(source.original, '_blank', 'noopener,noreferrer'); return; }
    trigger = button;activeProject=item;scrollCut.hidden=true;
    const shape=(['9/16','16/9','1/1','4/5'].includes(item.ratio)?item.ratio:item.measured)||'9/16';
    dialog.dataset.shape=shape;
    document.querySelector('#player-title').textContent = projectText(item,'title') || t('video');
    document.querySelector('#player-description').textContent = projectText(item,'description');
    const sourceLink = document.querySelector('#player-source');
    sourceLink.href = source.original;
    sourceLink.textContent = t('fallback');
    sourceLink.hidden = Boolean(source.local);
    const media = document.createElement(source.type);
    if (source.type === 'iframe') {
      media.title = projectText(item,'title') || t('video');
      media.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      media.allowFullscreen = true;
      media.referrerPolicy = 'strict-origin-when-cross-origin';
    } else {
      media.controls = true; media.autoplay = true; media.playsInline = true;
      media.setAttribute('controlslist', 'nodownload');
      const still = safeAsset(item.poster); if (still) media.poster = still;
      media.addEventListener('loadedmetadata', () => {
        if (!media.videoWidth || !media.videoHeight) return;
        item.measured = nearestRatio(media.videoWidth / media.videoHeight);
        if (!['9/16','16/9','1/1','4/5'].includes(item.ratio)) dialog.dataset.shape = item.measured;
      }, { once: true });
    }
    media.src = source.embed;
    stage.replaceChildren(media);
    dialog.showModal();
    document.querySelector('[data-close-player]').focus();
  }
  document.querySelector('[data-close-player]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { stage.replaceChildren();activeProject=null;trigger?.focus();requestScroll(); });
  function element(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; }
  const projects=typeof CUTFORM_WORK!=='undefined' && Array.isArray(CUTFORM_WORK)?CUTFORM_WORK:[];
  const grid=document.querySelector('#work-grid');
  const validProjects=projects.map(item=>({item,source:mediaSource(item)})).filter(record=>record.source && record.item.title);
  const previews=[];
  let activePreview=null;
  function pausePreview(record){
    record.video.pause();
    if(record.stillAt)try{record.video.currentTime=record.stillAt;}catch{}
    record.button.classList.remove('is-previewing');if(activePreview===record)activePreview=null;
  }
  function nearestRatio(value){
    const shapes=[['9/16',9/16],['4/5',.8],['1/1',1],['16/9',16/9]];
    return shapes.reduce((best,shape)=>Math.abs(shape[1]-value)<Math.abs(best[1]-value)?shape:best)[0];
  }
  function clockFace(seconds){
    const total=Math.round(seconds);
    return String(Math.floor(total/60)).padStart(2,'0')+':'+String(total%60).padStart(2,'0');
  }
  async function beginPreview(record){
    if(reduced.matches || document.hidden || dialog.open)return;
    if(activePreview && activePreview!==record)pausePreview(activePreview);
    activePreview=record;
    try{await record.video.play();if(activePreview===record)record.button.classList.add('is-previewing');else record.video.pause();}catch{if(activePreview===record)activePreview=null;}
  }
  function bestVisiblePreview(){
    if(reduced.matches || document.hidden || dialog.open){if(activePreview)pausePreview(activePreview);return;}
    const next=previews.filter(record=>record.visibility>.6).sort((a,b)=>b.visibility-a.visibility)[0];
    if(next && next!==activePreview)beginPreview(next);else if(!next && activePreview)pausePreview(activePreview);
  }
  const previewObserver=!reduced.matches && 'IntersectionObserver' in window?new IntersectionObserver(entries=>{
    for(const entry of entries){const record=previews.find(record=>record.button===entry.target);if(record)record.visibility=entry.isIntersecting?entry.intersectionRatio:0;}
    bestVisiblePreview();
  },{threshold:[0,.25,.6,.8,1]}):null;
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(activePreview)pausePreview(activePreview);}else bestVisiblePreview();});
  reduced.addEventListener('change',bestVisiblePreview);
  const revealCards=!reduced.matches;
  validProjects.forEach(({item,source},index)=>{
    const feature=index===0 || item.feature;
    const card=element('article','work-item'+(feature?' work-feature':''));
    const button=element('button','work-open');button.type='button';button.setAttribute('aria-label',t('playVideo')+' '+projectText(item,'title'));
    const ratio=['9/16','16/9','1/1','4/5'].includes(item.ratio)?item.ratio:'9/16';
    card.dataset.ratio=ratio;
    const ratioLabel=element('span','',ratio.replace('/',':'));
    const durationBadge=element('span','work-duration mono',item.duration||'');
    durationBadge.hidden=!item.duration;
    const fallback=element('span','work-fallback');fallback.setAttribute('aria-hidden','true');
    const mark=element('img','work-fallback-mark');mark.src='assets/cutform-mark.png';mark.alt='';fallback.append(mark);button.append(fallback);
    const backdrop=element('img','work-backdrop');backdrop.alt='';backdrop.setAttribute('aria-hidden','true');button.append(backdrop);
    const candidates=[];const poster=safeAsset(item.poster);if(poster)candidates.push(poster);
    if(source.type==='iframe'){
      const embed=new URL(source.embed);
      if(embed.hostname==='drive.google.com'){
        const id=embed.pathname.split('/')[3],params=new URLSearchParams({id,sz:'w1200'});
        if(embed.searchParams.has('resourcekey'))params.set('resourcekey',embed.searchParams.get('resourcekey'));
        candidates.push('https://drive.google.com/thumbnail?'+params);
      } else if(embed.hostname.endsWith('youtube-nocookie.com')){
        candidates.push('https://i.ytimg.com/vi/'+embed.pathname.split('/').pop()+'/hqdefault.jpg');
      }
    }
    if(candidates.length){
      const img=element('img','work-cover');img.alt='';img.loading='lazy';img.decoding='async';
      let candidate=0;
      img.addEventListener('load',()=>{button.classList.add('has-visual');backdrop.src=img.currentSrc||img.src;});
      img.addEventListener('error',()=>{candidate++;if(candidate<candidates.length)img.src=candidates[candidate];else img.remove();});
      img.src=candidates[0];button.append(img);
    }
    const preview=safeAsset(item.preview) || (source.local ? source.embed : null);
    if(preview){
      const video=element('video','work-preview');video.src=preview;video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');button.append(video);
      const ownFrame=source.local && !candidates.length;
      if(ownFrame)button.classList.add('has-visual','shows-still');
      const record={video,button,visibility:0,stillAt:0};previews.push(record);
      // Anything the entry left out, the file itself can answer.
      if(source.local && (ownFrame || !item.duration || !item.ratio)){
        video.preload='metadata';
        video.addEventListener('loadedmetadata',()=>{
          if(!item.duration && isFinite(video.duration) && video.duration>0){
            durationBadge.textContent=clockFace(video.duration);durationBadge.hidden=false;
          }
          if(video.videoWidth && video.videoHeight){
            const shape=nearestRatio(video.videoWidth/video.videoHeight);
            item.measured=shape;
            if(!item.ratio){card.dataset.ratio=shape;ratioLabel.textContent=shape.replace('/',':');}
          }
          if(ownFrame && isFinite(video.duration)){
            // A reel often opens on black, so rest on a frame a moment later.
            record.stillAt=Math.min(Number(item.still)>0?Number(item.still):1.2,Math.max(0,video.duration-.15));
            try{video.currentTime=record.stillAt;}catch{}
          }
        },{once:true});
      }
      button.addEventListener('pointerenter',()=>beginPreview(record));button.addEventListener('focus',()=>beginPreview(record));
      button.addEventListener('pointerleave',()=>{pausePreview(record);bestVisiblePreview();});button.addEventListener('blur',()=>{pausePreview(record);bestVisiblePreview();});
      video.addEventListener('error',()=>{record.visibility=0;pausePreview(record);});
      previewObserver?.observe(button);
    }
    const top=element('span','work-screen-top mono');top.setAttribute('aria-hidden','true');top.append(element('span','','CF / '+String(index+1).padStart(2,'0')),ratioLabel);button.append(top);
    const label=element('span','work-play');label.append(element('span','play-circle','▶'),element('span','mono',t('watch')));button.append(label);
    button.append(durationBadge);
    const open=trigger=>{if(activePreview)pausePreview(activePreview);openVideo(item,source,trigger);};
    button.addEventListener('click',()=>open(button));
    const caption=element('div','work-caption');caption.dir='auto';
    const captionTop=element('div','work-caption-top');captionTop.append(element('span','work-index',String(index+1).padStart(2,'0')),element('span','work-feature-label mono',t(feature?'featured':'selected')));caption.append(captionTop);
    caption.append(element('h3','',projectText(item,'title')));
    caption.append(element('p','work-meta mono',[projectText(item,'kind'),projectText(item,'credit')||item.client].filter(Boolean).join(' / ')));
    if(item.description || item.descriptionAr)caption.append(element('p','work-desc',projectText(item,'description')));
    const watch=element('button','work-caption-play',t('watch')+' ↗');watch.type='button';watch.addEventListener('click',()=>open(watch));caption.append(watch);
    card.append(button,caption);grid.append(card);projectViews.push({item,button,caption,label,feature});
    if(revealCards){card.style.transitionDelay=(index%3)*90+'ms';arm(card,'work-reveal');}
  });
  if(validProjects.length){grid.hidden=false;document.querySelector('#work-empty').hidden=true;}

  const brief = document.querySelector('#brief');
  const status = document.querySelector('#form-status');
  const provider=document.querySelector('#email-provider');
  const emailLink=document.querySelector('#open-email');
  function values(){
    const data=new FormData(brief), raw=String(data.get('service')||'');
    const services=['Reels & short form','Creator content','Motion & finishing',"Let's figure it out"],index=services.indexOf(raw);
    return {name:String(data.get('name')||''),service:index>=0?t('service'+index):raw,project:String(data.get('project')||''),footage:String(data.get('footage')||''),language:language()};
  }
  // On a phone a mail.google.com link lands in the browser, not in the Gmail app.
  // A mailto: hands off to whichever mail app the phone is set up with -- Gmail for
  // almost everyone -- so touch devices get the app and desktops keep Gmail on the web.
  const touchDevice=window.matchMedia('(hover:none) and (pointer:coarse)');
  function mailtoHref(subject){
    return 'mailto:cutform.agency@gmail.com'+(subject?'?subject='+encodeURIComponent(subject):'');
  }
  function updateMailLinks(){
    const phone=touchDevice.matches;
    const direct=document.querySelector('.contact-direct>a[href*="mail.google.com"],.contact-direct>a[href^="mailto:"]');
    if(direct){
      direct.href=phone?mailtoHref(''):'https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:'cutform.agency@gmail.com'});
      if(phone)direct.removeAttribute('target');else direct.target='_blank';
    }
    const reel=document.querySelector('.empty-copy .text-link');
    if(reel && phone){
      reel.href=mailtoHref(language()==='ar'?'هل يمكنني مشاهدة أعمالكم؟':'Can I see your reel?');
      reel.removeAttribute('target');
    }
  }
  function updateEmail(){
    const selected=['gmail','outlook','app'].includes(provider.value)?provider.value:'gmail';
    emailLink.href=buildContactLinks(values())[selected];
    emailLink.querySelector('[data-email-label]').textContent=t(selected);
    if(selected==='app')emailLink.removeAttribute('target');else emailLink.target='_blank';
  }
  // Same reasoning for the brief: on a phone the draft should land in the mail app.
  if(touchDevice.matches && provider.value==='gmail')provider.value='app';
  touchDevice.addEventListener('change',()=>{updateMailLinks();updateEmail();});
  function validBrief(){
    const data=values();
    brief.elements.name.setCustomValidity(data.name.trim()?'':t('nameRequired'));
    brief.elements.project.setCustomValidity(data.project.trim()?'':t('projectRequired'));
    brief.elements.footage.setCustomValidity('');
    if(brief.elements.footage.validity.typeMismatch)brief.elements.footage.setCustomValidity(t('urlInvalid'));
    return brief.reportValidity();
  }
  async function copyText(text,success){
    try{await navigator.clipboard.writeText(text);status.textContent=success;return true;}
    catch{
      let fallback=document.querySelector('#manual-copy');
      if(!fallback){const label=element('label','field');label.htmlFor='manual-copy';label.append(element('span','manual-copy-label',t('manual')));fallback=element('textarea');fallback.id='manual-copy';fallback.readOnly=true;fallback.rows=8;fallback.dir='auto';label.append(fallback);brief.append(label);}
      fallback.value=text;fallback.focus();fallback.select();status.textContent=t('copyFailed');return false;
    }
  }
  brief.addEventListener('input',event=>{if(typeof event.target.setCustomValidity==='function')event.target.setCustomValidity('');updateEmail();});
  brief.addEventListener('change',updateEmail);
  provider.addEventListener('change',updateEmail);
  emailLink.addEventListener('click',event=>{
    if(!validBrief()){event.preventDefault();return;}
    // Keep this a native HTTPS link: no popup script or mailto-handler dependency.
    updateEmail();status.textContent=t('draft');
  });
  brief.addEventListener('submit',event=>{event.preventDefault();if(validBrief())emailLink.click();});
  document.querySelector('[data-copy-brief]').addEventListener('click',async()=>{if(validBrief())await copyText(buildBrief(values()),t('copied'));});
  const emailCopy=document.querySelector('[data-copy-email]');
  emailCopy.hidden=false;emailCopy.addEventListener('click',async()=>{if(await copyText('cutform.agency@gmail.com',t('emailCopied'))){emailCopy.textContent=t('emailDone');setTimeout(()=>emailCopy.textContent=t('copyEmail'),2500);}});
  document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const service=link.dataset.service;for(const radio of brief.querySelectorAll('input[name="service"]'))radio.checked=radio.value===service;updateEmail();}));
  document.addEventListener('cutform:language',()=>{
    updateMailLinks();
    stop();animateTitles=false;showFrame(scrub.value,true);updateEmail();requestScroll();status.textContent='';
    for(const field of [brief.elements.name,brief.elements.project,brief.elements.footage])field.setCustomValidity('');
    document.querySelector('.manual-copy-label')?.replaceChildren(document.createTextNode(t('manual')));
    document.querySelector('#player-source').textContent=t('fallback');
    for(const view of projectViews){
      view.button.setAttribute('aria-label',t('playVideo')+' '+projectText(view.item,'title'));
      view.caption.querySelector('h3').textContent=projectText(view.item,'title');
      view.caption.querySelector('.work-meta').textContent=[projectText(view.item,'kind'),projectText(view.item,'credit')||view.item.client].filter(Boolean).join(' / ');
      const desc=view.caption.querySelector('.work-desc');if(desc)desc.textContent=projectText(view.item,'description');
      view.label.querySelector('.mono').textContent=t('watch');
      view.caption.querySelector('.work-feature-label').textContent=t(view.feature?'featured':'selected');
      view.caption.querySelector('.work-caption-play').textContent=t('watch')+' ↗';
    }
    if(activeProject){document.querySelector('#player-title').textContent=projectText(activeProject,'title');document.querySelector('#player-description').textContent=projectText(activeProject,'description');const media=stage.querySelector('iframe');if(media)media.title=projectText(activeProject,'title');}
  });
  updateMailLinks();
  updateEmail();
  brief.hidden = false;
})();
