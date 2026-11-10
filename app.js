/* ==========================================================
   LinguaBloom prototype — interactions (vanilla JS)
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let LANG = 'en';
const isAr = () => LANG === 'ar';
const UNS = (id, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ---------- Arabic dictionary (static copy) ---------- */
const AR = {
  'nav.home':'الرئيسية','nav.test':'اختبار تحديد المستوى','nav.packages':'الباقات','nav.library':'المكتبة','nav.student':'الطالب','nav.teacher':'المعلم','nav.admin':'الإدارة',
  'cta.free':'اختبار مجاني','cta.start':'ابدأ اختبار المستوى المجاني','cta.packages':'تصفح الباقات',
  'hero.chip':'وفق الإطار الأوروبي · من A1 إلى C2','hero.t1':'تحدّث الإنجليزية','hero.t2':'بثقة،','hero.t3':'وتفتّح بإيقاعك.',
  'hero.lead':'حصص مباشرة مع معلمين إلى جانب دروس ذاتية منظمة. ابدأ باختبار تحديد مستوى مجاني، واختر خطة تناسب أسبوعك، وتابع تقدمك وهو ينمو.',
  'hero.rating':'من أكثر من 2,400 متعلم','hero.fc1':'حصة مباشرة بعد 12 دقيقة','hero.fc1s':'نادي المحادثة · 18:00','hero.fc2':'72٪ نحو المستوى التالي','hero.fc3':'تدريب المحادثة',
  'mq.1':'حصص مباشرة مع معلمين','mq.2':'فردي وجماعي','mq.3':'دروس مسجلة','mq.4':'واجهة عربية وإنجليزية','mq.5':'المستويات A1 – C2','mq.6':'شهادات إتمام','mq.7':'بتوقيتك المحلي',
  'st.1':'مستويات CEFR','st.2':'معلم معتمد','st.3':'درس في المكتبة','st.4':'متوسط الحضور',
  'how.eye':'كيف تعمل المنصة','how.t1':'مسار واضح من','how.t2':'أول اختبار','how.t3':'إلى الطلاقة','how.p':'يتبع كل متعلم الرحلة البسيطة نفسها — لتعرف دائماً أين أنت وما الخطوة التالية.',
  'how.s1':'خذ اختبار المستوى','how.s1p':'مجاني وقبل أي دفع. احصل على مستوى ومسار تعلم مقترح.','how.s2':'اختر باقتك','how.s2p':'اختر الدورة والنوع وتاريخ البدء وأيام الدراسة والأوقات المناسبة.','how.s3':'انضم للحصص المباشرة','how.s3p':'بنقرة واحدة من لوحتك، مع تذكير قبل كل حصة.','how.s4':'تدرّب وتقدّم','how.s4p':'واجبات واختبارات وتسجيلات — مع تقدم واضح وشهادات.',
  'lv.eye':'مستويات التعلم','lv.t1':'مبني على إطار','lv.t2':'الأوروبي','lv.p':'المعيار الدولي للكفاءة اللغوية. اضغط على مستوى لترى ما ستتمكن من فعله.',
  'co.eye':'الدورات','co.t1':'ابدأ بالأساسيات،','co.t2':'وانطلق نحو المزيد','co.p':'الإنجليزية العامة والمحادثة متاحتان الآن. إنجليزية الأعمال والتحضير لاختبار IELTS قريباً.',
  'co.avail':'متاح','co.soon':'قريباً','co.c1':'الإنجليزية العامة','co.c1p':'القواعد والمفردات والاستماع والقراءة والكتابة — مستوى بعد مستوى من A1 إلى C2.','co.c2':'تطوير المحادثة','co.c2p':'النطق والطلاقة ومحادثات حقيقية مع المعلمين والزملاء.','co.c3':'إنجليزية الأعمال','co.c3p':'الاجتماعات والرسائل والعروض والتفاوض في بيئة العمل.','co.c4':'التحضير لـ IELTS','co.c4p':'تدريب مركّز للمهارات الأربع مع اختبارات تجريبية وتقييم.','co.live':'مباشر + ذاتي','co.future':'إصدار قادم',
  'lm.live':'مباشر الآن','lm.eye1':'الفصل المباشر','lm.t1':'معلمون حقيقيون،','lm.t2':'محادثات حقيقية','lm.p1':'تُقدَّم الحصص عبر منصة فصول افتراضية موثوقة، وتُفتح مباشرة من لوحتك.',
  'lm.f1':'فردي أو مجموعات صغيرة','lm.f1p':'اختر الاهتمام الشخصي أو حيوية الحصة الجماعية.','lm.f2':'بتوقيتك المحلي','lm.f2p':'تُحوَّل أوقات الحصص تلقائياً أينما كنت.','lm.f3':'تأكيدات وتذكيرات','lm.f3p':'تنبيهات بالبريد وداخل المنصة حتى لا تفوتك أي حصة.',
  'lm.resume':'تابع من حيث توقفت','lm.eye2':'مكتبة التعلم الذاتي','lm.t3':'واصل التعلم','lm.t4':'بين الحصص','lm.p2':'مكتبة منظمة حسب الدورة والمستوى والدرس — مرتبطة بما يشرحه معلمك مباشرة.',
  'lm.f4':'دروس فيديو مسجلة','lm.f4p':'شاهد وأوقف وأعد المشاهدة بسرعتك.','lm.f5':'استماع وقراءة','lm.f5p':'تمارين صوتية ونصوص قراءة وموارد قابلة للتنزيل.','lm.f6':'اختبارات وواجبات','lm.f6p':'أنشطة يحددها المعلم مع تقييم لكل تسليم.',
  'pr.eye':'باقات الدراسة','pr.t1':'خطط تناسب','pr.t2':'أسبوعك','pr.p':'تتضمن الخطط القياسية حصة مباشرة واحدة لكل يوم دراسة. تحتاج أياماً أكثر أو أقل؟ خصّص باقتك.',
  'pr.group':'حصة جماعية','pr.one':'حصة فردية','pr.c1':'البداية','pr.c1p':'ابنِ عادة ثابتة','pr.c2':'تقدّم ثابت','pr.c2p':'الإيقاع الموصى به','pr.c3':'مكثّف','pr.c3p':'سرّع وصولك للمستوى التالي','pr.pop':'الأكثر طلباً',
  'pr.classes':'حصة · 4 أسابيع','pr.classes2':'حصة · 6 أسابيع','pr.classes3':'حصة · 8 أسابيع',
  'pr.l1':'3 أيام دراسة أسبوعياً','pr.l2':'حصص مباشرة 50 دقيقة','pr.l3':'وصول كامل للمكتبة الذاتية','pr.l4':'صالحة لمدة 6 أسابيع','pr.l5':'4–5 أيام دراسة أسبوعياً','pr.l6':'واجبات وتقييم المعلم','pr.l7':'مراجعة المستوى وشهادة','pr.l8':'حتى حصتين يومياً','pr.l9':'الوصول لنادي المحادثة','pr.l10':'أولوية في إعادة الجدولة',
  'pr.choose':'اختر الخطة','pr.note':'الأسعار المعروضة أمثلة توضيحية لهذا النموذج.',
  'sh.eye':'منصة واحدة، ثلاث لوحات','sh.t1':'كل مستخدم يرى','sh.t2':'ما يحتاجه تماماً','sh.p':'صلاحيات حسب الدور للطلاب والمعلمين والإداريين.',
  'te.eye':'معلمونا','te.t1':'معتمدون وودودون','te.t2':'ويفهمون المتعلم العربي','te.p':'معلمون ذوو خبرة يفهمون احتياجات المتعلمين الناطقين بالعربية.',
  'te.r1':'الإنجليزية العامة · CELTA','te.r2':'مدرب محادثة · DELTA','te.r3':'الإنجليزية العامة · TESOL','te.r4':'أعمال و IELTS · CELTA','te.grp':'جماعي',
  'te.m1':'9 سنوات في تعليم الكبار عبر الإنترنت.','te.m2':'مذيع سابق، متخصص في النطق والطلاقة.','te.m3':'تتحدث العربية والإنجليزية، صبورة مع المبتدئين.','te.m4':'خلفية في تصحيح الاختبارات، تقييم واضح ومنظم.',
  'ts.eye':'قصص المتعلمين','ts.t1':'تقدّم','ts.t2':'تشعر به فعلاً','ts.p':'من مبتدئين قلقين إلى متحدثين واثقين في العمل.',
  'ts.q1':'«وضعني الاختبار في مستوى A2 وعدّلته معلمتي بعد الحصة الأولى. بعد ستة أسابيع أنهي مستوى B1 وأستمتع بالمحادثة.»','ts.q2':'«إعادة الجدولة حسب مناوباتي سهلة، والأوقات تظهر دائماً بتوقيتي. التسجيلات أنقذتني أكثر من مرة.»','ts.q3':'«أحب رؤية شريط تقدمي يتحرك. تعليقات معلمتي على الواجبات دقيقة ولطيفة.»',
  'ts.r1':'الإنجليزية العامة · دبي','ts.r2':'تطوير المحادثة · الرياض','ts.r3':'الإنجليزية العامة · الدوحة',
  'ap.chip':'المرحلة الثانية · قريباً','ap.t1':'حصصك','ap.t2':'في جيبك','ap.p':'تطبيقات iPhone و Android مرتبطة بالحساب والجدول والمواد وسجل التقدم نفسه.','ap.s1':'حمّله من','ap.s2':'احصل عليه من',
  'ap.hi':'مرحباً نورة 👋','ap.next':'الحصة القادمة','ap.join':'انضم','ap.prog':'تقدم المستوى','ap.hw':'واجب مستحق','ap.rem':'الحصص المتبقية',
  'fq.t':'أسئلة وأجوبة','ct.t1':'اعرف مستواك في','ct.t2':'15 دقيقة','ct.p':'اختبار تحديد مستوى مجاني دون دفع. احصل على مستوى وخطة دراسة مقترحة فوراً.',
  'pt.chip':'مجاني · دون دفع','pt.t1':'اختبار','pt.t2':'تحديد المستوى','pt.p':'أجب عن مجموعة قصيرة من أسئلة القواعد والمفردات والقراءة، وسنقترح مستوى البدء والباقات المناسبة.',
  'pt.how':'كيف يعمل','pt.h1':'أسئلة متدرجة','pt.h1p':'قواعد ومفردات وقراءة عبر المستويات.','pt.h2':'تقييم المحادثة','pt.h2p':'يؤكد المعلم مستواك في حصتك الأولى.','pt.h3':'باعتماد المعلم','pt.h3p':'يمكن للمعلم أو الإدارة تأكيد المستوى المقترح أو تعديله.',
  'pk.chip':'المستوى المقترح:','pk.t1':'صمّم','pk.t2':'خطتك الدراسية','pk.p':'اختر الدورة والنوع والجدول وتاريخ البدء. راجع الشروط وتوفر المعلمين قبل الدفع.',
  'pk.s1':'الدورة','pk.s2':'نوع الحصة ومدتها','pk.s3':'تكرار الدراسة','pk.s4':'تاريخ البدء ووقت الحصة','pk.grp':'4–6 متعلمين','pk.one':'أنت ومعلمك فقط','pk.min':'دقيقة','pk.d25':'تركيز سريع','pk.d50':'قياسي',
  'pk.cpd':'الحصص في يوم الدراسة','pk.cpdn':'القياسي حصة واحدة يومياً','pk.days':'أيام الدراسة','pk.weeks':'مدة الباقة','pk.weeksn':'عدد أسابيع الدراسة','pk.start':'تاريخ البدء','pk.tz':'منطقتك الزمنية','pk.pref':'الأوقات المفضلة',
  'pk.sum':'باقتك','pk.apply':'تطبيق','pk.disc':'الخصم','pk.total':'الإجمالي','pk.pol1':'الإلغاء وإعادة الجدولة','pk.pol1p':'يمكن إعادة الجدولة أو الإلغاء قبل 24 ساعة من الحصة دون تكلفة. الإلغاء المتأخر يُحتسب حصة مستخدمة.',
  'pk.pol2':'الصلاحية والانتهاء','pk.pol2p':'الباقة صالحة لمدتها مع أسبوعين إضافيين، وتنتهي الحصص غير المستخدمة بعدها.','pk.pol3':'الاسترداد','pk.pol3p':'استرداد كامل قبل الحصة الأولى، وبعدها تُسترد الحصص غير المستخدمة بالتناسب عبر الإدارة.',
  'pk.agree':'قرأت شروط الباقة وتوفر المعلمين.','pk.pay':'متابعة إلى الدفع الآمن',
  'lb.chip':'التعلم الذاتي','lb.t1':'مكتبة','lb.t2':'التعلم','lb.p':'دروس فيديو واستماع وقراءة واختبارات وواجبات — منظمة حسب الدورة والمستوى والدرس.','lb.all':'الكل','lb.video':'فيديو','lb.listen':'استماع','lb.read':'قراءة','lb.quiz':'اختبار','lb.hw':'واجب',
  'd.over':'نظرة عامة','d.tt':'الجدول','d.mat':'المواد','d.asg':'الواجبات','d.prog':'التقدم','d.pay':'المدفوعات','d.cert':'الشهادات','d.set':'الإعدادات','d.upg':'تنتهي باقتك بعد 18 يوماً','d.upgp':'جدّد الآن للحفاظ على جدولك.','d.renew':'تجديد',
  'd.welcome':'أهلاً بعودتك،','d.book':'احجز حصة إضافية','d.k1':'الحصص المتبقية','d.k2':'الحضور','d.k3':'متوسط الاختبارات','d.k4':'انتهاء الباقة','d.nextc':'الحصة المباشرة القادمة','d.hrs':'ساعة','d.mins':'دقيقة','d.secs':'ثانية','d.join':'ادخل الفصل','d.resch':'إعادة جدولة',
  'd.lvl':'تقدم المستوى','sk.g':'القواعد','sk.s':'المحادثة','sk.l':'الاستماع','sk.r':'القراءة','d.week':'جدول هذا الأسبوع','d.up':'الحصص القادمة','d.all':'عرض الكل','d.today':'اليوم','d.booked':'محجوزة',
  'd.due1':'مستحق غداً · 12 سؤالاً','d.due2':'قيد التنفيذ · 60٪','d.due3':'تم التسليم · التقييم جاهز','d.startq':'ابدأ','d.resume':'تابع','d.fb':'ملاحظات المعلم','d.payh':'سجل المدفوعات','d.inv':'الفاتورة','d.pkg':'الباقة','d.date':'التاريخ','d.amt':'المبلغ','d.status':'الحالة','d.paid':'مدفوع','d.rcpt':'الإيصال',
  't.role':'معلمة · CELTA','t.avail':'التوفر','t.stu':'طلابي','t.mat':'مواد الدروس','t.hw':'الواجبات','t.rep':'التقارير','t.good':'مساء الخير،','t.assign':'إسناد واجب','t.k1':'حصص اليوم','t.k2':'طلاب نشطون','t.k3':'للمراجعة','t.k4':'ساعات هذا الأسبوع',
  't.att':'الحضور · مجموعة B1 المسائية (18:00)','t.st':'الطالب','t.lv':'المستوى','t.left':'الحصص المتبقية','t.mark':'التسجيل','t.save':'حفظ الحضور وإكمال الحصة','t.today':'جدول اليوم','t.done':'تمت','t.now':'الآن','t.later':'لاحقاً','t.availh':'التوفر الأسبوعي','t.availp':'اضغط على الخانات لتغيير التوفر',
  'a.people':'الطلاب والموظفون','a.courses':'الدورات والمستويات','a.assess':'الاختبارات','a.pkgs':'الباقات والعروض','a.sched':'الجداول','a.pays':'المدفوعات والاسترداد','a.ops':'نظرة على العمليات','a.title':'لوحة الإدارة','a.export':'تصدير','a.newpkg':'باقة جديدة',
  'a.k1':'الإيرادات (درهم، شهرياً)','a.k2':'طلاب نشطون','a.k3':'حصص هذا الأسبوع','a.k4':'مراجعات مستوى معلقة','a.rev':'الإيرادات والتسجيلات','a.lvls':'الطلاب حسب المستوى','a.book':'أحدث الحجوزات والمدفوعات','a.teacher':'المعلم','a.wk':'الحصص يومياً',
  'a.promo':'رموز الخصم','a.active':'فعّال','a.expired':'منتهٍ','a.refund':'طلبات الاسترداد','a.approve':'موافقة',
  'ft.p':'تعلم الإنجليزية مباشرة وذاتياً وفق الإطار الأوروبي، بالعربية والإنجليزية.','ft.sub':'اشترك','ft.learn':'تعلّم','ft.acc':'الحسابات','ft.sd':'لوحة الطالب','ft.td':'لوحة المعلم','ft.ad':'لوحة الإدارة','ft.ct':'تواصل','ft.uae':'الإمارات العربية المتحدة','ft.proto':'نموذج واجهة أمامية · بيانات تجريبية'
};

/* ---------- Dynamic content (EN / AR) ---------- */
const T = (en, ar) => (isAr() ? ar : en);
const LEVELS = [
  { c:'A1', col:'#ffc23d', h:38, en:['Beginner','Introduce yourself, ask simple questions and understand everyday phrases.',['Greetings and personal details','Numbers, dates and times','Simple present tense']], ar:['مبتدئ','عرّف بنفسك واطرح أسئلة بسيطة وافهم العبارات اليومية.',['التحية والمعلومات الشخصية','الأرقام والتواريخ والأوقات','المضارع البسيط']] },
  { c:'A2', col:'#ff9a5a', h:52, en:['Elementary','Describe your routine, shop, order food and handle simple exchanges.',['Past simple stories','Shopping and directions','Comparing things']], ar:['أساسي','صِف روتينك وتسوّق واطلب الطعام وتعامل مع مواقف بسيطة.',['قصص بالماضي البسيط','التسوق والاتجاهات','المقارنة بين الأشياء']] },
  { c:'B1', col:'#ff6f4f', h:66, en:['Intermediate','Talk about experiences, plans and opinions; manage most travel situations.',['Present perfect & experiences','Giving opinions and reasons','Writing emails and short texts']], ar:['متوسط','تحدث عن تجاربك وخططك وآرائك وتعامل مع معظم مواقف السفر.',['المضارع التام والتجارب','إبداء الرأي والأسباب','كتابة الرسائل والنصوص القصيرة']] },
  { c:'B2', col:'#a35bf0', h:80, en:['Upper-Intermediate','Discuss complex topics fluently and understand the main ideas of detailed texts.',['Debating and persuading','Conditionals and passive voice','Workplace communication']], ar:['فوق المتوسط','ناقش مواضيع معقدة بطلاقة وافهم الأفكار الرئيسية للنصوص المفصلة.',['النقاش والإقناع','الجمل الشرطية والمبني للمجهول','التواصل في العمل']] },
  { c:'C1', col:'#5b3df5', h:92, en:['Advanced','Express ideas spontaneously and use English flexibly for study and work.',['Nuanced vocabulary and idioms','Academic and professional writing','Presentations and meetings']], ar:['متقدم','عبّر عن أفكارك بتلقائية واستخدم الإنجليزية بمرونة للدراسة والعمل.',['مفردات دقيقة وتعابير اصطلاحية','الكتابة الأكاديمية والمهنية','العروض والاجتماعات']] },
  { c:'C2', col:'#101531', h:100, en:['Proficient','Understand virtually everything and express yourself with precision.',['Near-native fluency','Complex argumentation','Style and register mastery']], ar:['متمكن','افهم كل شيء تقريباً وعبّر عن نفسك بدقة عالية.',['طلاقة قريبة من الناطق الأصلي','حجج معقدة','إتقان الأسلوب والمستوى اللغوي']] }
];
let curLevel = 2;
function renderLadder(){
  const l = $('#ladder'); if(!l) return;
  l.innerHTML = LEVELS.map((v,i)=>`<button class="rung ${i===curLevel?'active':''}" data-i="${i}" style="height:${v.h}%;background:${v.col}"><b>${v.c}</b><small>${(isAr()?v.ar:v.en)[0]}</small></button>`).join('');
  $$('.rung',l).forEach(b=>b.onclick=()=>{curLevel=+b.dataset.i;renderLadder();renderLevel();});
}
function renderLevel(){
  const v = LEVELS[curLevel], d = isAr()?v.ar:v.en, el = $('#levelDetail');
  el.innerHTML = `<div class="fade-swap"><span class="chip" style="background:${v.col}22;color:${v.col==='#101531'?'#101531':v.col}">${T('Level','المستوى')} ${v.c}</span><h3>${d[0]}</h3><p class="muted">${d[1]}</p><ul>${d[2].map(x=>`<li><span class="check"><svg><use href="#i-check"/></svg></span>${x}</li>`).join('')}</ul><a href="#placement" class="btn btn-dark" style="margin-top:1.6rem">${T('Find my level','اعرف مستواي')} <svg class="arrow"><use href="#i-arrow"/></svg></a></div>`;
}

const FAQ = [
  ['Do I have to pay before the placement test?','هل أدفع قبل اختبار تحديد المستوى؟','No. Register and take the placement test for free. You only choose and pay for a package after seeing your recommended level.','لا. سجّل وخذ الاختبار مجاناً، ولا تختار الباقة وتدفع إلا بعد معرفة مستواك المقترح.'],
  ['Can I reschedule a class?','هل يمكنني إعادة جدولة حصة؟','Yes — from your dashboard, up to 24 hours before the class. Your class balance updates automatically.','نعم — من لوحتك وقبل 24 ساعة من الحصة. يتحدث رصيد حصصك تلقائياً.'],
  ['What time zone are classes shown in?','بأي توقيت تظهر الحصص؟','Every class is displayed in your own local time zone, wherever you are.','تظهر كل حصة بتوقيتك المحلي أينما كنت.'],
  ['Are classes recorded?','هل تُسجَّل الحصص؟','Recording is available for eligible classes, and recordings are only visible to the class participants and staff.','التسجيل متاح للحصص المؤهلة، ولا يراه إلا المشاركون في الحصة والفريق.'],
  ['Do I get a certificate?','هل أحصل على شهادة؟','Yes. When you complete a level and your progression is approved, you receive a LinguaBloom course-completion certificate.','نعم. عند إتمام المستوى واعتماد انتقالك تحصل على شهادة إتمام من لينجوا بلوم.'],
  ['Can I get a refund?','هل يمكنني استرداد المبلغ؟','Full refunds are available before your first class. After that, unused classes are refunded according to package conditions.','الاسترداد الكامل متاح قبل حصتك الأولى، وبعدها تُسترد الحصص غير المستخدمة وفق شروط الباقة.']
];
function renderFaq(){
  $('#faq').innerHTML = FAQ.map((f,i)=>`<div class="faq-item ${i===0?'open':''} reveal in"><button class="faq-q">${T(f[0],f[1])}<i></i></button><div class="faq-a"><div><p>${T(f[2],f[3])}</p></div></div></div>`).join('');
  $$('.faq-q').forEach(q=>q.onclick=()=>{const it=q.parentElement;const o=it.classList.contains('open');$$('.faq-item').forEach(x=>x.classList.remove('open'));if(!o)it.classList.add('open');});
}

/* ---------- Showcase tabs ---------- */
const SHOW = [
  { en:['Upcoming classes & one-click join','Book and reschedule by policy','Assignments, quizzes & feedback','Attendance, progress & remaining classes','Payment history and receipts'],
    ar:['الحصص القادمة والانضمام بنقرة','الحجز وإعادة الجدولة حسب السياسة','الواجبات والاختبارات والملاحظات','الحضور والتقدم والحصص المتبقية','سجل المدفوعات والإيصالات'],
    screen:()=>`<div class="row" style="justify-content:space-between"><b>${T('Hi Noura','مرحباً نورة')} 👋</b><span class="chip">B1</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;margin:1rem 0">${[['14/24',T('Classes left','متبقية')],['96%',T('Attendance','الحضور')],['88%',T('Quiz avg','الاختبارات')]].map(k=>`<div style="background:var(--bg);border-radius:12px;padding:.7rem"><b style="font-size:1.2rem">${k[0]}</b><br><small class="muted">${k[1]}</small></div>`).join('')}</div>
      <div style="background:var(--ink);color:#fff;border-radius:14px;padding:1rem;display:flex;justify-content:space-between;align-items:center;gap:.5rem"><div><small style="color:#b8bbd4">${T('Next class · 18:00','الحصة القادمة · 18:00')}</small><b style="display:block">Talking about experiences</b></div><span class="btn btn-coral btn-sm">${T('Join','انضم')}</span></div>
      <div style="margin-top:1rem"><small class="muted">${T('Level progress','تقدم المستوى')}</small><div class="bar" style="margin-top:.4rem"><i style="width:62%"></i></div></div>` },
  { en:['Availability & assigned timetable','Assigned students & learning records','Lesson materials & homework','Attendance & class completion','Feedback & progress evaluations'],
    ar:['التوفر والجدول المسند','الطلاب المسندون وسجلاتهم','مواد الدروس والواجبات','الحضور وإكمال الحصص','الملاحظات وتقييم التقدم'],
    screen:()=>`<b>${T("Today's classes",'حصص اليوم')}</b>${[['15:00','Omar K. · 1:1','mint',T('Done','تمت')],['18:00','Group B1-Evening','coral',T('Now','الآن')],['20:00','Group A2-Night','gray',T('Later','لاحقاً')]].map(r=>`<div class="class-row"><div class="date-box" style="width:56px"><b style="font-size:.85rem">${r[0]}</b></div><div class="info"><b>${r[1]}</b></div><span class="chip ${r[2]}">${r[3]}</span></div>`).join('')}
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:.8rem">${Array.from({length:21},(_,i)=>`<div style="height:22px;border-radius:5px;background:${[1,3,4,8,9,12,15,17,19].includes(i)?'var(--mint)':'var(--bg)'}"></div>`).join('')}</div>` },
  { en:['Students, teachers & staff roles','Courses, levels & question banks','Packages, prices & promo codes','Payments, refunds & balances','Attendance, learning & ops reports'],
    ar:['أدوار الطلاب والمعلمين والموظفين','الدورات والمستويات وبنوك الأسئلة','الباقات والأسعار ورموز الخصم','المدفوعات والاسترداد والأرصدة','تقارير الحضور والتعلم والعمليات'],
    screen:()=>`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;margin-bottom:1rem">${[['184K',T('Revenue','الإيرادات')],['1,248',T('Students','الطلاب')],['642',T('Classes','الحصص')]].map(k=>`<div style="background:var(--bg);border-radius:12px;padding:.7rem"><b style="font-size:1.2rem">${k[0]}</b><br><small class="muted">${k[1]}</small></div>`).join('')}</div>
      <div class="bars" style="height:150px">${[55,72,64,88,76,94,60].map((h,i)=>`<div><i style="height:${h}%;animation-delay:${i*.07}s"></i><small>${['S','M','T','W','T','F','S'][i]}</small></div>`).join('')}</div>` }
];
let showIdx = 0;
function renderShow(){
  const s = SHOW[showIdx];
  $('#showList').innerHTML = (isAr()?s.ar:s.en).map((x,i)=>`<li class="fade-swap" style="animation-delay:${i*.06}s"><span class="check"><svg><use href="#i-check"/></svg></span>${x}</li>`).join('');
  $('#showScreen').innerHTML = `<div class="fade-swap">${s.screen()}</div>`;
}

/* ---------- Testimonials ---------- */
let tIdx = 0, tTimer;
function initTesti(){
  const items = $$('.testi'), dots = $('#tDots');
  dots.innerHTML = items.map((_,i)=>`<i data-i="${i}" class="${i===0?'on':''}"></i>`).join('');
  const go = i => { tIdx=(i+items.length)%items.length; items.forEach((t,j)=>t.classList.toggle('on',j===tIdx)); $$('i',dots).forEach((d,j)=>d.classList.toggle('on',j===tIdx)); };
  $('#tNext').onclick=()=>{go(tIdx+1);reset();}; $('#tPrev').onclick=()=>{go(tIdx-1);reset();};
  $$('i',dots).forEach(d=>d.onclick=()=>{go(+d.dataset.i);reset();});
  const reset=()=>{clearInterval(tTimer);tTimer=setInterval(()=>go(tIdx+1),6000);}; reset();
}

/* ---------- Pricing toggle ---------- */
function initToggle(){
  const tg = $('#fmtToggle'), pill = $('.pill',tg), btns = $$('button',tg);
  const place = b => { pill.style.width=b.offsetWidth+'px'; pill.style.left=b.offsetLeft+'px'; };
  btns.forEach(b=>b.onclick=()=>{
    btns.forEach(x=>x.classList.remove('on')); b.classList.add('on'); place(b);
    $$('.price-anim').forEach(p=>{p.classList.add('flip');setTimeout(()=>{p.textContent=b.dataset.fmt==='one'?p.dataset.o:p.dataset.g;p.classList.remove('flip');},250);});
  });
  requestAnimationFrame(()=>place($('.on',tg)));
  window.addEventListener('resize',()=>place($('.on',tg)));
  window._placePill = () => place($('.on',tg));
}

/* ==========================================================
   Placement test
   ========================================================== */
const QS = [
  { k:'Grammar', ka:'القواعد', lv:1, q:'She ___ from Dubai.', o:['am','is','are','be'], a:1 },
  { k:'Vocabulary', ka:'المفردات', lv:1, q:'Which word means the opposite of “expensive”?', o:['cheap','tall','early','heavy'], a:0 },
  { k:'Grammar', ka:'القواعد', lv:2, q:'Yesterday we ___ to the beach.', o:['go','goes','went','gone'], a:2 },
  { k:'Grammar', ka:'القواعد', lv:3, q:'I ___ never ___ to London.', o:['have / been','did / go','was / be','am / going'], a:0 },
  { k:'Reading', ka:'القراءة', lv:3, q:'“The meeting was postponed due to the storm.” What happened to the meeting?', o:['It was cancelled forever','It happened early','It was moved to a later time','It was very short'], a:2 },
  { k:'Grammar', ka:'القواعد', lv:4, q:'If I ___ more time, I would learn to play the piano.', o:['have','had','will have','would have'], a:1 },
  { k:'Vocabulary', ka:'المفردات', lv:4, q:'Choose the best word: “The new policy had a significant ___ on sales.”', o:['affect','impact','effort','attempt'], a:1 },
  { k:'Grammar', ka:'القواعد', lv:5, q:'Not only ___ the deadline, but he also exceeded expectations.', o:['he met','did he meet','he did meet','met he'], a:1 }
];
let qi = 0, answers = [];
function testIntro(){
  qi=0; answers=[];
  $('#testPanel').innerHTML = `<div class="fade-swap">
    <div class="img-wrap" style="border-radius:20px;aspect-ratio:16/7;margin-bottom:1.6rem"><img src="${UNS('1427504494785-3a9ca7044f45',1000)}" alt="Students taking a test"></div>
    <h2 style="font-size:1.8rem;margin-bottom:.6rem">${T('Ready to find your level?','مستعد لمعرفة مستواك؟')}</h2>
    <p class="muted">${T(`${QS.length} questions · about 10–15 minutes · grammar, vocabulary and reading.`,`${QS.length} أسئلة · حوالي 10–15 دقيقة · قواعد ومفردات وقراءة.`)}</p>
    <div class="row" style="margin-top:1.4rem;gap:.6rem"><span class="chip">${T('No payment','دون دفع')}</span><span class="chip coral">${T('Instant result','نتيجة فورية')}</span><span class="chip mint">${T('Teacher-reviewed','مراجعة المعلم')}</span></div>
    <button class="btn btn-primary" style="margin-top:2rem" id="beginTest">${T('Begin assessment','ابدأ الاختبار')} <svg class="arrow"><use href="#i-arrow"/></svg></button></div>`;
  fixImgs($('#testPanel'));
  $('#beginTest').onclick = renderQ;
}
function renderQ(){
  const q = QS[qi], pct = Math.round((qi)/QS.length*100);
  $('#testPanel').innerHTML = `
    <div class="test-top"><b>${T('Question','سؤال')} ${qi+1} / ${QS.length}</b><span class="chip gray">${T(q.k,q.ka)} · ${LEVELS[q.lv-1].c}</span></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="q-type fade-swap" dir="ltr" style="text-align:left">
      <div class="q-text">${q.q.replace('___','<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>').replace('___','<u>&nbsp;&nbsp;&nbsp;&nbsp;</u>')}</div>
      <div class="options">${q.o.map((o,i)=>`<button class="opt ${answers[qi]===i?'sel':''}" data-i="${i}"><span class="key">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>
    </div>
    <div class="test-actions"><button class="btn btn-ghost" id="qBack" ${qi===0?'disabled style="opacity:.4"':''}><svg class="arrow"><use href="#i-back"/></svg> ${T('Back','السابق')}</button><button class="btn btn-primary" id="qNext" ${answers[qi]==null?'disabled style="opacity:.5"':''}>${qi===QS.length-1?T('See my result','اعرض نتيجتي'):T('Next','التالي')} <svg class="arrow"><use href="#i-arrow"/></svg></button></div>`;
  requestAnimationFrame(()=>$('.bar i',$('#testPanel')).style.width = Math.round((qi+ (answers[qi]!=null?1:0))/QS.length*100)+'%');
  $$('.opt').forEach(b=>b.onclick=()=>{answers[qi]=+b.dataset.i;$$('.opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');const n=$('#qNext');n.disabled=false;n.style.opacity=1;$('.bar i',$('#testPanel')).style.width=Math.round((qi+1)/QS.length*100)+'%';});
  $('#qBack').onclick=()=>{if(qi>0){qi--;renderQ();}};
  $('#qNext').onclick=()=>{if(answers[qi]==null)return; if(qi<QS.length-1){qi++;renderQ();}else showResult();};
}
let recommended = 'B1';
function showResult(){
  let score=0, top=0; QS.forEach((q,i)=>{if(answers[i]===q.a){score++;top=Math.max(top,q.lv);}});
  const lvIdx = Math.min(5, Math.max(0, Math.round(score/QS.length*5)));
  const lv = LEVELS[lvIdx]; recommended = lv.c; $('#recLevel').textContent=lv.c; $('#sumLevel').textContent=lv.c;
  const pct = Math.round(score/QS.length*100), C = 2*Math.PI*80;
  const sk = (k)=>{const qs=QS.map((q,i)=>[q,i]).filter(([q])=>q.k===k);return Math.round(qs.filter(([q,i])=>answers[i]===q.a).length/qs.length*100)||0;};
  $('#testPanel').innerHTML = `<div class="result fade-swap">
    <span class="chip mint">${T('Assessment complete','اكتمل الاختبار')}</span>
    <h2 style="font-size:1.8rem;margin:1rem 0 1.5rem">${T('Your recommended level','مستواك المقترح')}</h2>
    <div class="ring"><svg viewBox="0 0 180 180"><circle class="bg" cx="90" cy="90" r="80"/><circle class="fg" id="ringFg" cx="90" cy="90" r="80" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div class="ring-label"><b>${lv.c}</b><small>${(isAr()?lv.ar:lv.en)[0]}</small></div></div>
    <p class="muted" style="max-width:440px;margin:0 auto">${(isAr()?lv.ar:lv.en)[1]}</p>
    <div class="skill-bars" style="max-width:440px;margin-inline:auto">
      ${[['Grammar','القواعد'],['Vocabulary','المفردات'],['Reading','القراءة']].map(([k,ka])=>`<div><span>${T(k,ka)}<b>${sk(k)}%</b></span><div class="bar"><i style="width:0" data-w="${sk(k)}"></i></div></div>`).join('')}
    </div>
    <div class="tz-note" style="max-width:440px;margin:0 auto 1.6rem;text-align:start"><svg><use href="#i-shield"/></svg>${T('A teacher will confirm or adjust this level during your first class.','سيؤكد المعلم هذا المستوى أو يعدله في حصتك الأولى.')}</div>
    <div class="row" style="justify-content:center"><a href="#packages" class="btn btn-primary">${T(`See ${lv.c} packages`,`باقات ${lv.c}`)} <svg class="arrow"><use href="#i-arrow"/></svg></a><button class="btn btn-ghost" id="retake"><svg><use href="#i-refresh"/></svg> ${T('Retake','إعادة')}</button></div>
    <small class="muted" style="display:block;margin-top:1rem">${T(`Score ${score}/${QS.length} · ${pct}%`,`النتيجة ${score}/${QS.length} · ${pct}٪`)}</small></div>`;
  setTimeout(()=>{ $('#ringFg').style.strokeDashoffset = C*(1-(lvIdx+1)/6); $$('.skill-bars i[data-w]').forEach(i=>i.style.width=i.dataset.w+'%'); },80);
  $('#retake').onclick=testIntro;
  confetti();
  calcPkg();
}
function confetti(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c=document.createElement('div');c.className='confetti';const cols=['#5b3df5','#ff6f4f','#14b88a','#ffc23d'];
  for(let i=0;i<70;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'%';p.style.background=cols[i%4];p.style.animationDuration=(2+Math.random()*2)+'s';p.style.animationDelay=Math.random()*.6+'s';p.style.borderRadius=Math.random()>.5?'50%':'2px';c.appendChild(p);}
  document.body.appendChild(c);setTimeout(()=>c.remove(),4800);
}

/* ==========================================================
   Package builder
   ========================================================== */
const DAYS_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], DAYS_AR=['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
const SLOTS=[{t:'08:00',full:false},{t:'10:00',full:true},{t:'13:00',full:false},{t:'16:00',full:false},{t:'18:00',full:false},{t:'19:00',full:true},{t:'20:00',full:false},{t:'21:00',full:false}];
const P = { course:'General English', format:'Group', duration:'50', cpd:1, weeks:6, days:[0,1,2,3], slots:['18:00'], promo:0, rate:{course:1,format:1,duration:1} };
const BASE = 55; // AED per standard group 50-min class (sample)
function renderDays(){
  $('#days').innerHTML = (isAr()?DAYS_AR:DAYS_EN).map((d,i)=>`<button class="day ${P.days.includes(i)?'on':''}" data-i="${i}">${d}</button>`).join('');
  $$('.day').forEach(b=>b.onclick=()=>{const i=+b.dataset.i; if(P.days.includes(i)){ if(P.days.length>1) P.days=P.days.filter(x=>x!==i); else toast(T('Choose at least one study day','اختر يوماً واحداً على الأقل')); } else P.days.push(i); P.days.sort(); renderDays(); calcPkg();});
}
function renderSlots(){
  $('#slots').innerHTML = SLOTS.map(s=>`<button class="slot ${s.full?'full':''} ${P.slots.includes(s.t)?'on':''}" data-t="${s.t}" title="${s.full?T('Fully booked','محجوز بالكامل'):T('Teachers available','معلمون متاحون')}">${s.t}</button>`).join('');
  $$('.slot').forEach(b=>b.onclick=()=>{const t=b.dataset.t; if(P.slots.includes(t)){ if(P.slots.length>1) P.slots=P.slots.filter(x=>x!==t);} else { if(P.slots.length>=P.cpd) P.slots.shift(); P.slots.push(t);} renderSlots(); calcPkg();});
}
function calcPkg(){
  const total = P.days.length * P.cpd * P.weeks;
  const per = BASE * P.rate.course * P.rate.format * P.rate.duration;
  const sub = Math.round(total*per/10)*10, disc = Math.round(sub*P.promo), tot = sub-disc;
  const start = $('#startDate').value ? new Date($('#startDate').value) : new Date();
  const exp = new Date(start); exp.setDate(exp.getDate() + (P.weeks+2)*7);
  const fmt = d => d.toLocaleDateString(isAr()?'ar-AE':'en-GB',{day:'numeric',month:'short',year:'numeric'});
  const dn = isAr()?DAYS_AR:DAYS_EN;
  const row = (a,b)=>`<div class="sum-row"><span>${a}</span><b>${b}</b></div>`;
  $('#sumRows').innerHTML =
    row(T('Course','الدورة'), T(P.course, P.course==='General English'?'الإنجليزية العامة':'تطوير المحادثة')) +
    row(T('Format','النوع'), `${T(P.format, P.format==='Group'?'جماعي':'فردي')} · ${P.duration} ${T('min','د')}`) +
    row(T('Schedule','الجدول'), `${P.days.map(i=>dn[i]).join(', ')}`) +
    row(T('Class times','الأوقات'), P.slots.join(' · ')) +
    row(T('Total classes','عدد الحصص'), `${total} (${P.cpd}/${T('day','يوم')})`) +
    row(T('Start → valid until','البدء ← الصلاحية'), `${fmt(start)} → ${fmt(exp)}`) +
    row(T('Subtotal','المجموع الفرعي'), `${sub.toLocaleString()} AED`);
  $('#discRow').style.display = P.promo? 'flex':'none'; $('#discVal').textContent = `−${disc.toLocaleString()} AED`;
  animateNum($('#total'), tot);
  const tz = +$('#tzSel').value, off = tz-4;
  const conv = t => { let [h,m]=t.split(':').map(Number); let mins=h*60+m+off*60; mins=(mins+1440)%1440; return `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`; };
  $('#tzNote').textContent = T(`Shown in your time zone: ${P.slots.map(conv).join(', ')} (${$('#tzSel').selectedOptions[0].text})`,`بتوقيتك: ${P.slots.map(conv).join('، ')} (${$('#tzSel').selectedOptions[0].text})`);
  P._total = tot; P._classes = total;
}
function animateNum(el, to){
  const from = +(el.dataset.v||0), t0 = performance.now(), d = 600; el.dataset.v = to;
  const step = now => { const p = Math.min(1,(now-t0)/d), e = 1-Math.pow(1-p,3); el.textContent = Math.round(from+(to-from)*e).toLocaleString(); if(p<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function initBuilder(){
  const d = new Date(); d.setDate(d.getDate()+3); $('#startDate').value = d.toISOString().slice(0,10); $('#startDate').min = new Date().toISOString().slice(0,10);
  $$('.choice-grid').forEach(g=>{ const key=g.dataset.group; $$('.choice:not(.disabled)',g).forEach(c=>c.onclick=()=>{ $$('.choice',g).forEach(x=>x.classList.remove('on')); c.classList.add('on'); P[key]=c.dataset.val; P.rate[key]=+c.dataset.rate; calcPkg(); }); });
  $$('[data-step]').forEach(b=>b.onclick=()=>{ const k=b.dataset.step, lim = k==='cpd'?[1,3]:[2,16]; P[k]=Math.min(lim[1],Math.max(lim[0],P[k]+ +b.dataset.d)); $('#'+k).textContent=P[k]; if(k==='cpd'&&P.slots.length>P.cpd) P.slots=P.slots.slice(0,P.cpd); renderSlots(); calcPkg(); });
  $('#startDate').onchange = calcPkg; $('#tzSel').onchange = calcPkg;
  $('#promoBtn').onclick = ()=>{ const v=$('#promoIn').value.trim().toUpperCase(); if(v==='BLOOM10'){P.promo=.1;toast(T('Promo applied: 10% off','تم تطبيق الخصم: 10٪'));} else {P.promo=0;toast(T('Invalid promo code','رمز غير صالح'));} calcPkg(); };
  $('#payBtn').onclick = ()=>{ if(!$('#agree').checked){ toast(T('Please accept the package conditions','يرجى الموافقة على شروط الباقة')); $('.agree').animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:300}); return;} openPay(); };
  renderDays(); renderSlots(); calcPkg();
}
function openPay(){
  const m = $('#payModal'), box = $('#payBox');
  box.innerHTML = `<div class="row" style="justify-content:space-between"><h3 style="font-size:1.3rem">${T('Secure payment','دفع آمن')}</h3><button class="round-btn" style="width:38px;height:38px" id="closePay">✕</button></div>
    <p class="muted" style="font-size:.9rem;margin-top:.3rem">${T('Payment gateway placeholder — integration to be confirmed.','واجهة بوابة دفع تجريبية — يُحدد التكامل لاحقاً.')}</p>
    <div class="pay-methods"><button class="pay-m on">${T('Card','بطاقة')}</button><button class="pay-m">Apple Pay</button><button class="pay-m">Google Pay</button></div>
    <div class="card-visual"><div class="row" style="justify-content:space-between"><b style="font-family:var(--font)">LinguaBloom</b><span>VISA</span></div><div style="font-size:1.15rem;letter-spacing:.12em" id="cvNum">•••• •••• •••• 4242</div><div class="row" style="justify-content:space-between;font-size:.8rem"><span id="cvName">NOURA AHMED</span><span>12/28</span></div></div>
    <div class="field"><label>${T('Card number','رقم البطاقة')}</label><input class="input" id="ccNum" value="4242 4242 4242 4242" dir="ltr"></div>
    <div class="row" style="margin-top:.8rem"><div class="field" style="flex:1"><label>${T('Name on card','الاسم على البطاقة')}</label><input class="input" id="ccName" value="Noura Ahmed"></div><div class="field" style="width:110px"><label>CVC</label><input class="input" value="123" dir="ltr"></div></div>
    <button class="btn btn-primary btn-block" style="margin-top:1.4rem" id="confirmPay"><svg><use href="#i-shield"/></svg> ${T('Pay','ادفع')} ${P._total.toLocaleString()} AED</button>`;
  m.classList.add('open');
  $('#closePay').onclick = ()=>m.classList.remove('open');
  $$('.pay-m').forEach(b=>b.onclick=()=>{$$('.pay-m').forEach(x=>x.classList.remove('on'));b.classList.add('on');});
  $('#ccNum').oninput=e=>{$('#cvNum').textContent=e.target.value||'•••• •••• •••• ••••';};
  $('#ccName').oninput=e=>{$('#cvName').textContent=(e.target.value||'').toUpperCase();};
  $('#confirmPay').onclick = e => {
    e.currentTarget.innerHTML = '<span class="spinner"></span>'; e.currentTarget.disabled = true;
    setTimeout(()=>{
      const inv = 'LB-'+(10483+Math.floor(Math.random()*400));
      box.innerHTML = `<div style="text-align:center"><div class="success-check"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
        <h3 style="font-size:1.5rem">${T('Payment confirmed!','تم تأكيد الدفع!')}</h3><p class="muted">${T('A confirmation and receipt have been sent to your email.','تم إرسال التأكيد والإيصال إلى بريدك.')}</p></div>
        <div class="receipt"><div class="sum-row"><span>${T('Receipt','الإيصال')}</span><b>#${inv}</b></div><div class="sum-row"><span>${T('Package','الباقة')}</span><b>${P._classes} ${T('classes','حصة')} · ${recommended}</b></div><div class="sum-row"><span>${T('First class','الحصة الأولى')}</span><b>${$('#startDate').value} · ${P.slots[0]}</b></div><div class="sum-row"><span>${T('Paid','المدفوع')}</span><b>${P._total.toLocaleString()} AED</b></div></div>
        <a href="#student" class="btn btn-primary btn-block" id="toDash">${T('Go to my dashboard','اذهب إلى لوحتي')} <svg class="arrow"><use href="#i-arrow"/></svg></a>`;
      $('#toDash').onclick=()=>m.classList.remove('open'); confetti();
    },1600);
  };
}
$('#payModal').addEventListener('click',e=>{ if(e.target.id==='payModal') e.currentTarget.classList.remove('open'); });

/* ==========================================================
   Library
   ========================================================== */
const LESSONS = [
  {t:'Present Perfect: Life experiences',type:'video',lv:'B1',d:'14 min',p:64,img:'1513258496099-48168024aec0'},
  {t:'At the airport — listening practice',type:'listening',lv:'A2',d:'9 min',p:60,img:'1436491865332-7a61a109cc05'},
  {t:'Reading: A day in Dubai Marina',type:'reading',lv:'A2',d:'6 pages',p:100,img:'1512453979798-5ea266f8880c'},
  {t:'Unit 5 Quiz · Past experiences',type:'quiz',lv:'B1',d:'12 Q',p:0,img:'1434030216411-0b793f4b4173'},
  {t:'Homework: Write about your best holiday',type:'homework',lv:'B1',d:'Due Thu',p:100,img:'1455390582262-044cdead277a'},
  {t:'Small talk that sounds natural',type:'video',lv:'B1',d:'11 min',p:20,img:'1543269865-cbf427effbad'},
  {t:'Podcast: Working from home',type:'listening',lv:'B2',d:'18 min',p:0,img:'1590602847861-f357a9332bbc'},
  {t:'Ordering food & making requests',type:'video',lv:'A2',d:'10 min',p:100,img:'1517248135467-4c7edcad34c4'},
  {t:'Reading: The future of remote learning',type:'reading',lv:'B2',d:'4 pages',p:35,img:'1516321318423-f06f85e504b3'},
  {t:'Vocabulary quiz · Travel words',type:'quiz',lv:'A2',d:'15 Q',p:100,img:'1488646953014-85cb44e25828'},
  {t:'Homework: Record a 1-minute self-intro',type:'homework',lv:'A2',d:'Due Sun',p:0,img:'1478737270239-2f02b77fc618'},
  {t:'Conditionals in everyday life',type:'video',lv:'B2',d:'16 min',p:0,img:'1522202176988-66273c2fd55f'}
];
const TYPE_META = { video:['Video','فيديو','',  'i-play'], listening:['Listening','استماع','coral','i-head'], reading:['Reading','قراءة','mint','i-book'], quiz:['Quiz','اختبار','sun','i-quiz'], homework:['Homework','واجب','gray','i-file'] };
let libF='all', libQ='';
function renderLib(){
  const list = LESSONS.filter(l=>(libF==='all'||l.type===libF)&&l.t.toLowerCase().includes(libQ));
  $('#lessons').innerHTML = list.length ? list.map((l,i)=>{const m=TYPE_META[l.type];return `<article class="lesson" style="animation-delay:${i*.04}s">
    <div class="img-wrap"><span class="chip ${m[2]} type">${T(m[0],m[1])}</span><span class="dur">${l.d}</span><div class="play"><svg><use href="#${m[3]}"/></svg></div><img loading="lazy" src="${UNS(l.img,600)}" alt=""></div>
    <div class="lesson-body"><small>General English · ${l.lv}</small><h4 dir="ltr" style="text-align:start">${l.t}</h4><div class="bar"><i style="width:${l.p}%"></i></div>
    <div class="lesson-foot"><span class="muted">${l.p===100?T('Completed','مكتمل'):l.p?l.p+'%':T('Not started','لم يبدأ')}</span><button class="btn btn-sm ${l.p===100?'btn-ghost':'btn-primary'}" data-toast="${l.p===100?'Opening review…':'Opening lesson…'}">${l.p===100?T('Review','مراجعة'):l.p?T('Resume','تابع'):T('Start','ابدأ')}</button></div></div></article>`;}).join('')
    : `<div class="empty">${T('No lessons match your search.','لا توجد دروس مطابقة.')}</div>`;
  fixImgs($('#lessons')); bindToasts($('#lessons'));
}
function initLib(){
  $$('#libFilters .filter').forEach(b=>b.onclick=()=>{$$('#libFilters .filter').forEach(x=>x.classList.remove('on'));b.classList.add('on');libF=b.dataset.f;renderLib();});
  $('#libSearch').oninput=e=>{libQ=e.target.value.toLowerCase();renderLib();};
  renderLib();
}

/* ==========================================================
   Dashboards
   ========================================================== */
function timetable(el, mode){
  const hours=['08:00','10:00','13:00','16:00','18:00','20:00'], dn=isAr()?DAYS_AR:DAYS_EN;
  const ev = { '4-0':['Unit 6',''], '4-2':['Unit 6',''], '5-3':['Speaking Club','c2'], '4-4':['Unit 7',''], '3-0':['1:1 Pron.','c3'] };
  const avail = el._avail || (el._avail = new Set(['4-0','4-1','4-2','4-3','4-4','5-0','5-2','5-4','3-1','3-3','2-0','2-6']));
  let h = `<div></div>` + dn.map(d=>`<div class="tt-h">${d}</div>`).join('');
  hours.forEach((t,r)=>{ h += `<div class="tt-t">${t}</div>`; for(let c=0;c<7;c++){ const k=`${r}-${c}`;
    if(mode==='student'){ const e=ev[k]; h += e?`<div class="tt-c ev ${e[1]}">${e[0]}</div>`:`<div class="tt-c"></div>`; }
    else h += `<div class="tt-c avail ${avail.has(k)?'on':''}" data-k="${k}"></div>`; } });
  el.innerHTML = h;
  if(mode==='teacher') $$('.tt-c.avail',el).forEach(c=>c.onclick=()=>{const k=c.dataset.k; avail.has(k)?avail.delete(k):avail.add(k); c.classList.toggle('on'); });
}
const STU = [
  ['Noura Ahmed','1494790108377-be9c29b29330','B1',14,'p'],['Omar Khalid','1506794778202-cad84cf45f1d','B1',9,'p'],
  ['Mariam Saleh','1438761681033-6461ffad8d80','B1',20,'l'],['Yousef Ali','1500648767791-00dcc994a43e','A2→B1',3,'p'],['Huda Nasser','1544005313-94ddf0286df2','B1',11,'a']
];
function renderAtt(){
  $('#attTbl tbody').innerHTML = STU.map((s,i)=>`<tr><td><div class="person"><img src="${UNS(s[1],80)}" alt="">${s[0]}</div></td><td><span class="chip">${s[2]}</span></td><td>${s[3]}${s[3]<5?` <span class="chip coral" style="font-size:.65rem">${T('Low','منخفض')}</span>`:''}</td><td><div class="att" data-r="${i}">${['p','l','a'].map(k=>`<button class="${k} ${s[4]===k?'on':''}" data-k="${k}" title="${{p:'Present',l:'Late',a:'Absent'}[k]}">${T(k.toUpperCase(),{p:'ح',l:'م',a:'غ'}[k])}</button>`).join('')}</div></td></tr>`).join('');
  $$('#attTbl .att').forEach(a=>$$('button',a).forEach(b=>b.onclick=()=>{STU[+a.dataset.r][4]=b.dataset.k;$$('button',a).forEach(x=>x.classList.remove('on'));b.classList.add('on');}));
  fixImgs($('#attTbl'));
}
function renderAdmin(){
  // line chart
  const rev=[92,104,98,121,118,135,142,138,156,149,171,184], W=600,H=220,pad=24, max=200;
  const pts = rev.map((v,i)=>[pad+i*(W-pad*2)/(rev.length-1), H-pad-(v/max)*(H-pad*2)]);
  const d = pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const months = isAr()?['ينا','فبر','مار','أبر','ماي','يون','يول','أغس','سبت','أكت','نوف','ديس']:['J','F','M','A','M','J','J','A','S','O','N','D'];
  $('#revChart').innerHTML = [0,50,100,150].map(v=>`<line x1="${pad}" x2="${W-pad}" y1="${H-pad-(v/max)*(H-pad*2)}" y2="${H-pad-(v/max)*(H-pad*2)}" stroke="#efece5"/>`).join('') +
    `<path class="area" d="${d} L ${pts.at(-1)[0]} ${H-pad} L ${pad} ${H-pad} Z"/><path class="line" d="${d}"/>` +
    pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===pts.length-1?6:0}" fill="#ff6f4f" stroke="#fff" stroke-width="3"/><text x="${p[0]}" y="${H-4}" text-anchor="middle">${months[i]}</text>`).join('');
  // donut
  const parts=[['A1',12,'#ffc23d'],['A2',24,'#ff9a5a'],['B1',31,'#ff6f4f'],['B2',19,'#a35bf0'],['C1',10,'#5b3df5'],['C2',4,'#101531']]; let off=25;
  $('#donut').innerHTML = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="#f0ede6" stroke-width="5"/>` + parts.map(p=>{const s=`<circle cx="21" cy="21" r="15.9" fill="none" stroke="${p[2]}" stroke-width="5" stroke-dasharray="${p[1]} ${100-p[1]}" stroke-dashoffset="${off}"><animate attributeName="stroke-dasharray" from="0 100" to="${p[1]} ${100-p[1]}" dur="1.2s" fill="freeze"/></circle>`; off-=p[1]; return s;}).join('') + `<text x="21" y="22" text-anchor="middle" font-size="5" font-weight="800" fill="#101531">1,248</text><text x="21" y="27" text-anchor="middle" font-size="2.6" fill="#6b6f86">${T('students','طالب')}</text>`;
  $('#legend').innerHTML = parts.map(p=>`<div><i style="background:${p[2]}"></i>${p[0]}<b>${p[1]}%</b></div>`).join('');
  // bars
  const dn = isAr()?DAYS_AR:DAYS_EN; const b=[78,96,104,88,112,40,124];
  $('#bars').innerHTML = b.map((v,i)=>`<div><small style="color:var(--ink)">${v}</small><i style="height:${v/130*100}%;animation-delay:${i*.08}s"></i><small>${dn[i]}</small></div>`).join('');
  // table
  const rows=[['Noura Ahmed','1494790108377-be9c29b29330','Steady Progress','Sarah M.','1,161','mint',T('Paid','مدفوع')],['Omar Khalid','1506794778202-cad84cf45f1d','1:1 Speaking','James C.','2,190','mint',T('Paid','مدفوع')],['Huda Nasser','1544005313-94ddf0286df2','Starter','Layla H.','690','sun',T('Pending','معلّق')],['Khalid M.','1507003211169-0a1dd7228f2d','Steady Progress','Sarah M.','323','coral',T('Refund','استرداد')]];
  $('#adminTbl').innerHTML = rows.map(r=>`<tr><td><div class="person"><img src="${UNS(r[1],80)}" alt="">${r[0]}</div></td><td>${r[2]}</td><td>${r[3]}</td><td><b>${r[4]} AED</b></td><td><span class="chip ${r[5]}">${r[6]}</span></td></tr>`).join('');
  fixImgs($('#adminTbl'));
}
let cdTarget = Date.now() + (11*60+43)*1000 + 2*3600*1000;
function tick(){ const s=Math.max(0,Math.floor((cdTarget-Date.now())/1000)); const p=n=>String(n).padStart(2,'0'); if($('#cdH')){$('#cdH').textContent=p(Math.floor(s/3600));$('#cdM').textContent=p(Math.floor(s%3600/60));$('#cdS').textContent=p(s%60);} }
setInterval(tick,1000); tick();

/* ==========================================================
   Global behaviours
   ========================================================== */
function toast(msg){ const t=$('#toast'); $('span',t).textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2600); }
window.toast = toast;
function bindToasts(root=document){ $$('[data-toast]',root).forEach(b=>{ if(b._bt) return; b._bt=1; b.addEventListener('click',()=>toast(b.dataset.toast)); }); }

function fixImgs(root=document){ $$('img',root).forEach(img=>{ if(img._f) return; img._f=1; const bad=()=>img.classList.add('broken'); img.addEventListener('error',bad); if(img.complete && img.naturalWidth===0 && img.src) bad(); }); }

let io;
function observe(root=document){
  if(!io) io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); const c=$$('.count',e.target); if(e.target.classList.contains('count')) c.push(e.target); c.forEach(countUp); io.unobserve(e.target);} }),{threshold:.15, rootMargin:'0px 0px -40px 0px'});
  $$('.reveal:not(.in), .reveal-scale:not(.in)',root).forEach(el=>io.observe(el));
}
function countUp(el){ if(el._done) return; el._done=1; const to=+el.dataset.to, t0=performance.now(), d=1600; const st=n=>{const p=Math.min(1,(n-t0)/d), e=1-Math.pow(1-p,4); el.textContent=Math.round(to*e).toLocaleString(isAr()?'ar-EG':'en-US'); if(p<1) requestAnimationFrame(st);}; requestAnimationFrame(st); }

/* router */
const VIEWS = ['home','placement','packages','library','student','teacher','admin'];
function route(){
  const h = location.hash.replace('#','') || 'home', v = VIEWS.includes(h)? h : 'home';
  $$('.view').forEach(x=>x.classList.toggle('active', x.id==='view-'+v));
  $$('.nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+v));
  document.body.classList.remove('menu-open');
  $('.footer').style.display = ['student','teacher','admin'].includes(v) ? 'none' : '';
  window.scrollTo({top:0, behavior:'instant'});
  if(v==='home') requestAnimationFrame(()=>window._placePill && window._placePill());
  requestAnimationFrame(()=>observe($('#view-'+v)));
}
window.addEventListener('hashchange', route);

/* header */
const onScroll = () => $('#header').classList.toggle('scrolled', scrollY > 10);
window.addEventListener('scroll', onScroll, {passive:true});
$('#menuBtn').onclick = () => document.body.classList.toggle('menu-open');

/* language */
function applyLang(){
  document.documentElement.lang = LANG; document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el=>{ if(el.dataset.en==null) el.dataset.en = el.innerHTML; const k=el.dataset.i18n; el.innerHTML = isAr() && AR[k] ? AR[k] : el.dataset.en; });
  $('#langToggle .lbl').textContent = isAr() ? 'English' : 'العربية';
  $('#libSearch').placeholder = T('Search lessons…','ابحث في الدروس…');
  $('#promoIn').placeholder = T('Promo code (try BLOOM10)','رمز الخصم (جرّب BLOOM10)');
  renderLadder(); renderLevel(); renderFaq(); renderShow(); renderDays(); renderSlots(); calcPkg(); renderLib(); renderAtt(); renderAdmin();
  timetable($('#stuTT'),'student'); timetable($('#teaTT'),'teacher');
  if($('#testPanel').querySelector('.opt')) renderQ(); else if(!$('#testPanel').querySelector('.result')) testIntro();
  $$('.count').forEach(c=>{ if(c._done) c.textContent=(+c.dataset.to).toLocaleString(isAr()?'ar-EG':'en-US'); });
  requestAnimationFrame(()=>window._placePill && window._placePill());
}
$('#langToggle').onclick = () => { LANG = isAr() ? 'en' : 'ar'; try{localStorage.setItem('lb-lang',LANG);}catch(e){} applyLang(); };

/* showcase tabs */
$$('#showTabs button').forEach(b=>b.onclick=()=>{ $$('#showTabs button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); showIdx=+b.dataset.tab; renderShow(); });

/* init */
renderLadder(); renderLevel(); renderFaq(); renderShow(); initTesti(); initToggle(); testIntro(); initBuilder(); initLib();
renderAtt(); renderAdmin(); timetable($('#stuTT'),'student'); timetable($('#teaTT'),'teacher');
fixImgs(); bindToasts(); onScroll(); route();
try{ if(localStorage.getItem('lb-lang')==='ar'){ LANG='ar'; applyLang(); } }catch(e){}
