(function () {
  'use strict';
  // Authored translations only. Project copy can provide optional titleAr,
  // descriptionAr, kindAr and creditAr fields in work.js.
  const copy = [
    ['.skip','انتقل إلى الأعمال'],
    ['nav a[href="#work"]','الأعمال <sup>01</sup>'],
    ['nav a[href="#studio"]','الاستوديو <sup>02</sup>'],
    ['.nav-cta','لنتحدث <span aria-hidden="true">↗</span>'],
    ['.hero-top p:first-child','استوديو مونتاج مستقل'],
    ['.hero-top p:last-child','من المغرب <span class="divider">/</span> نعمل معك أينما كنت'],
    ['.hero-line','يمكن لأيّ شخص قصّ اللقطات.<br>لكن إبقاء المشاهد حتى النهاية حكاية أخرى.'],
    ['.hero-aside>p','ريلز. فيديوهات قصيرة. موشن.<br>مونتيران يهتمان بالإحساس الذي يتركه الفيديو.'],
    ['.stage-note','CF / منذ 2025'],
    ['.hero-aside>.text-link','شاهد الأعمال <span aria-hidden="true">↓</span>'],
    ['.console-head>span:first-child','التوقيت المناسب يصنع الفرق.'],
    ['.console-help','حرّك مؤشر البداية <span aria-hidden="true">↔</span>'],
    ['.timeline-clips span:nth-child(1)','01 / البداية'],
    ['.timeline-clips span:nth-child(2)','02 / الإيقاع'],
    ['.timeline-clips span:nth-child(3)','03 / الإحساس'],
    ['label[for="scrubber"]','موضع تسلسل العنوان'],
    ['.work .section-kicker span:first-child','01 / أعمال مختارة'],
    ['.work .section-kicker span:last-child','صورة. إيقاع. إحساس.'],
    ['#work-title','أعمالنا<br><em>تتحدث عنّا.</em>'],
    ['.work .section-heading>p','ريلز وفيديوهات قصيرة وموشن.<br>نظرة أقرب على ما نصنعه.'],
    ['.slate>.mono:first-child','كتفورم / مقتطفات الأعمال'],
    ['.slate-title','قريبًا<br><em>هنا.</em>'],
    ['.slate-bottom','الأعمال تُضاف قريبًا'],
    ['.empty-copy .eyebrow','من غرفة المونتاج'],
    ['.empty-copy h3','بعض أعمالنا<br>في الطريق إليك.'],
    ['.empty-copy>p','تريد أن تشاهد مونتاجنا قبل أن نتحدث؟ اطلب منّا مقتطفات من أعمالنا الحالية.'],
    ['.empty-copy .text-link','اطلب مشاهدة الأعمال <span aria-hidden="true">↗</span>'],
    ['.service-intro .eyebrow','ما يمكننا مساعدتك فيه'],
    ['#services-title','أنت تجلب<br><em>اللقطات.</em>'],
    ['.service-intro>p:last-child','ونحن نمنحها شكلها.'],
    ['.service-list details:nth-child(1) h3','ريلز وفيديوهات قصيرة'],
    ['.service-list details:nth-child(1) .service-body>p:first-child','بداية تستحق التوقّف عندها، وقصّة تسير على الإيقاع. نشكّل لقطاتك لتناسب الشاشة الصغيرة.'],
    ['.service-list details:nth-child(1) .service-tags','مونتاج للسوشيال / نصوص على الشاشة / إيقاع'],
    ['.service-list details:nth-child(1) .small-link','لنتحدث عن فيديو ↗'],
    ['.service-list details:nth-child(2) h3','محتوى صنّاع المحتوى'],
    ['.service-list details:nth-child(2) .service-body>p:first-child','حديث أمام الكاميرا، فكرة تريد مشاركتها، أو يوم تأخذ جمهورك معك فيه. نحافظ على أسلوبك ونمنح القصة إيقاعًا أوضح.'],
    ['.service-list details:nth-child(2) .service-tags','حديث أمام الكاميرا / مقتطفات / مونتاج مستمر'],
    ['.service-list details:nth-child(2) .small-link','لنتحدث عن محتواك ↗'],
    ['.service-list details:nth-child(3) h3','موشن ولمسات نهائية'],
    ['.service-list details:nth-child(3) .service-body>p:first-child','نصوص تتحرك مع المعنى. ألوان تحفظ الجوّ. وصوت يجعل كل جزء في مكانه.'],
    ['.service-list details:nth-child(3) .service-tags','أفتر إفكتس / ألوان / صوت'],
    ['.service-list details:nth-child(3) .small-link','لنتحدث عن اللمسات الأخيرة ↗'],
    ['.studio .section-kicker span:first-child','02 / الاستوديو'],
    ['.studio .section-kicker span:last-child','فريق صغير. رؤية مشتركة.'],
    ['#studio-title','عقلان.<br><em>خط زمني واحد.</em>'],
    ['.studio-lead','تتعامل مباشرةً<br>مع من يعمل على فيديوهاتك.'],
    ['.studio-copy>p:nth-child(2)','نحن طالبان من المغرب نبني كتفورم حول الشيء الذي نُسعد بقضاء ليلة كاملة فيه: المونتاج.'],
    ['.studio-copy>p:nth-child(3)','أخبرنا لمن تصنع الفيديو، وما الإحساس الذي تريد أن يصل إليهم. نعمل على الإيقاع والموشن والألوان والصوت حتى تنسجم الأجزاء معًا.'],
    ['.studio-facts>div:first-child .mono','مقرّنا'],
    ['.studio-facts>div:first-child strong','المغرب'],
    ['.studio-facts>div:last-child .mono','طريقة العمل'],
    ['.studio-facts>div:last-child strong','عن بُعد، معك'],
    ['.process .eyebrow','من مجلّد لقطاتك إلى النسخة النهائية'],
    ['#process-title','لنبقِ الأمر <em>بسيطًا.</em>'],
    ['.process .section-heading>p','فكرة واضحة. حوار مفتوح.<br>ومساحة لنصل إلى النتيجة المناسبة.'],
    ['.steps li:nth-child(1) .mono','01 / قبل المونتاج'],
    ['.steps li:nth-child(1) h3','أخبرنا بما تصنعه.'],
    ['.steps li:nth-child(1) p','شاركنا لقطاتك، مرجعًا يعجبك، وموعد التسليم. نتفق على المطلوب والسعر والجدول الزمني قبل أن نبدأ.'],
    ['.steps li:nth-child(2) .mono','02 / أثناء المونتاج'],
    ['.steps li:nth-child(2) h3','شاهد النسخة الأولى.'],
    ['.steps li:nth-child(2) p','نبني هيكل الفيديو وإحساسه. تشاهد نسخة أولى، ونبدأ منها الحوار حول التفاصيل.'],
    ['.steps li:nth-child(3) .mono','03 / آخر التفاصيل'],
    ['.steps li:nth-child(3) h3','لنصل إلى الإحساس المناسب.'],
    ['.steps li:nth-child(3) p','نعمل على الملاحظات المتفق عليها، ونجهّز الملفات النهائية بالمقاسات والصيغ التي تحتاجها.'],
    ['.belief-top>span','كلمة منّا نحن الاثنين'],
    ['.belief>p','نحن نؤمن بما تصنعه.'],
    ['#belief-title','فهل<br><em>تؤمن بنا؟</em>'],
    ['.belief-link','لنبدأ أول مونتاج معًا <span aria-hidden="true">↗</span>'],
    ['.belief-footer','كتفورم / لكل قصّة قصد.'],
    ['.contact-heading .eyebrow','03 / فيديوك القادم يبدأ هنا'],
    ['#contact-title','ما الذي<br><em>يدور في بالك؟</em>'],
    ['.contact-heading>p:not(.eyebrow)','ريل واحد أو مجلّد مليء بالأفكار.<br>أخبرنا بما تعمل عليه.'],
    ['[data-copy-email]','انسخ البريد'],
    ['.instagram-dm','راسلنا على إنستغرام ↗'],
    ['.brief legend','أحتاج مساعدة في…'],
    ['.project-types label:nth-child(1)>span','ريلز وفيديوهات قصيرة'],
    ['.project-types label:nth-child(2)>span','محتوى لصنّاع المحتوى'],
    ['.project-types label:nth-child(3)>span','موشن ولمسات نهائية'],
    ['.project-types label:nth-child(4)>span','لنحدّد ذلك معًا'],
    ['[data-copy="name-label"]','اسمك'],
    ['[data-copy="project-label"]','نبذة عن المشروع'],
    ['[data-copy="footage-label"]','رابط اللقطات أو المرجع'],
    ['.optional','(اختياري)'],
    ['[data-copy="provider-label"]','افتح باستخدام'],
    ['#email-provider option[value="app"]','تطبيق البريد لديّ'],
    ['.form-note','يفتح رسالة موجّهة إلينا وبها تفاصيل مشروعك. سجّل الدخول إذا طُلب منك، ثم أرسلها.'],
    ['[data-copy-brief]','انسخ تفاصيل المشروع بدلًا من ذلك'],
    ['.brief-dm','تفضّل الرسائل؟ راسلنا على إنستغرام ↗'],
    ['.footer-top>span:nth-child(2)','مونتاج من المغرب. يُشاهد في كل مكان.'],
    ['.footer-top>a','العودة إلى البداية ↑'],
    ['[data-close-player]','إغلاق ×'],
    ['#player-source','افتح الفيديو الأصلي ↗']
  ];
  const words = {
    en: {
      featured:'In focus',selected:'Selected edit',
      play:'Play the title sequence',pause:'Pause the title sequence',second:'seconds',
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
      featured:'تحت الضوء',selected:'من أعمالنا',
      play:'تشغيل تسلسل العنوان',pause:'إيقاف تسلسل العنوان مؤقتًا',second:'ثانية',
      beat0:['اجعلهم','يبقون.','البداية'],beat1:['اعثر على','الإيقاع.','الإيقاع'],beat2:['اترك','إحساسًا.','الإحساس'],
      short0:'01 / البداية',short1:'02 / الإيقاع',short2:'03 / الإحساس',
      gmail:'افتح مسوّدة في Gmail',outlook:'افتح مسوّدة في Outlook',app:'افتح تطبيق البريد',
      draft:'تُفتح المسوّدة في علامة تبويب جديدة. سجّل الدخول إذا طُلب منك. إذا لم تفتح، جرّب خيار بريد آخر أو انسخ تفاصيل المشروع.',
      copied:'تم نسخ التفاصيل. ألصقها في بريد أو رسالة إنستغرام لنا.',emailCopied:'تم نسخ عنوان البريد.',copyEmail:'انسخ البريد',emailDone:'تم النسخ',
      manual:'حدّد هذا النص وانسخه',copyFailed:'النسخ التلقائي غير متاح. النص أدناه محدّد لتنسخه.',
      watch:'شاهد الفيديو',video:'من أعمالنا',playVideo:'شغّل',close:'إغلاق الفيديو',
      opening:'البداية',work:'01 / الأعمال',services:'الخدمات',studio:'02 / الاستوديو',process:'خطوات العمل',belief:'كلمة منّا',contact:'03 / تواصل معنا',progress:'تقدّم القراءة',
      namePlaceholder:'بماذا نناديك؟',projectPlaceholder:'ماذا تصنع؟ أين سيُنشر؟ وهل هناك موعد للتسليم؟',nameRequired:'أخبرنا باسمك من فضلك.',projectRequired:'أخبرنا قليلًا عن مشروعك.',urlInvalid:'أدخل رابطًا كاملًا يبدأ بـ https://.',
      service0:'ريلز وفيديوهات قصيرة',service1:'محتوى لصنّاع المحتوى',service2:'موشن ولمسات نهائية',service3:'لنحدّد ذلك معًا'
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
    document.querySelector('meta[name="description"]').content=language==='ar'?'استوديو مونتاج مستقل من المغرب. مونتيران يعملان على الريلز والفيديوهات القصيرة والموشن. أخبرنا بما تصنعه.':"An independent edit studio in Morocco. Two editors working on reels, short form and motion. Tell us what you're making.";
    document.querySelector('.empty-copy .text-link').href='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:'cutform.agency@gmail.com',su:language==='ar'?'هل يمكنني مشاهدة أعمالكم؟':'Can I see your reel?'});
    if(remember)try{localStorage.setItem('cutform-language',language);}catch{}
    document.dispatchEvent(new CustomEvent('cutform:language',{detail:{language}}));
  }
  window.CutformI18n=Object.freeze({t,setLanguage,get language(){return language;}});
  document.querySelector('[data-language-switch]').addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
  let initial='en';try{initial=localStorage.getItem('cutform-language')||'en';}catch{}
  setLanguage(initial,false);
})();
