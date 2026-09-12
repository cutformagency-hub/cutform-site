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
    const name=values.name.trim(), project=values.project.trim(), footage=values.footage.trim();
    if(values.language==='ar') return 'مرحبًا كتفورم،\n\nأنا '+name+'.\n\nأحتاج مساعدة في: '+values.service+'\n\n'+project+(footage?'\n\nاللقطات / المرجع: '+footage:'')+'\n\nشكرًا،\n'+name;
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
  let currentBeat=-1, frame=0, started=0, playing=false, animateTitles=false, titleAnimations=[];
  function renderTitle(beat) {
    titleAnimations.forEach(animation=>animation.cancel());titleAnimations=[];
    const words=t('beat'+beat);
    const first=document.createElement('span');first.className='title-top';first.textContent=words[0];
    const word=document.createElement('em');word.className='title-word';word.textContent=words[1];
    const caret=document.createElement('span');caret.className='cut-caret';caret.setAttribute('aria-hidden','true');
    heading.replaceChildren(first,document.createElement('br'),word,caret);
    if(animateTitles && !reduced.matches && typeof word.animate==='function') {
      const rtl=language()==='ar';
      titleAnimations=[
        first.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,fill:'both',easing:'cubic-bezier(.16,.84,.24,1)'}),
        word.animate([{clipPath:rtl?'inset(0 0 0 100%)':'inset(0 100% 0 0)',opacity:.25,transform:'translateY(12px)'},{clipPath:'inset(-18% -8% -30% -8%)',opacity:1,transform:'translateY(0)'}],{duration:850,delay:120,fill:'both',easing:'cubic-bezier(.16,.84,.24,1)'}),
        caret.animate([{opacity:0,transform:'rotate(15deg) translateY(20px)'},{opacity:1,transform:'rotate(15deg) translateY(0)'}],{duration:500,delay:250,fill:'both',easing:'ease-out'})
      ];
      titleAnimations.forEach(animation=>animation.pause());
    }
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
  function stop(){playing=false;cancelAnimationFrame(frame);play.textContent='▶';play.setAttribute('aria-label',t('play'));consoleElement.classList.remove('is-playing');}
  function tick(now){if(!playing)return;const time=now-started;showFrame(time);if(time>=6000)stop();else frame=requestAnimationFrame(tick);}
  play.addEventListener('click',()=>{
    if(playing)return stop();
    animateTitles=true;if(+scrub.value>=6000)scrub.value='0';showFrame(scrub.value,true);
    playing=true;started=performance.now()-+scrub.value;play.textContent='Ⅱ';play.setAttribute('aria-label',t('pause'));consoleElement.classList.add('is-playing');frame=requestAnimationFrame(tick);
  });
  scrub.addEventListener('input',()=>{stop();const first=!animateTitles;animateTitles=true;showFrame(scrub.value,first);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(consoleElement);
  reduced.addEventListener('change',()=>{animateTitles=false;showFrame(scrub.value,true);});
  consoleElement.hidden=false;showFrame(0);

  // A small playhead follows natural page scrolling; no scroll hijacking.
  const scrollCut=document.querySelector('[data-scroll-cut]');
  const scrollTrack=document.querySelector('.scroll-cut-track');
  const chapters=[['.hero','opening'],['#work','work'],['#services','services'],['#studio','studio'],['#process','process'],['.belief','belief'],['#contact','contact']].map(([selector,key])=>({element:document.querySelector(selector),key}));
  let scrollFrame=0;
  function updateScroll(){
    scrollFrame=0;const y=window.scrollY,max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),percent=Math.round(Math.min(100,Math.max(0,y/max*100)));
    scrollCut.hidden=y<160 || document.querySelector('#player')?.open;
    scrollCut.style.setProperty('--scroll-progress',percent+'%');
    scrollTrack.setAttribute('aria-valuenow',String(percent));
    document.querySelector('[data-scroll-percent]').textContent=percent+'%';
    let chapter=chapters[0];for(const candidate of chapters)if(candidate.element.getBoundingClientRect().top<window.innerHeight*.45)chapter=candidate;
    document.querySelector('[data-scroll-section]').textContent=t(chapter.key);
  }
  function requestScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);}
  window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll);
  if('ResizeObserver' in window)new ResizeObserver(requestScroll).observe(document.body);
  if(!reduced.matches && 'IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('has-entered');reveal.unobserve(entry.target);}},{threshold:.12});
    document.querySelectorAll('.section h2,.belief h2').forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('scroll-reveal');reveal.observe(el);}});
  }
  requestScroll();

  const dialog = document.querySelector('#player');
  const stage = document.querySelector('#player-stage');
  let trigger = null, activeProject = null;
  const projectViews=[];
  const projectText=(item,key)=>language()==='ar'?(item[key+'Ar']||item[key]||''):(item[key]||'');
  function openVideo(item, source, button) {
    if (!dialog.showModal) { window.open(source.original, '_blank', 'noopener,noreferrer'); return; }
    trigger = button;activeProject=item;scrollCut.hidden=true;dialog.dataset.portrait=String((item.ratio||'9/16')!=='16/9');
    document.querySelector('#player-title').textContent = projectText(item,'title') || t('video');
    document.querySelector('#player-description').textContent = projectText(item,'description');
    document.querySelector('#player-source').href = source.original;
    const media = document.createElement(source.type);
    if (source.type === 'iframe') {
      media.title = projectText(item,'title') || t('video');
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
  dialog.addEventListener('close', () => { stage.replaceChildren();activeProject=null;trigger?.focus();requestScroll(); });
  function element(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; }
  const projects=typeof CUTFORM_WORK!=='undefined' && Array.isArray(CUTFORM_WORK)?CUTFORM_WORK:[];
  const grid=document.querySelector('#work-grid');
  const validProjects=projects.map(item=>({item,source:mediaSource(item)})).filter(record=>record.source && record.item.title);
  const previews=[];
  let activePreview=null;
  function pausePreview(record){record.video.pause();record.button.classList.remove('is-previewing');if(activePreview===record)activePreview=null;}
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
  validProjects.forEach(({item,source},index)=>{
    const feature=index===0 || item.feature;
    const card=element('article','work-item'+(feature?' work-feature':''));
    const button=element('button','work-open');button.type='button';button.setAttribute('aria-label',t('playVideo')+' '+projectText(item,'title'));
    const ratio=['9/16','16/9','1/1','4/5'].includes(item.ratio)?item.ratio:'9/16';
    card.dataset.ratio=ratio;
    const fallback=element('span','work-fallback');fallback.setAttribute('aria-hidden','true');
    const mark=element('img','work-fallback-mark');mark.src='assets/cutform-mark.png';mark.alt='';fallback.append(mark);button.append(fallback);
    const backdrop=element('img','work-backdrop');backdrop.alt='';backdrop.setAttribute('aria-hidden','true');button.append(backdrop);
    const candidates=[];const poster=safeAsset(item.poster);if(poster)candidates.push(poster);
    if(item.drive){const u=new URL(source.embed);const id=u.pathname.split('/')[3];const params=new URLSearchParams({id,sz:'w1200'});if(u.searchParams.has('resourcekey'))params.set('resourcekey',u.searchParams.get('resourcekey'));candidates.push('https://drive.google.com/thumbnail?'+params);}
    else if(item.youtube){const id=new URL(source.embed).pathname.split('/').pop();candidates.push('https://i.ytimg.com/vi/'+id+'/hqdefault.jpg');}
    if(candidates.length){
      const img=element('img','work-cover');img.alt='';img.loading='lazy';img.decoding='async';
      let candidate=0;
      img.addEventListener('load',()=>{button.classList.add('has-visual');backdrop.src=img.currentSrc||img.src;});
      img.addEventListener('error',()=>{candidate++;if(candidate<candidates.length)img.src=candidates[candidate];else img.remove();});
      img.src=candidates[0];button.append(img);
    }
    const preview=safeAsset(item.preview);
    if(preview){
      const video=element('video','work-preview');video.src=preview;video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');button.append(video);
      const record={video,button,visibility:0};previews.push(record);
      button.addEventListener('pointerenter',()=>beginPreview(record));button.addEventListener('focus',()=>beginPreview(record));
      button.addEventListener('pointerleave',()=>{pausePreview(record);bestVisiblePreview();});button.addEventListener('blur',()=>{pausePreview(record);bestVisiblePreview();});
      video.addEventListener('error',()=>{record.visibility=0;pausePreview(record);});
      previewObserver?.observe(button);
    }
    const top=element('span','work-screen-top mono');top.setAttribute('aria-hidden','true');top.append(element('span','','CF / '+String(index+1).padStart(2,'0')),element('span','',ratio.replace('/',':')));button.append(top);
    const label=element('span','work-play');label.append(element('span','play-circle','▶'),element('span','mono',t('watch')));button.append(label);
    if(item.duration)button.append(element('span','work-duration mono',item.duration));
    const open=trigger=>{if(activePreview)pausePreview(activePreview);openVideo(item,source,trigger);};
    button.addEventListener('click',()=>open(button));
    const caption=element('div','work-caption');caption.dir='auto';
    const captionTop=element('div','work-caption-top');captionTop.append(element('span','work-index',String(index+1).padStart(2,'0')),element('span','work-feature-label mono',t(feature?'featured':'selected')));caption.append(captionTop);
    caption.append(element('h3','',projectText(item,'title')));
    caption.append(element('p','work-meta mono',[projectText(item,'kind'),projectText(item,'credit')||item.client].filter(Boolean).join(' / ')));
    if(item.description || item.descriptionAr)caption.append(element('p','work-desc',projectText(item,'description')));
    const watch=element('button','work-caption-play',t('watch')+' ↗');watch.type='button';watch.addEventListener('click',()=>open(watch));caption.append(watch);
    card.append(button,caption);grid.append(card);projectViews.push({item,button,caption,label,feature});
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
  function updateEmail(){
    const selected=['gmail','outlook','app'].includes(provider.value)?provider.value:'gmail';
    emailLink.href=buildContactLinks(values())[selected];
    emailLink.querySelector('[data-email-label]').textContent=t(selected);
    if(selected==='app')emailLink.removeAttribute('target');else emailLink.target='_blank';
  }
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
    stop();animateTitles=false;showFrame(scrub.value,true);updateEmail();requestScroll();status.textContent='';
    for(const field of [brief.elements.name,brief.elements.project,brief.elements.footage])field.setCustomValidity('');
    document.querySelector('.manual-copy-label')?.replaceChildren(document.createTextNode(t('manual')));
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
  updateEmail();
  brief.hidden = false;
})();
