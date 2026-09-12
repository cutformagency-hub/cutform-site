(function () {
  'use strict';
  // Authored translations only. Project copy can provide optional titleAr,
  // descriptionAr, kindAr and creditAr fields in work.js.
  const copy = [
    ['.skip','انتقل إلى الأعمال'],
    ['nav a[href="#work"]','الأعمال <sup>01</sup>'],
    ['nav a[href="#studio"]','الاستوديو <sup>02</sup>'],
    ['.nav-cta','نتكلم؟ <span aria-hidden="true">↗</span>'],
    ['.hero-top p:first-child','استوديو مونتاج مستقل'],
    ['.hero-top p:last-child','من المغرب <span class="divider">/</span> ونشتغل مع أي مكان'],
    ['.hero-line','أي شخص يستطيع قص الفيديو.<br>لكن أن يبقى المشاهد إلى النهاية؟ هذه قصة ثانية.'],
    ['.hero-aside>p','ريلز. فيديوهات قصيرة. موشن.<br>اثنان يهمهما إحساس الفيديو، وليس القص فقط.'],
    ['.stage-note','CF / منذ 2025'],
    ['.hero-aside>.text-link','شوف الشغل <span aria-hidden="true">↓</span>'],
    ['.console-head>span:first-child','الفرق كله في التوقيت.'],
    ['.console-help','حرّك المؤشر وشوف <span aria-hidden="true">↔</span>'],
    ['.timeline-clips span:nth-child(1)','01 / البداية'],
    ['.timeline-clips span:nth-child(2)','02 / الإيقاع'],
    ['.timeline-clips span:nth-child(3)','03 / الإحساس'],
    ['label[for="scrubber"]','موضع المقدمة'],
    ['.work .section-kicker span:first-child','01 / شغل مختار'],
    ['.work .section-kicker span:last-child','صورة. إيقاع. إحساس.'],
    ['#work-title','خلّي الشغل<br><em>يتكلم.</em>'],
    ['.work .section-heading>p','ريلز، فيديوهات قصيرة، وموشن.<br>هذا ما يخرج من غرفة المونتاج.'],
    ['.slate>.mono:first-child','كتفورم / ريل'],
    ['.slate-title','قريبًا<br><em>هنا.</em>'],
    ['.slate-bottom','الفيديوهات في الطريق'],
    ['.empty-copy .eyebrow','من غرفة المونتاج'],
    ['.empty-copy h3','شغل جديد<br>على وشك النزول.'],
    ['.empty-copy>p','تريد أن ترى قبل أن تقرر؟ اطلب الريل ونرسله لك.'],
    ['.empty-copy .text-link','اطلب الريل <span aria-hidden="true">↗</span>'],
    ['.service-intro .eyebrow','ما نشتغل عليه'],
    ['#services-title','اللقطات عندك.<br><em>والباقي علينا.</em>'],
    ['.service-intro>p:last-child','نخرج منها الفيديو الذي في رأسك.'],
    ['.service-list details:nth-child(1) h3','ريلز وفيديوهات قصيرة'],
    ['.service-list details:nth-child(1) .service-body>p:first-child','بداية تخلّي المشاهد يتوقف، وقطع يمشي مع الإيقاع. نجهّز فيديوهاتك لشاشة الموبايل.'],
    ['.service-list details:nth-child(1) .service-tags','مونتاج سوشيال / كتابة على الشاشة / إيقاع'],
    ['.service-list details:nth-child(1) .small-link','نتكلم عن فيديو؟ ↗'],
    ['.service-list details:nth-child(2) h3','محتوى صنّاع المحتوى'],
    ['.service-list details:nth-child(2) .service-body>p:first-child','تتكلم أمام الكاميرا، أو عندك فكرة تريد أن توصلها. نحافظ على أسلوبك، ونرتّب الكلام بإيقاع يوصل.'],
    ['.service-list details:nth-child(2) .service-tags','كلام أمام الكاميرا / مقاطع قصيرة / مونتاج مستمر'],
    ['.service-list details:nth-child(2) .small-link','نتكلم عن محتواك؟ ↗'],
    ['.service-list details:nth-child(3) h3','موشن ولمسات أخيرة'],
    ['.service-list details:nth-child(3) .service-body>p:first-child','كتابة تتحرك مع الكلام. ألوان تثبّت الجو. وصوت يخلّي كل شيء في مكانه.'],
    ['.service-list details:nth-child(3) .service-tags','أفتر إفكتس / ألوان / صوت'],
    ['.service-list details:nth-child(3) .small-link','نتكلم عن اللمسات الأخيرة؟ ↗'],
    ['.studio .section-kicker span:first-child','02 / الاستوديو'],
    ['.studio .section-kicker span:last-child','اثنان فقط. وتايم لاين واحد.'],
    ['#studio-title','عقلان.<br><em>وتايم لاين واحد.</em>'],
    ['.studio-lead','من يردّ عليك<br>هو من يشتغل على فيديوك.'],
    ['.studio-copy>p:nth-child(2)','نحن طالبان من المغرب. بنينا كتفورم حول الشيء الوحيد الذي نسهر عليه بدون أن نتعب: المونتاج.'],
    ['.studio-copy>p:nth-child(3)','قل لنا لمن الفيديو، وما تريد أن يحسّه المشاهد. نشتغل على الإيقاع والموشن والألوان والصوت حتى يصير الفيديو قطعة واحدة.'],
    ['.studio-facts>div:first-child .mono','مقرنا'],
    ['.studio-facts>div:first-child strong','المغرب'],
    ['.studio-facts>div:last-child .mono','نشتغل'],
    ['.studio-facts>div:last-child strong','عن بعد، معك'],
    ['.process .eyebrow','من المجلد إلى النسخة النهائية'],
    ['#process-title','بلا <em>تعقيد.</em>'],
    ['.process .section-heading>p','بريف واضح. كلام مباشر.<br>ووقت يكفي حتى تطلع صح.'],
    ['.steps li:nth-child(1) .mono','01 / قبل المونتاج'],
    ['.steps li:nth-child(1) h3','قل لنا ما تشتغل عليه.'],
    ['.steps li:nth-child(1) p','أرسل اللقطات، ومرجع يعجبك، وموعد التسليم. نتفق على المطلوب والسعر والوقت قبل أن نفتح البرنامج.'],
    ['.steps li:nth-child(2) .mono','02 / أثناء المونتاج'],
    ['.steps li:nth-child(2) h3','شاهد النسخة الأولى.'],
    ['.steps li:nth-child(2) p','نبني الشكل والإحساس، وتوصلك نسخة أولى. منها يبدأ الكلام في التفاصيل.'],
    ['.steps li:nth-child(3) .mono','03 / آخر التفاصيل'],
    ['.steps li:nth-child(3) h3','حتى تطلع كما تريد.'],
    ['.steps li:nth-child(3) p','نشتغل على ملاحظاتك، ونجهّز الملفات النهائية بالمقاسات التي تحتاجها.'],
    ['.belief-top>span','كلمة منا، نحن الاثنين'],
    ['.belief>p','نحن نؤمن بما تصنعه.'],
    ['#belief-title','فهل<br><em>تعطينا فرصة؟</em>'],
    ['.belief-link','خلّينا نبدأ بأول فيديو <span aria-hidden="true">↗</span>'],
    ['.belief-footer','كتفورم / كل قطع له سبب.'],
    ['.contact-heading .eyebrow','03 / فيديوك القادم يبدأ هنا'],
    ['#contact-title','ما الذي<br><em>في بالك؟</em>'],
    ['.contact-heading>p:not(.eyebrow)','ريل واحد، أو مجلد مليء بالأفكار.<br>قل لنا ما عندك.'],
    ['[data-copy-email]','انسخ البريد'],
    ['.instagram-dm','راسلنا على إنستغرام ↗'],
    ['.brief legend','محتاج مساعدة في…'],
    ['.project-types label:nth-child(1)>span','ريلز وفيديوهات قصيرة'],
    ['.project-types label:nth-child(2)>span','محتوى صنّاع المحتوى'],
    ['.project-types label:nth-child(3)>span','موشن ولمسات أخيرة'],
    ['.project-types label:nth-child(4)>span','نشوفها مع بعض'],
    ['[data-copy="name-label"]','اسمك'],
    ['[data-copy="project-label"]','شيء عن المشروع'],
    ['[data-copy="footage-label"]','رابط اللقطات أو المرجع'],
    ['.optional','(اختياري)'],
    ['[data-copy="provider-label"]','افتح بـ'],
    ['#email-provider option[value="app"]','تطبيق البريد عندي'],
    ['.form-note','يفتح لك رسالة إلينا وتفاصيلك جاهزة فيها. سجّل الدخول إذا طلب منك، ثم اضغط إرسال.'],
    ['[data-copy-brief]','أو انسخ التفاصيل وأرسلها كما تريد'],
    ['.brief-dm','تفضل الرسائل؟ راسلنا على إنستغرام ↗'],
    ['.footer-top>span:nth-child(2)','مونتاج من المغرب. يوصل لكل مكان.'],
    ['.footer-top>a','رجوع إلى البداية ↑'],
    ['[data-close-player]','إغلاق ×']
  ];
  const words = {
    en: {
      featured:'In focus',selected:'Selected edit',
      play:'Play the title sequence',pause:'Pause the title sequence',replay:'Replay the title sequence',second:'seconds',
      fallback:'Video not loading? Open the backup ↗',
      beat0:['Make them','stay.','The hook'],beat1:['Find the','rhythm.','The rhythm'],beat2:['Leave a','feeling.','The feeling'],
      short0:'01 / Hook',short1:'02 / Rhythm',short2:'03 / Feel',
      gmail:'Open Gmail draft',outlook:'Open Outlook draft',app:'Open email app',
      draft:'Your draft opens in a new tab. Sign in if asked. If it doesn’t open, try another email option or copy your brief.',
      copied:'Brief copied. Paste it into an email or Instagram message to us.',emailCopied:'Email address copied.',copyEmail:'Copy email',emailDone:'Email copied',
      manual:'Select and copy this text',copyFailed:'Automatic copying is unavailable. The text below is selected for you to copy.',
      watch:'Watch the cut',video:'Selected work',playVideo:'Play',close:'Close video',
      opening:'Opening',work:'01 / Work',services:'Services',studio:'02 / Studio',process:'The process',belief:'A note from us',contact:'03 / Contact',progress:'Page progress',
      namePlaceholder:'What should we call you?',projectPlaceholder:'What are you making? Where will it be posted? Any deadline?',nameRequired:'Please tell us your name.',projectRequired:'Tell us a little about your project.',urlInvalid:'Please enter a full link starting with https://.',
      service0:'Reels & short form',service1:'Creator content',service2:'Motion & finishing',service3:"Let's figure it out"
    },
    ar: {
      featured:'تحت الضوء',selected:'من شغلنا',
      play:'شغّل المقدمة',pause:'أوقف المقدمة',replay:'شغّلها من جديد',second:'ثانية',
      fallback:'الفيديو ما يشتغل؟ افتح النسخة الاحتياطية ↗',
      beat0:['خلّيهم','يكملوا.','البداية'],beat1:['خلّي الإيقاع','يشدّهم.','الإيقاع'],beat2:['خلّيهم','يحسّوا.','الإحساس'],
      short0:'01 / البداية',short1:'02 / الإيقاع',short2:'03 / الإحساس',
      gmail:'افتح مسودة في Gmail',outlook:'افتح مسودة في Outlook',app:'افتح تطبيق البريد',
      draft:'تفتح المسودة في تبويب جديد. سجّل الدخول إذا طلب منك. وإذا لم تفتح، جرّب خيار بريد آخر أو انسخ التفاصيل.',
      copied:'تم نسخ التفاصيل. ألصقها في بريد أو رسالة إنستغرام لنا.',emailCopied:'تم نسخ عنوان البريد.',copyEmail:'انسخ البريد',emailDone:'تم النسخ',
      manual:'حدّد هذا النص وانسخه',copyFailed:'النسخ التلقائي ما يشتغل هنا. النص تحت محدد، انسخه.',
      watch:'شوف المونتاج',video:'من شغلنا',playVideo:'شغّل',close:'إغلاق الفيديو',
      opening:'البداية',work:'01 / الشغل',services:'الخدمات',studio:'02 / الاستوديو',process:'خطوات العمل',belief:'كلمة منا',contact:'03 / تواصل معنا',progress:'تقدّم القراءة',
      namePlaceholder:'كيف نناديك؟',projectPlaceholder:'ما الفيديو؟ أين سينزل؟ وهل عندك موعد تسليم؟',nameRequired:'قل لنا اسمك من فضلك.',projectRequired:'قل لنا شيئًا عن مشروعك.',urlInvalid:'أدخل رابطًا كاملًا يبدأ بـ https://.',
      service0:'ريلز وفيديوهات قصيرة',service1:'محتوى صنّاع المحتوى',service2:'موشن ولمسات أخيرة',service3:'نشوفها مع بعض'
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { copy, words };
  if (typeof document === 'undefined') return;
  let language = 'en';
  const entries = copy.map(([selector, arabic]) => ({element:document.querySelector(selector),arabic})).filter(entry=>entry.element).map(entry=>({...entry,english:entry.element.innerHTML}));
  const t = key => words[language][key] ?? words.en[key] ?? key;
  function setLanguage(value, remember = true) {
    language = value === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    for (const entry of entries) entry.element.innerHTML = language === 'ar' ? entry.arabic : entry.english;
    document.querySelector('#name').placeholder = t('namePlaceholder');
    document.querySelector('#project').placeholder = t('projectPlaceholder');
    document.querySelectorAll('.timeline-clips span').forEach((el,i)=>el.dataset.short=t('short'+i));
    document.querySelector('[data-close-player]').setAttribute('aria-label',t('close'));
    document.querySelector('.scroll-cut-track').setAttribute('aria-label',t('progress'));
    document.querySelector('nav').setAttribute('aria-label',language==='ar'?'التنقل الرئيسي':'Main navigation');
    document.querySelector('.brand').setAttribute('aria-label',language==='ar'?'كتفورم، الصفحة الرئيسية':'Cutform home');
    const button=document.querySelector('[data-language-switch]');
    button.textContent=language==='ar'?'EN':'العربية';button.lang=language==='ar'?'en':'ar';
    button.setAttribute('aria-label',language==='ar'?'Switch to English':'Switch to Arabic');
    document.title=language==='ar'?'كتفورم — ريلز وفيديوهات قصيرة وموشن':'Cutform — Reels, short form & motion';
    document.querySelector('meta[name="description"]').content=language==='ar'?'استوديو مونتاج مستقل من المغرب. اثنان يشتغلان على الريلز والفيديوهات القصيرة والموشن. قل لنا ما تشتغل عليه.':"An independent edit studio in Morocco. Two editors working on reels, short form and motion. Tell us what you're making.";
    document.querySelector('.empty-copy .text-link').href='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:'cutform.agency@gmail.com',su:language==='ar'?'ممكن أشوف الريل؟':'Can I see your reel?'});
    if(remember)try{localStorage.setItem('cutform-language',language);}catch{}
    document.dispatchEvent(new CustomEvent('cutform:language',{detail:{language}}));
  }
  window.CutformI18n=Object.freeze({t,setLanguage,get language(){return language;}});
  document.querySelector('[data-language-switch]').addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
  let initial='en';try{initial=localStorage.getItem('cutform-language')||'en';}catch{}
  setLanguage(initial,false);
})();
