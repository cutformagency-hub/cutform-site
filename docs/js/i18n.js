(function () {
  'use strict';
  // Authored translations only. Project copy can provide optional titleAr,
  // descriptionAr, kindAr and creditAr fields in work.js.
  const copy = [
    ['.skip','انتقل إلى الأعمال'],
    ['nav a[href="#work"]','الأعمال <sup>01</sup>'],
    ['nav a[href="#studio"]','من نحن <sup>02</sup>'],
    ['.nav-cta','لنتحدث <span aria-hidden="true">↗</span>'],
    ['.hero-top p:first-child','استوديو مونتاج مستقل'],
    ['.hero-top p:last-child','من المغرب <span class="divider">/</span> ونعمل معك أينما كنت'],
    ['.hero-line','أي شخص يستطيع قصّ الفيديو.<br>لكن أن تجعل المشاهد يبقى حتى النهاية؟ هنا يصنع الفرق.'],
    ['.hero-aside>p','ريلز. فيديوهات قصيرة. موشن.<br>نحن اثنان نهتم بإحساس الفيديو بقدر اهتمامنا بالمونتاج نفسه.'],
    ['.stage-note','CF / منذ 2025'],
    ['.hero-aside>.text-link','شاهد أعمالنا <span aria-hidden="true">↓</span>'],
    ['.console-head>span:first-child','التوقيت يغيّر كل شيء.'],
    ['.console-help','حرّك المؤشر وشاهد الفرق <span aria-hidden="true">↔</span>'],
    ['.timeline-clips span:nth-child(1)','01 / الهوك'],
    ['.timeline-clips span:nth-child(2)','02 / الإيقاع'],
    ['.timeline-clips span:nth-child(3)','03 / الإحساس'],
    ['label[for="scrubber"]','موضع البداية'],
    ['.work .section-kicker span:first-child','01 / أعمال مختارة'],
    ['.work .section-kicker span:last-child','صورة. إيقاع. إحساس.'],
    ['#work-title','دع العمل<br><em>يتحدث عنّا.</em>'],
    ['.work .section-heading>p','ريلز، فيديوهات قصيرة، وموشن.<br>هذا هو النوع من العمل الذي نحب أن نصنعه.'],
    ['.slate>.mono:first-child','Cutform / Reel'],
    ['.slate-title','قريبًا<br><em>هنا.</em>'],
    ['.slate-bottom','أعمال جديدة قريبًا'],
    ['.empty-copy .eyebrow','من داخل التايملاين'],
    ['.empty-copy h3','عمل جديد<br>سيظهر هنا قريبًا.'],
    ['.empty-copy>p','تريد أن ترى المزيد قبل أن تقرر؟ اطلب الريل وسنرسله لك.'],
    ['.empty-copy .text-link','اطلب الريل <span aria-hidden="true">↗</span>'],
    ['.service-intro .eyebrow','ما الذي نعمل عليه'],
    ['#services-title','الفوتاج عندك.<br><em>والباقي علينا.</em>'],
    ['.service-intro>p:last-child','نحوّل فكرتك إلى الفيديو الذي تتخيله.'],
    ['.service-list details:nth-child(1) h3','ريلز وفيديوهات قصيرة'],
    ['.service-list details:nth-child(1) .service-body>p:first-child','هوك قوي من البداية، ومونتاج يحافظ على الإيقاع. نصنع الفيديو ليعمل كما يجب على شاشة الهاتف.'],
    ['.service-list details:nth-child(1) .service-tags','مونتاج للسوشيال / نصوص على الشاشة / إيقاع'],
    ['.service-list details:nth-child(1) .small-link','عندك فيديو؟ لنتحدث ↗'],
    ['.service-list details:nth-child(2) h3','محتوى للكرياتورز'],
    ['.service-list details:nth-child(2) .service-body>p:first-child','تتحدث أمام الكاميرا، أو عندك فكرة تريد إيصالها؟ نحافظ على أسلوبك ونرتّب الفيديو بطريقة واضحة وخفيفة.'],
    ['.service-list details:nth-child(2) .service-tags','Talking head / مقاطع قصيرة / مونتاج مستمر'],
    ['.service-list details:nth-child(2) .small-link','لنتحدث عن محتواك ↗'],
    ['.service-list details:nth-child(3) h3','موشن ولمسات نهائية'],
    ['.service-list details:nth-child(3) .service-body>p:first-child','موشن في مكانه، ألوان تخدم الجو، وصوت يكمّل الصورة.'],
    ['.service-list details:nth-child(3) .service-tags','After Effects / ألوان / صوت'],
    ['.service-list details:nth-child(3) .small-link','تحتاج اللمسات الأخيرة؟ لنتحدث ↗'],
    ['.studio .section-kicker span:first-child','02 / من نحن'],
    ['.studio .section-kicker span:last-child','اثنان فقط. وتايملاين واحد.'],
    ['#studio-title','شخصان.<br><em>وتايملاين واحد.</em>'],
    ['.studio-lead','من يتحدث معك<br>هو نفسه من يعمل على فيديوك.'],
    ['.studio-copy>p:nth-child(2)','نحن طالبان من المغرب. بدأنا Cutform من الشيء الذي نستطيع أن نقضي عليه ساعات دون أن نشعر بالوقت: المونتاج.'],
    ['.studio-copy>p:nth-child(3)','أخبرنا لمن هذا الفيديو، وما الذي تريد أن يصل للمشاهد. بعدها نهتم بالإيقاع والموشن والألوان والصوت حتى يعمل كل شيء معًا.'],
    ['.studio-facts>div:first-child .mono','مقرنا'],
    ['.studio-facts>div:first-child strong','المغرب'],
    ['.studio-facts>div:last-child .mono','نعمل'],
    ['.studio-facts>div:last-child strong','عن بُعد، معك'],
    ['.process .eyebrow','من الفوتاج إلى النسخة النهائية'],
    ['#process-title','بشكل <em>واضح.</em>'],
    ['.process .section-heading>p','بريف واضح. تواصل مباشر.<br>وكل خطوة تكون مفهومة من البداية.'],
    ['.steps li:nth-child(1) .mono','01 / قبل أن نبدأ'],
    ['.steps li:nth-child(1) h3','أخبرنا عن مشروعك.'],
    ['.steps li:nth-child(1) p','أرسل الفوتاج، ومرجعًا يعجبك، وموعد التسليم. نتفق على المطلوب والسعر والوقت قبل أن نبدأ.'],
    ['.steps li:nth-child(2) .mono','02 / النسخة الأولى'],
    ['.steps li:nth-child(2) h3','شاهد النسخة الأولى.'],
    ['.steps li:nth-child(2) p','نرسل لك نسخة أولى توضح الاتجاه. بعدها نضبط التفاصيل بناءً على ملاحظاتك.'],
    ['.steps li:nth-child(3) .mono','03 / اللمسات الأخيرة'],
    ['.steps li:nth-child(3) h3','حتى تصل إلى النتيجة التي تريدها.'],
    ['.steps li:nth-child(3) p','نطبّق ملاحظاتك ونجهّز النسخة النهائية بالمقاسات التي تحتاجها.'],
    ['.belief-top>span','كلمة منّا'],
    ['.belief>p','نحن نؤمن بفكرتك.'],
    ['#belief-title','فهل<br><em>تؤمن بنا؟</em>'],
    ['.belief-link','لنعمل على أول فيديو <span aria-hidden="true">↗</span>'],
    ['.belief-footer','Cutform / لكل cut سبب.'],
    ['.contact-heading .eyebrow','03 / فيديوك القادم يبدأ هنا'],
    ['#contact-title','ما الذي<br><em>تريد أن نصنعه؟</em>'],
    ['.contact-heading>p:not(.eyebrow)','ريل واحد، أو مجلد مليء بالأفكار.<br>أخبرنا بما تعمل عليه.'],
    ['[data-copy-email]','انسخ البريد'],
    ['.instagram-dm','راسلنا على Instagram ↗'],
    ['.brief legend','تحتاج مساعدتنا في…'],
    ['.project-types label:nth-child(1)>span','ريلز وفيديوهات قصيرة'],
    ['.project-types label:nth-child(2)>span','محتوى للكرياتورز'],
    ['.project-types label:nth-child(3)>span','موشن ولمسات نهائية'],
    ['.project-types label:nth-child(4)>span','نختار الأنسب معًا'],
    ['[data-copy="name-label"]','اسمك'],
    ['[data-copy="project-label"]','نبذة عن المشروع'],
    ['[data-copy="footage-label"]','رابط الفوتاج أو المرجع'],
    ['.optional','(اختياري)'],
    ['[data-copy="provider-label"]','افتح باستخدام'],
    ['#email-provider option[value="app"]','تطبيق البريد'],
    ['.form-note','ستفتح لك رسالة جاهزة بتفاصيلك. راجعها ثم أرسلها.'],
    ['[data-copy-brief]','أو انسخ التفاصيل وأرسلها بالطريقة التي تفضّلها'],
    ['.brief-dm','تفضّل الرسائل؟ راسلنا على Instagram ↗'],
    ['.footer-top>span:nth-child(2)','مونتاج من المغرب، لعملاء في أي مكان.'],
    ['.footer-top>a','العودة إلى الأعلى ↑'],
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
      featured:'مختار',selected:'من أعمالنا',
      play:'تشغيل المقدمة',pause:'أوقف المقدمة',replay:'أعد التشغيل',second:'ثانية',
      fallback:'الفيديو لا يعمل؟ افتح النسخة البديلة ↗',
      beat0:['اجعلهم','يكملون.','البداية'],beat1:['اضبط','الإيقاع.','الإيقاع'],beat2:['اجعلهم','يشعرون.','الإحساس'],
      short0:'01 / الهوك',short1:'02 / الإيقاع',short2:'03 / الإحساس',
      gmail:'افتح مسودة في Gmail',outlook:'افتح مسودة في Outlook',app:'افتح تطبيق البريد',
      draft:'ستفتح المسودة في تبويب جديد. إذا لم تعمل، جرّب خيار بريد آخر أو انسخ التفاصيل.',
      copied:'تم نسخ التفاصيل. ألصقها في بريد أو رسالة Instagram وأرسلها لنا.',emailCopied:'تم نسخ البريد.',copyEmail:'انسخ البريد',emailDone:'تم النسخ',
      manual:'حدّد هذا النص وانسخه',copyFailed:'النسخ التلقائي غير متاح هنا. النص في الأسفل محدد وجاهز للنسخ.',
      watch:'شاهد الفيديو',video:'من أعمالنا',playVideo:'تشغيل',close:'إغلاق الفيديو',
      opening:'البداية',work:'01 / الأعمال',services:'الخدمات',studio:'02 / من نحن',process:'طريقة العمل',belief:'كلمة منّا',contact:'03 / تواصل معنا',progress:'تقدّم الصفحة',
      namePlaceholder:'ما اسمك؟',projectPlaceholder:'ما الذي تعمل عليه؟ أين سينشر؟ وهل لديك موعد للتسليم؟',nameRequired:'اكتب اسمك من فضلك.',projectRequired:'أخبرنا قليلًا عن مشروعك.',urlInvalid:'أدخل رابطًا كاملًا يبدأ بـ https://.',
      service0:'ريلز وفيديوهات قصيرة',service1:'محتوى للكرياتورز',service2:'موشن ولمسات نهائية',service3:'نختار الأنسب معًا'
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { copy, words };
  if (typeof document === 'undefined') return;
  let language = 'en';
  const entries = copy.map(([selector, arabic]) => ({element:document.querySelector(selector),arabic})).filter(entry=>entry.element).map(entry=>({...entry,english:entry.element.innerHTML}));
  const t = key => words[language][key] ?? words.en[key] ?? key;
  // The Arabic faces are a large download that English visitors never render, so
  // they are fetched the first time someone actually switches into Arabic.
  let arabicFonts=false;
  function loadArabicFonts(){
    if(arabicFonts)return;
    arabicFonts=true;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400&display=swap';
    document.head.append(link);
  }
  function setLanguage(value, remember = true) {
    language = value === 'ar' ? 'ar' : 'en';
    if(language==='ar')loadArabicFonts();
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    for (const entry of entries) entry.element.innerHTML = language === 'ar' ? entry.arabic : entry.english;
    document.querySelector('#name').placeholder = t('namePlaceholder');
    document.querySelector('#project').placeholder = t('projectPlaceholder');
    document.querySelectorAll('.timeline-clips span').forEach((el,i)=>el.dataset.short=t('short'+i));
    document.querySelector('[data-close-player]').setAttribute('aria-label',t('close'));
    document.querySelector('.scroll-cut-track').setAttribute('aria-label',t('progress'));
    document.querySelector('nav').setAttribute('aria-label',language==='ar'?'التنقل الرئيسي':'Main navigation');
    document.querySelector('.brand').setAttribute('aria-label',language==='ar'?'Cutform، الصفحة الرئيسية':'Cutform home');
    const button=document.querySelector('[data-language-switch]');
    button.textContent=language==='ar'?'EN':'العربية';button.lang=language==='ar'?'en':'ar';
    button.setAttribute('aria-label',language==='ar'?'Switch to English':'Switch to Arabic');
    document.title=language==='ar'?'Cutform — ريلز، فيديوهات قصيرة وموشن':'Cutform — Reels, short form & motion';
    document.querySelector('meta[name="description"]').content=language==='ar'?'استوديو مونتاج مستقل من المغرب. نحن اثنان ونعمل على الريلز، الفيديوهات القصيرة والموشن. أخبرنا عن مشروعك.':"An independent edit studio in Morocco. Two editors working on reels, short form and motion. Tell us what you're making.";
    document.querySelector('.empty-copy .text-link').href='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:'cutform.agency@gmail.com',su:language==='ar'?'هل يمكنني مشاهدة الريل؟':'Can I see your reel?'});
    if(remember)try{localStorage.setItem('cutform-language',language);}catch{}
    document.dispatchEvent(new CustomEvent('cutform:language',{detail:{language}}));
  }
  window.CutformI18n=Object.freeze({t,setLanguage,get language(){return language;}});
  document.querySelector('[data-language-switch]').addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
  let initial='en';try{initial=localStorage.getItem('cutform-language')||'en';}catch{}
  setLanguage(initial,false);
})();
