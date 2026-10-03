// ==========================================================================
// EDUCARE GROUP TUITION - STANDALONE JAVASCRIPT ENGINE (NO FIREBASE)
// 12 Modules, Separate Girls & Boys Batches, 3 Batch Passwords, Realtime LocalStorage
// ==========================================================================


let activeRole = 'Girls'; // 'Girls' | 'Boys' | 'Teacher'
let currentLanguage = 'en';
let teacherSelectedBatch = 'Girls';


const STORAGE_KEY = 'EDUCARE_TUITION_DATABASE_V1';
const PASSWORDS_KEY = 'EDUCARE_BATCH_PASSWORDS_V1';


// In-Memory Storage Fallback (Fixes Android Chrome content:// sandbox blocks)
const _memStore = {};
function safeGet(k) {
    try { return localStorage.getItem(k); } catch(e) { return _memStore[k] || null; }
}
function safeSet(k, v) {
    try { localStorage.setItem(k, v); } catch(e) { _memStore[k] = v; }
}
function safeRemove(k) {
    try { localStorage.removeItem(k); } catch(e) { delete _memStore[k]; }
}


function getBatchPasswords() {
    const saved = safeGet(PASSWORDS_KEY);
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return {
        Girls: 'girls123',
        Boys: 'boys123',
        Teacher: '1234'
    };
}


let db = {
    students: [
        { id: 's_1', name: 'Diya Patel', batch: 'Girls', std: '10th', sub: 'Maths, Science', time: '4:00 PM', phone: '9876543210' },
        { id: 's_2', name: 'Pooja Shah', batch: 'Girls', std: '10th', sub: 'Maths, Science', time: '4:00 PM', phone: '9876543211' },
        { id: 's_3', name: 'Nisha Dave', batch: 'Girls', std: '12th-Commerce', sub: 'Accountancy, Stats', time: '4:00 PM', phone: '9876543212' },
        { id: 's_4', name: 'Rahul Sharma', batch: 'Boys', std: '10th', sub: 'Maths, Science', time: '5:30 PM', phone: '9876543213' },
        { id: 's_5', name: 'Aman Vaghela', batch: 'Boys', std: '10th', sub: 'Maths, Science', time: '5:30 PM', phone: '9876543214' },
        { id: 's_6', name: 'Kunal Joshi', batch: 'Boys', std: '12th-Commerce', sub: 'Accountancy, Stats', time: '5:30 PM', phone: '9876543215' }
    ],
    homework: [
        { id: 'h_1', sub: 'Mathematics (10th Std)', date: '05/10/2026', desc: 'Complete Ch 5 Quadratic Equations Exercise 5.2 - Questions 1 to 8 in practice book.' },
        { id: 'h_2', sub: 'Science & Physics', date: '06/10/2026', desc: 'Draw and label Human Eye diagram and revise Refraction laws for tomorrow oral test.' }
    ],
    notices: [
        { id: 'n_1', title: 'Welcome to Educare Group Tuition Session 2026-27', date: '01/10/2026', body: 'New academic batches have commenced! Daily homework submissions and weekly Sunday test series are compulsory for all students.' },
        { id: 'n_2', title: 'Sunday Board Mock Test Schedule', date: '08/10/2026', body: 'Sunday mock test will be conducted for 10th and 12th standards from 09:00 AM to 12:00 PM.' }
    ],
    tests: [
        { id: 't_1', studentId: 's_1', name: 'Diya Patel', batch: 'Girls', std: '10th', title: 'Maths Unit Test 1', marks: 46, total: 50 },
        { id: 't_2', studentId: 's_2', name: 'Pooja Shah', batch: 'Girls', std: '10th', title: 'Maths Unit Test 1', marks: 44, total: 50 },
        { id: 't_3', studentId: 's_4', name: 'Rahul Sharma', batch: 'Boys', std: '10th', title: 'Maths Unit Test 1', marks: 48, total: 50 }
    ],
    attendance: {},
    assignments: [
        { id: 'a_1', title: '10th Board Science Important Questions & Formulae', link: 'https://drive.google.com', desc: 'Comprehensive formula handbook covering Physics and Chemistry numericals.' }
    ],
    holidays: [
        { id: 'hld_1', name: 'Diwali & Vikram Samvat New Year Break', date: '01/11/2026' },
        { id: 'hld_2', name: 'Uttarayan Festival Holiday', date: '14/01/2027' }
    ],
    fees: {},
    gallery: [
        { id: 'g_1', title: 'Smart Classroom Lecture', type: 'photo', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80' },
        { id: 'g_2', title: 'Board Exam Preparation Lab', type: 'photo', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80' },
        { id: 'g_3', title: 'Annual Topper Awards Felicitation', type: 'photo', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80' }
    ],
    doubts: [
        { id: 'd_1', name: 'Diya Patel', batch: 'Girls', sub: 'Mathematics', msg: 'Sir, please explain step 3 in Theorem 6.1 (BPT) again during tomorrow batch.' }
    ],
    website_content: {
        schoolName: "Educare Group Tuition",
        schoolSubtag: "Ahmedabad, Gujarat • Dedicated Coaching For Standards 8th to 12th",
        topRibbon: "🎓 <strong>Admissions Open Session 2026-27</strong> • Standards 8 to 12 (Science & Commerce) • Separate Girls & Boys Batches",
        heroBadge: "Disciplined Learning & High Score Focus",
        heroTitle: "Building Foundations, Achieving Academic Heights",
        heroDesc: "Educare Group Tuition offers result-oriented coaching with separate, distraction-free batches for Girls and Boys, weekly test analysis, dedicated doubt solving, and personalized student mentoring.",
        phone: "9173830909",
        email: "educaregrouptuition@gmail.com",
        hours: "Monday to Saturday: 03:00 PM to 08:30 PM (Sunday Test Series)",
        campusTitle: "Educare Smart Classroom",
        campusTag: "Air-conditioned • CCTV Protected • Small Batch Sizes",
        address: "Educare Group Tuition, Maninagar / Khokhra Area, Ahmedabad, Gujarat - 380008",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117502.85309623838!2d72.50808000490538!3d23.02396347306282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f221441595%3A0x67d87bc47970d624!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
        campusPhoto: null,
        bgWallpaper: null,
        bgOpacity: 18
    }
};


const initialFaculty = [
    { code: "TCH101", name: "Mr. Balendu V. Yagnik", qual: "M.Sc, B.Ed", exp: "18 Years", subject: "Mathematics & Physics", classteacher: "Head Tutor (Science)", phone: "9173830909" },
    { code: "TCH102", name: "Mrs. Priyanka Joshi", qual: "M.Com, B.Ed", exp: "12 Years", subject: "Accountancy & Statistics", classteacher: "Commerce Mentor", phone: "9173830909" },
    { code: "TCH103", name: "Mr. Rajesh Dave", qual: "M.A, B.Ed", exp: "15 Years", subject: "English & Social Studies", classteacher: "Senior Language Faculty", phone: "9173830909" }
];


function loadDatabase() {
    const raw = safeGet(STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            db = { ...db, ...parsed };
        } catch (e) {
            console.error("Storage error:", e);
        }
    }
    saveDatabase();
}


function saveDatabase() {
    safeSet(STORAGE_KEY, JSON.stringify(db));
}


// 3-Language Dictionary for Educare
const translations = {
    en: {
        topRibbon: "🎓 <strong>Admissions Open Session 2026-27</strong> • Standards 8 to 12 (Science & Commerce) • Separate Girls & Boys Batches",
        brandTitle: "Educare Group Tuition",
        brandSubtitle: "Ahmedabad, Gujarat • Dedicated Coaching For Standards 8th to 12th",
        navAbout: "About Tuition",
        navBatches: "Batches",
        navFaculty: "Tutors",
        navGallery: "Classroom Gallery",
        navContact: "Contact",
        navLogin: "Batch Portal Login 🔐",
        heroPill: "Disciplined Learning & High Score Focus",
        heroHeading: "Building Foundations, Achieving Academic Heights",
        heroDescription: "Educare Group Tuition offers result-oriented coaching with separate, distraction-free batches for Girls and Boys, weekly test analysis, dedicated doubt solving, and personalized student mentoring.",
        btnAdmissionInquiry: "Inquire For Admission",
        btnStaffLogin: "Student & Teacher Portal",
        statBoard: "Result Commitment",
        statExp: "Dedicated Batches (Girls & Boys)",
        statAttention: "Standards Focused",
        artCardTitle: "Educare Smart Classroom",
        artCardSubtitle: "Air-conditioned • CCTV Protected • Small Batch Sizes",
        secPillBatches: "Specialized Divisions",
        secHeadingBatches: "Separate Girls & Boys Batches",
        secSubBatches: "Focused learning environments designed for maximum concentration and individual performance",
        secPillFaculty: "Dedicated Mentors",
        secHeadingFaculty: "Experienced Coaching Faculty",
        secSubFaculty: "Subject specialists dedicated to building fundamental clarity and board exam readiness",
        secPillGallery: "Classroom Moments",
        secHeadingGallery: "Tuition Photo & Video Gallery",
        secSubGallery: "Lectures, test sessions, student celebrations, and academic achievements",
        secPillContact: "Visit Us",
        secHeadingContact: "Tuition Center Location & Contact",
        secSubContact: "Visit our classroom or call for batch timings and enrollment details",
        lblAddress: "Center Address",
        valAddress: "Educare Group Tuition, Maninagar / Khokhra Area, Ahmedabad, Gujarat - 380008",
        lblPhone: "Admission Helpline Phone",
        lblEmail: "Email Inquiries",
        lblHours: "Tuition Timings",
        valHours: "Monday to Saturday: 03:00 PM to 08:30 PM (Sunday Test Series)",
        footerCopy: "© 2026 Educare Group Tuition. All Rights Reserved.",
        footerPortal: "Batch Portal Login ➔",
        loginSubtitle: "Dedicated Batch Access Portal",
        selectLanguage: "Portal Language",
        loginBtn: "Unlock Batch Portal 🚀",
        menuHome: "Dashboard Home",
        menuStudents: "Profile / Batch Directory",
        menuHomework: "Home Work",
        menuNotices: "Notice Board",
        menuTestResults: "Test Results",
        menuMarkSheet: "Progress Marksheet",
        menuAttendance: "Attendance Register",
        menuAssignment: "Assignment & Notes",
        menuHolidays: "Holiday Calendar",
        menuFees: "Fee Status",
        menuGalleryMgmt: "Tuition Gallery",
        menuSuggestions: "Ask Doubts / Feedback",
        menuWebEditor: "Website & Details Editor",
        menuSettings: "Batch Passwords & Settings",
        logoutBtn: "Log Out",
        btnBackToSite: "Public Website",
        heroWelcomeTag: "OFFICIAL EDUCARE PORTAL",
        tuitionModulesHeading: "Tuition Classroom Modules",
        tuitionModulesSub: "Quick access to all 12 smart tuition management modules",
        chartHeading: "Attendance Analytics (Standard-wise Bar Graph)",
        chartSub: "Real-time attendance ratio across standards in current batch",
        homeRecentNotices: "Latest Tuition Notices",
        homeUpcomingHolidays: "Upcoming Academic Holidays",
        attTitle: "Daily Digital Attendance Register",
        noticeTitle: "Tuition Notice Board",
        hldTitle: "Annual & Festival Holiday Schedule"
    },
    gu: {
        topRibbon: "🎓 <strong>પ્રવેશ શરૂ સત્ર ૨૦૨૬-૨૭</strong> • ધોરણ ૮ થી ૧૨ (સાયન્સ & કોમર્સ) • ગર્લ્સ અને બોય્ઝ અલગ બેચ",
        brandTitle: "એજ્યુકેર ગ્રૂપ ટ્યુશન",
        brandSubtitle: "અમદાવાદ, ગુજરાત • ધોરણ ૮ થી ૧૨ નું ઉત્કૃષ્ટ કોચિંગ",
        navAbout: "ટ્યુશન પરિચય",
        navBatches: "બેચ વિગતો",
        navFaculty: "શિક્ષક ગણ",
        navGallery: "ક્લાસરૂમ ગેલેરી",
        navContact: "સંપર્ક",
        navLogin: "બેચ પોર્ટલ લૉગિન 🔐",
        heroPill: "શિસ્તબદ્ધ શિક્ષણ અને શ્રેષ્ઠ પરિણામ",
        heroHeading: "મજબૂત પાયો અને બોર્ડ પરીક્ષામાં સર્વોચ્ચ સિદ્ધિ",
        heroDescription: "એજ્યુકેર ગ્રૂપ ટ્યુશનમાં ગર્લ્સ અને બોય્ઝ માટે સંપૂર્ણ અલગ વાતાવરણ, સાપ્તાહિક ટેસ્ટ સીરીઝ, વ્યક્તિગત માર્ગદર્શન અને અનુભવી વિષય નિષ્ણાત શિક્ષકો દ્વારા શિક્ષણ આપવામાં આવે છે.",
        btnAdmissionInquiry: "પ્રવેશ માહિતી મેળવો",
        btnStaffLogin: "વિદ્યાર્થી & શિક્ષક પોર્ટલ",
        statBoard: "પરિણામ પ્રતિબદ્ધતા",
        statExp: "અલગ બેચ (ગર્લ્સ & બોય્ઝ)",
        statAttention: "ધોરણ ૮ થી ૧૨ કેન્દ્રિત",
        artCardTitle: "એજ્યુકેર સ્માર્ટ ક્લાસરૂમ",
        artCardSubtitle: "એર-કન્ડિશન્ડ • સીસીટીવી સુરક્ષિત • મર્યાદિત સંખ્યા",
        secPillBatches: "વિશિષ્ટ બેચ વ્યવસ્થા",
        secHeadingBatches: "ગર્લ્સ અને બોય્ઝ માટે સંપૂર્ણ અલગ બેચ",
        secSubBatches: "ધ્યાન કેન્દ્રિત રહે તેવું સુરક્ષિત અને સ્પર્ધાત્મક વાતાવરણ",
        secPillFaculty: "અનુભવી માર્ગદર્શક",
        secHeadingFaculty: "અમારા વિદ્વાન ફેકલ્ટી",
        secSubFaculty: "વિષયવાર પાયાની સ્પષ્ટતા અને બોર્ડ પરીક્ષાની સર્વોત્તમ તૈયારી",
        secPillGallery: "ક્લાસરૂમ ક્ષણો",
        secHeadingGallery: "ટ્યુશન ફોટો & વિડીયો ગેલેરી",
        secSubGallery: "લેક્ચર્સ, ટેસ્ટ સત્રો અને વિદ્યાર્થીઓનું સન્માન",
        secPillContact: "મુલાકાત લો",
        secHeadingContact: "ટ્યુશન સેન્ટર સરનામું અને સંપર્ક",
        secSubContact: "બેચ સમય અને પ્રવેશ માટે સીધો સંપર્ક કરો",
        lblAddress: "સેન્ટર સરનામું",
        valAddress: "એજ્યુકેર ગ્રૂપ ટ્યુશન, મણિનગર / ખોખરા વિસ્તાર, અમદાવાદ, ગુજરાત - 380008",
        lblPhone: "પ્રવેશ હેલ્પલાઈન ફોન",
        lblEmail: "ઈમેઈલ સંપર્ક",
        lblHours: "ટ્યુશન સમય",
        valHours: "સોમવાર થી શનિવાર: બપોરે ૦૩:૦૦ થી રાત્રે ૦૮:૩૦ (રવિવારે ટેસ્ટ સીરીઝ)",
        footerCopy: "© 2026 એજ્યુકેર ગ્રૂપ ટ્યુશન. સર્વાધિકાર સુરક્ષિત.",
        footerPortal: "બેચ પોર્ટલ લૉગિન ➔",
        loginSubtitle: "બેચ આધારિત સુરક્ષિત પોર્ટલ",
        selectLanguage: "પોર્ટલ ભાષા",
        loginBtn: "બેચ પોર્ટલ ખોલો 🚀",
        menuHome: "ડેશબોર્ડ મુખ્ય પૃષ્ઠ",
        menuStudents: "પ્રોફાઇલ / બેચ રજિસ્ટ્રી",
        menuHomework: "હોમવર્ક (Home Work)",
        menuNotices: "સૂચના બોર્ડ (NoticeBoard)",
        menuTestResults: "ટેસ્ટ પરિણામ (TestResult)",
        menuMarkSheet: "પ્રગતિ પત્રક (MarkSheet)",
        menuAttendance: "દૈનિક હાજરી પત્રક (Attendance)",
        menuAssignment: "એસાઇનમેન્ટ & નોટ્સ",
        menuHolidays: "રજાઓનું કેલેન્ડર (Holiday)",
        menuFees: "ફી સ્ટેટસ (Fee Status)",
        menuGalleryMgmt: "ટ્યુશન ગેલેરી (Gallery)",
        menuSuggestions: "પ્રશ્નો પૂછો / ફિડબેક",
        menuWebEditor: "વેબસાઇટ & વિગતો એડિટર",
        menuSettings: "બેચ પાસવર્ડ & સેટિંગ્સ",
        logoutBtn: "લૉગ આઉટ",
        btnBackToSite: "વેબસાઇટ જુઓ",
        heroWelcomeTag: "સત્તાવાર એજ્યુકેર પોર્ટલ",
        tuitionModulesHeading: "ટ્યુશન ક્લાસરૂમ ૧૨ મોડ્યુલ્સ",
        tuitionModulesSub: "બધા જ ૧૨ સ્માર્ટ મોડ્યુલ્સની ઝડપી ઍક્સેસ",
        chartHeading: "સ્તંભાલેખ - ધોરણવાર હાજરી ગ્રાફ",
        chartSub: "ચાલુ બેચના ધોરણોની લાઈવ હાજરી ટકાવારી",
        homeRecentNotices: "તાજેતરની ટ્યુશન સૂચનાઓ",
        homeUpcomingHolidays: "આગામી શૈક્ષણિક રજાઓ",
        attTitle: "દૈનિક ડિજિટલ હાજરી રજિસ્ટર",
        noticeTitle: "ટ્યુશન નોટિસ બોર્ડ",
        hldTitle: "વાર્ષિક અને તહેવાર રજાઓની યાદી"
    },
    hi: {
        topRibbon: "🎓 <strong>प्रवेश प्रारंभ सत्र २०२६-२७</strong> • कक्षा ८ से १२ (विज्ञान एवं वाणिज्य) • अलग गर्ल्स एवं बॉयज बैच",
        brandTitle: "एजुकेयर ग्रुप ट्यूशन",
        brandSubtitle: "अहमदाबाद, गुजरात • कक्षा ८ से १२ हेतु समर्पित कोचिंग",
        navAbout: "ट्यूशन परिचय",
        navBatches: "बैच विवरण",
        navFaculty: "शिक्षक गण",
        navGallery: "कक्षा गैलरी",
        navContact: "संपर्क",
        navLogin: "बैच पोर्टल लॉगिन 🔐",
        heroPill: "अनुशासन एवं उच्च प्राप्तांक लक्ष्य",
        heroHeading: "मजबूत आधार एवं बोर्ड परीक्षाओं में उत्कृष्ट परिणाम",
        heroDescription: "एजुकेयर ग्रुप ट्यूशन में गर्ल्स एवं बॉयज हेतु पृथक वातावरण, साप्ताहिक टेस्ट श्रृंखला, व्यक्तिगत मार्गदर्शन एवं विषय विशेषज्ञों द्वारा कोचिंग दी जाती है।",
        btnAdmissionInquiry: "प्रवेश पूछताछ",
        btnStaffLogin: "छात्र एवं शिक्षक पोर्टल",
        statBoard: "परिणाम प्रतिबद्धता",
        statExp: "समर्पित बैच (गर्ल्स एवं बॉयज)",
        statAttention: "कक्षा ८ से १२ केंद्रित",
        artCardTitle: "एजुकेयर स्मार्ट क्लासरूम",
        artCardSubtitle: "वातानुकूलित • सीसीटीवी सुरक्षित • सीमित छात्र संख्या",
        secPillBatches: "विशेष बैच प्रभाग",
        secHeadingBatches: "गर्ल्स एवं बॉयज हेतु पृथक बैच",
        secSubBatches: "एकाग्रता एवं अधिकतम प्रदर्शन हेतु शांत और अनुशासित वातावरण",
        secPillFaculty: "समर्पित शिक्षक",
        secHeadingFaculty: "अनुभवी कोचिंग फैकल्टी",
        secSubFaculty: "विषय अवधारणाओं की स्पष्टता एवं बोर्ड परीक्षा तैयारी",
        secPillGallery: "कक्षा की झलकियां",
        secHeadingGallery: "ट्यूशन फोटो एवं वीडियो गैलरी",
        secSubGallery: "कक्षा शिक्षण, टेस्ट सत्र और मेधावी छात्र सम्मान",
        secPillContact: "संपर्क",
        secHeadingContact: "कोचिंग सेंटर का पता एवं संपर्क",
        secSubContact: "बैच समय एवं प्रवेश जानकारी हेतु संपर्क करें",
        lblAddress: "सेंटर का पता",
        valAddress: "एजुकेयर ग्रुप ट्यूशन, मणिनगर / खोखरा क्षेत्र, अहमदाबाद, गुजरात - 380008",
        lblPhone: "प्रवेश हेल्पलाइन फ़ोन",
        lblEmail: "आधिकारिक ईमेल",
        lblHours: "ट्यूशन समय",
        valHours: "सोमवार से शनिवार: दोपहर ०३:०० से रात्रि ०८:३० (रविवार टेस्ट श्रृंखला)",
        footerCopy: "© 2026 एजुकेयर ग्रुप ट्यूशन. सर्वाधिकार सुरक्षित.",
        footerPortal: "बैच पोर्टल लॉगिन ➔",
        loginSubtitle: "बैच आधारित सुरक्षित पोर्टल",
        selectLanguage: "पोर्टल भाषा",
        loginBtn: "बैच पोर्टल खोलें 🚀",
        menuHome: "डैशबोर्ड मुख्य पृष्ठ",
        menuStudents: "प्रोफाइल / बैच निर्देशिका",
        menuHomework: "गृहकार्य (Home Work)",
        menuNotices: "सूचना पट्ट (NoticeBoard)",
        menuTestResults: "परीक्षा परिणाम (TestResult)",
        menuMarkSheet: "प्रगति पत्रक (MarkSheet)",
        menuAttendance: "दैनिक उपस्थिति रजिस्टर",
        menuAssignment: "असाइनमेंट एवं नोट्स",
        menuHolidays: "अवकाश कैलेंडर",
        menuFees: "फीस स्थिति (Fee Status)",
        menuGalleryMgmt: "ट्यूशन गैलरी",
        menuSuggestions: "शंका समाधान / फीडबैक",
        menuWebEditor: "वेबसाइट एवं विवरण संपादक",
        menuSettings: "बैच पासवर्ड एवं सेटिंग्स",
        logoutBtn: "लॉग आउट",
        btnBackToSite: "वेबसाइट देखें",
        heroWelcomeTag: "आधिकारिक एजुकेयर पोर्टल",
        tuitionModulesHeading: "ट्यूशन क्लासरूम १२ मॉडयूल्स",
        tuitionModulesSub: "सभी १२ स्मार्ट प्रबंधन मॉडयूल्स का त्वरित उपयोग",
        chartHeading: "स्तंभालेख - कक्षावार उपस्थिति ग्राफ",
        chartSub: "वर्तमान बैच के छात्रों का लाइव उपस्थिति अनुपात",
        homeRecentNotices: "नवीनतम ट्यूशन सूचनाएं",
        homeUpcomingHolidays: "आगामी शैक्षणिक अवकाश",
        attTitle: "दैनिक डिजिटल उपस्थिति रजिस्टर",
        noticeTitle: "ट्यूशन सूचना पट्ट",
        hldTitle: "वार्षिक एवं उत्सव अवकाश सूची"
    }
};


window.switchLanguage = function(lang) {
    currentLanguage = lang;
    document.body.className = `lang-${lang}`;


    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(lang));
    });


    document.querySelectorAll('.lang-tab').forEach((btn, idx) => {
        const langs = ['en', 'gu', 'hi'];
        btn.classList.toggle('active', langs[idx] === lang);
    });


    const tagEl = document.getElementById('current-lang-tag');
    if (tagEl) tagEl.innerText = lang.toUpperCase();


    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });


    renderPublicFaculty();
};


window.cycleLanguage = function() {
    const seq = ['en', 'gu', 'hi'];
    const next = seq[(seq.indexOf(currentLanguage) + 1) % seq.length];
    window.switchLanguage(next);
};


window.applyDateMask = function(input) {
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
        input.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
        input.value = `${v.slice(0, 2)}/${v.slice(2)}`;
    } else {
        input.value = v;
    }
};


function formatToDDMMYYYY(d) {
    if (!d) return '-';
    if (d.includes('/')) return d;
    const p = d.split('-');
    return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : d;
}


// Modals
window.openLoginModal = () => document.getElementById('login-modal').style.display = 'flex';
window.closeLoginModal = () => document.getElementById('login-modal').style.display = 'none';


window.closeEditModal = () => document.getElementById('edit-student-modal').style.display = 'none';
window.openAddTestModal = () => {
    populateTestStudentSelector();
    document.getElementById('add-test-modal').style.display = 'flex';
};
window.closeAddTestModal = () => document.getElementById('add-test-modal').style.display = 'none';


window.openManagePasswordsModal = () => {
    const p = getBatchPasswords();
    document.getElementById('quick-girls-pass').value = p.Girls;
    document.getElementById('quick-boys-pass').value = p.Boys;
    document.getElementById('quick-teacher-pass').value = p.Teacher;
    document.getElementById('modal-manage-passwords').style.display = 'flex';
};
window.closeManagePasswordsModal = () => document.getElementById('modal-manage-passwords').style.display = 'none';


window.handleModalBackdropClick = function(event, modalId) {
    if (event.target.id === modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
};


window.returnToPublicSite = function() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('public-landing-page').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


// ==========================================================================
// BATCH LOGIN (GIRLS, BOYS, TEACHER)
// ==========================================================================
let selectedLoginRole = 'Girls';


window.selectBatchRole = function(role) {
    selectedLoginRole = role;
    document.getElementById('role-girls').classList.toggle('active', role === 'Girls');
    document.getElementById('role-boys').classList.toggle('active', role === 'Boys');
    document.getElementById('role-teacher').classList.toggle('active', role === 'Teacher');


    const lbl = document.getElementById('batch-password-label');
    if (role === 'Girls') lbl.innerText = 'Enter Girls Batch Password';
    else if (role === 'Boys') lbl.innerText = 'Enter Boys Batch Password';
    else lbl.innerText = 'Enter Teacher Master Password';
    document.getElementById('login-password').value = '';
};


window.batchLogin = function() {
    const p = document.getElementById('login-password').value.trim();
    if (!p) return alert('Please enter password.');


    const passwords = getBatchPasswords();


    if (selectedLoginRole === 'Girls') {
        if (p === passwords.Girls) {
            openPortal('Girls');
        } else {
            alert('Incorrect Girls Batch Password! (Default: girls123)');
        }
    } else if (selectedLoginRole === 'Boys') {
        if (p === passwords.Boys) {
            openPortal('Boys');
        } else {
            alert('Incorrect Boys Batch Password! (Default: boys123)');
        }
    } else if (selectedLoginRole === 'Teacher') {
        if (p === passwords.Teacher) {
            openPortal('Teacher');
        } else {
            alert('Incorrect Teacher Password! (Default: 1234)');
        }
    }
};


function openPortal(role) {
    activeRole = role;
    safeSet('EDUCARE_ACTIVE_ROLE', role);


    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('public-landing-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';


    const isTeacher = (role === 'Teacher');
    document.querySelectorAll('.staff-only-btn').forEach(e => e.style.display = isTeacher ? '' : 'none');
    document.querySelectorAll('.staff-only-card').forEach(e => e.style.display = isTeacher ? 'block' : 'none');


    const topName = document.getElementById('user-display-name');
    const topBadge = document.getElementById('user-badge');
    const sidebarTag = document.getElementById('sidebar-batch-tag');
    const roleBadge = document.getElementById('portal-role-badge');
    const welcomeTitle = document.getElementById('welcome-banner-school-title');
    const welcomeDesc = document.getElementById('welcome-banner-desc');
    const switcherBox = document.getElementById('teacher-batch-selector-box');


    if (isTeacher) {
        topName.innerText = 'Teacher Master';
        topBadge.innerText = 'Administrator';
        sidebarTag.innerText = 'Master Control';
        roleBadge.innerText = 'Teacher Clearance';
        welcomeTitle.innerText = 'Welcome Back, Teacher';
        welcomeDesc.innerText = 'Manage Girls & Boys batches, mark attendance, record test marks, and update batch passwords.';
        if (switcherBox) switcherBox.style.display = 'block';
    } else if (role === 'Girls') {
        topName.innerText = 'Girls Batch';
        topBadge.innerText = 'Student Portal';
        sidebarTag.innerText = 'Girls Batch Portal';
        roleBadge.innerText = 'Girls Batch Active';
        welcomeTitle.innerText = 'Welcome, Girls Batch';
        welcomeDesc.innerText = 'Access your batch schedules, homework, test marks, and doubt solving sessions.';
        if (switcherBox) switcherBox.style.display = 'none';
    } else if (role === 'Boys') {
        topName.innerText = 'Boys Batch';
        topBadge.innerText = 'Student Portal';
        sidebarTag.innerText = 'Boys Batch Portal';
        roleBadge.innerText = 'Boys Batch Active';
        welcomeTitle.innerText = 'Welcome, Boys Batch';
        welcomeDesc.innerText = 'Access your batch schedules, homework, test marks, and doubt solving sessions.';
        if (switcherBox) switcherBox.style.display = 'none';
    }


    refreshAllModules();
    navigateTo('view-home');
}


window.logout = function() {
    safeRemove('EDUCARE_ACTIVE_ROLE');
    window.returnToPublicSite();
};


window.navigateTo = function(id) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    const t = document.getElementById(id);
    if (t) t.classList.add('active');
};


function getActiveBatchTarget() {
    if (activeRole === 'Teacher') return teacherSelectedBatch;
    return activeRole; // Strictly 'Girls' or 'Boys'
}


window.setTeacherBatchView = function(b) {
    teacherSelectedBatch = b;
    document.getElementById('tbl-batch-girls').classList.toggle('active', b === 'Girls');
    document.getElementById('tbl-batch-boys').classList.toggle('active', b === 'Boys');
    loadStudents();
    loadMarksheet();
    loadAttendanceRoster();
    loadFeeRoster();
    renderAttendanceChart();
};


function refreshAllModules() {
    loadStudents();
    loadHomework();
    loadNotices();
    loadTests();
    loadMarksheet();
    loadAttendanceRoster();
    loadAssignments();
    loadHolidays();
    loadFeeRoster();
    renderPortalGallery();
    loadDoubts();
    renderAttendanceChart();
    applyWebsiteContent(db.website_content);
    renderPublicFaculty();
    renderPublicGallery();
}


// ==========================================================================
// 1. STUDENTS / BATCH DIRECTORY
// ==========================================================================
function loadStudents() {
    const tb = document.getElementById('student-table-body');
    if (!tb) return;
    tb.innerHTML = '';


    const batch = getActiveBatchTarget();
    const isTeacher = (activeRole === 'Teacher');


    const list = db.students.filter(s => isTeacher ? (s.batch === batch) : (s.batch === activeRole));
    
    document.getElementById('stat-total-students').innerText = list.length;
    document.getElementById('batch-dir-title').innerText = `${batch} Batch Student Directory`;
    document.getElementById('batch-dir-sub').innerText = `Enrolled students list for ${batch} Batch`;


    if (list.length === 0) {
        tb.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:28px; color:#64748b;">No students enrolled in ${batch} Batch yet.</td></tr>`;
        return;
    }


    list.forEach((s, idx) => {
        tb.innerHTML += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${s.name}</strong></td>
            <td><span class="badge-role" style="${s.batch === 'Girls' ? 'color:#db2777; background:#fdf2f8;' : 'color:#2563eb; background:#eff6ff;'}">${s.batch}</span></td>
            <td>${s.std}</td>
            <td>${s.sub}</td>
            <td>${s.time}</td>
            <td>${s.phone || '-'}</td>
            <td class="staff-only-btn" style="${isTeacher ? '' : 'display:none;'}">
                <button class="btn-3d btn-secondary btn-sm" onclick="window.openEditStudentModal('${s.id}')">Edit</button>
                <button class="btn-3d btn-danger btn-sm" onclick="window.delStudent('${s.id}')">Delete</button>
            </td>
        </tr>`;
    });
}


window.addStudentRecord = function() {
    const batch = document.getElementById('new_st_batch').value;
    const name = document.getElementById('new_st_name').value.trim();
    const std = document.getElementById('new_st_std').value;
    const sub = document.getElementById('new_st_sub').value.trim();
    const time = document.getElementById('new_st_time').value.trim();
    const phone = document.getElementById('new_st_phone').value.trim();


    if (!name) return alert('Student Name is required.');


    db.students.push({
        id: 's_' + Date.now(),
        batch, name, std, sub, time, phone
    });


    saveDatabase();
    loadStudents();
    renderAttendanceChart();
    document.getElementById('new_st_name').value = '';
    alert(`Student "${name}" enrolled in ${batch} Batch!`);
};


window.openEditStudentModal = function(id) {
    const s = db.students.find(x => x.id === id);
    if (!s) return;
    document.getElementById('edit-student-idx').value = id;
    document.getElementById('edit-st-name').value = s.name;
    document.getElementById('edit-st-batch').value = s.batch;
    document.getElementById('edit-st-standard').value = s.std;
    document.getElementById('edit-st-sub').value = s.sub;
    document.getElementById('edit-st-time').value = s.time;
    document.getElementById('edit-st-phone').value = s.phone || '';
    document.getElementById('edit-student-modal').style.display = 'flex';
};


window.saveEditedStudentRecord = function() {
    const id = document.getElementById('edit-student-idx').value;
    const s = db.students.find(x => x.id === id);
    if (s) {
        s.name = document.getElementById('edit-st-name').value.trim();
        s.batch = document.getElementById('edit-st-batch').value;
        s.std = document.getElementById('edit-st-standard').value;
        s.sub = document.getElementById('edit-st-sub').value.trim();
        s.time = document.getElementById('edit-st-time').value.trim();
        s.phone = document.getElementById('edit-st-phone').value.trim();
        saveDatabase();
        loadStudents();
        renderAttendanceChart();
    }
    window.closeEditModal();
    alert('Student record updated!');
};


window.delStudent = function(id) {
    if (confirm('Delete this student record?')) {
        db.students = db.students.filter(x => x.id !== id);
        saveDatabase();
        loadStudents();
        renderAttendanceChart();
    }
};


// ==========================================================================
// 2. HOMEWORK
// ==========================================================================
window.toggleHwForm = () => document.getElementById('hw-publish-form').classList.toggle('hidden-panel');


window.publishHomework = function() {
    const sub = document.getElementById('hw_sub').value.trim();
    const date = document.getElementById('hw_date').value.trim();
    const desc = document.getElementById('hw_desc').value.trim();
    if (!sub || !date) return alert('Subject and Due Date are mandatory.');


    db.homework.unshift({
        id: 'h_' + Date.now(),
        sub, date: formatToDDMMYYYY(date), desc
    });
    saveDatabase();
    loadHomework();
    window.toggleHwForm();
};


function loadHomework() {
    const el = document.getElementById('homework-feed');
    if (!el) return;
    el.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.homework.forEach(h => {
        el.innerHTML += `
            <div class="notice-item-3d card-3d" style="border-left: 4px solid #d97706;">
                <div class="flex-between">
                    <h4>${h.sub}</h4>
                    <span class="badge-role" style="background:#fef3c7; color:#b45309;">Due: ${h.date}</span>
                </div>
                <p style="margin-top:8px; line-height:1.6; color:#334155;">${h.desc}</p>
                <div style="${isTeacher ? '' : 'display:none;'}; margin-top:12px;">
                    <button class="btn-3d btn-danger btn-sm" onclick="window.delHw('${h.id}')">Delete Task</button>
                </div>
            </div>
        `;
    });
}


window.delHw = function(id) {
    if (confirm('Delete homework task?')) {
        db.homework = db.homework.filter(x => x.id !== id);
        saveDatabase();
        loadHomework();
    }
};


// ==========================================================================
// 3. NOTICE BOARD
// ==========================================================================
window.toggleNoticeForm = () => document.getElementById('notice-publish-form').classList.toggle('hidden-panel');


window.publishNotice = function() {
    const date = document.getElementById('notice-date').value.trim();
    const title = document.getElementById('notice-title').value.trim();
    const body = document.getElementById('notice-body').value.trim();
    if (!date || !title) return alert('Date and Title are required.');


    db.notices.unshift({ id: 'n_' + Date.now(), date: formatToDDMMYYYY(date), title, body });
    saveDatabase();
    loadNotices();
    window.toggleNoticeForm();
};


function loadNotices() {
    const el = document.getElementById('notices-feed');
    const hl = document.getElementById('home-notices-list');
    if (el) el.innerHTML = '';
    if (hl) hl.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.notices.forEach(n => {
        if (el) {
            el.innerHTML += `
                <div class="notice-item-3d card-3d">
                    <h4>${n.title}</h4>
                    <small style="color:#0284c7;">Date: ${formatToDDMMYYYY(n.date)}</small>
                    <p style="margin-top:6px; line-height:1.6; color:#334155;">${n.body || ''}</p>
                    <div style="${isTeacher ? '' : 'display:none;'}; margin-top:10px;">
                        <button class="btn-3d btn-danger btn-sm" onclick="window.delNotice('${n.id}')">Delete</button>
                    </div>
                </div>
            `;
        }
        if (hl) hl.innerHTML += `<li><strong>${n.title}</strong> (${formatToDDMMYYYY(n.date)})</li>`;
    });
}


window.delNotice = function(id) {
    if (confirm('Delete notice?')) {
        db.notices = db.notices.filter(x => x.id !== id);
        saveDatabase();
        loadNotices();
    }
};


// ==========================================================================
// 4. TEST RESULTS & RECORD SCORES
// ==========================================================================
function populateTestStudentSelector() {
    const sel = document.getElementById('modal_test_student');
    if (!sel) return;
    sel.innerHTML = '';
    const batch = getActiveBatchTarget();
    const list = db.students.filter(s => s.batch === batch);
    list.forEach(s => {
        sel.innerHTML += `<option value="${s.id}">${s.name} (${s.std} - ${s.batch} Batch)</option>`;
    });
}


window.saveTestRecord = function() {
    const sId = document.getElementById('modal_test_student').value;
    const s = db.students.find(x => x.id === sId);
    const title = document.getElementById('modal_test_title').value.trim();
    const marks = Number(document.getElementById('modal_test_marks').value);
    const total = Number(document.getElementById('modal_test_total').value) || 50;


    if (!title || isNaN(marks)) return alert('Test title and marks are required.');


    db.tests.unshift({
        id: 't_' + Date.now(),
        studentId: sId,
        name: s ? s.name : '',
        batch: s ? s.batch : 'Girls',
        std: s ? s.std : '10th',
        title, marks, total
    });


    saveDatabase();
    loadTests();
    loadMarksheet();
    window.closeAddTestModal();
    alert('Test score recorded successfully!');
};


function loadTests() {
    const tb = document.getElementById('test-table-body');
    if (!tb) return;
    tb.innerHTML = '';


    const batch = getActiveBatchTarget();
    const isTeacher = (activeRole === 'Teacher');


    const list = db.tests.filter(t => isTeacher ? (t.batch === batch) : (t.batch === activeRole));


    if (list.length === 0) {
        tb.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:28px; color:#64748b;">No test results recorded for ${batch} Batch.</td></tr>`;
        return;
    }


    list.forEach((t, idx) => {
        const pct = Math.round((t.marks / t.total) * 100);
        tb.innerHTML += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${t.name}</strong></td>
            <td>${t.std}</td>
            <td>${t.title}</td>
            <td><strong>${t.marks}</strong></td>
            <td>${t.total}</td>
            <td><span class="badge-role" style="${pct >= 40 ? 'color:#15803d; background:#dcfce7;' : 'color:#b91c1c; background:#fee2e2;'}">${pct}%</span></td>
            <td class="staff-only-btn" style="${isTeacher ? '' : 'display:none;'}">
                <button class="btn-3d btn-danger btn-sm" onclick="window.delTest('${t.id}')">Delete</button>
            </td>
        </tr>`;
    });
}


window.delTest = function(id) {
    if (confirm('Delete this test score?')) {
        db.tests = db.tests.filter(x => x.id !== id);
        saveDatabase();
        loadTests();
        loadMarksheet();
    }
};


// ==========================================================================
// 5. MARKSHEET MODULE
// ==========================================================================
function loadMarksheet() {
    const el = document.getElementById('marksheet-feed');
    if (!el) return;
    el.innerHTML = '';


    const batch = getActiveBatchTarget();
    const isTeacher = (activeRole === 'Teacher');


    const students = db.students.filter(s => isTeacher ? (s.batch === batch) : (s.batch === activeRole));


    if (students.length === 0) {
        el.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:24px;">No student records found.</p>`;
        return;
    }


    students.forEach(s => {
        const tests = db.tests.filter(t => t.studentId === s.id);
        const got = tests.reduce((a, b) => a + Number(b.marks), 0);
        const tot = tests.reduce((a, b) => a + Number(b.total), 0);
        const pct = tot > 0 ? Math.round((got / tot) * 100) : 0;


        el.innerHTML += `
            <div class="notice-item-3d card-3d">
                <div class="flex-between">
                    <h4>${s.name}</h4>
                    <span class="badge-role" style="background:#e0f2fe; color:#0369a1;">${s.std} • ${s.batch}</span>
                </div>
                <p style="margin-top:6px; font-size:12px; color:#64748b;">Tests Evaluated: <b>${tests.length}</b></p>
                <div class="flex-between" style="margin-top:14px; border-top:1.5px solid #f1f5f9; padding-top:12px;">
                    <span style="font-weight:700; color:#334155;">Cumulative Score:</span>
                    <strong style="font-size:16px; color:${pct >= 40 ? '#059669' : '#dc2626'};">${pct}% (${got}/${tot})</strong>
                </div>
            </div>
        `;
    });
}


// ==========================================================================
// 6. ATTENDANCE REGISTER & BAR CHART
// ==========================================================================
window.loadAttendanceRoster = function() {
    const std = document.getElementById('att-standard-filter').value;
    const dt = (document.getElementById('att-date').value || formatToDDMMYYYY(new Date().toISOString().split('T')[0])).replace(/\//g, '-');
    const tb = document.getElementById('attendance-table-body');
    if (!tb) return;
    tb.innerHTML = '';


    const batch = getActiveBatchTarget();
    const isTeacher = (activeRole === 'Teacher');


    const key = `${dt}_${batch}_${std}`;
    const roster = db.attendance[key] || {};


    const list = db.students.filter(s => (s.batch === batch && s.std === std));


    if (list.length === 0) {
        tb.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:#64748b;">No students enrolled in ${std} (${batch} Batch).</td></tr>`;
        return;
    }


    list.forEach((s, idx) => {
        const st = roster[s.id] || 'Present';
        tb.innerHTML += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${s.name}</strong></td>
            <td>${s.batch} Batch</td>
            <td><span class="badge-role" style="${st === 'Present' ? 'color:#15803d; background:#dcfce7;' : 'color:#b45309; background:#fef3c7;'}">${st}</span></td>
            <td class="staff-only-btn" style="${isTeacher ? '' : 'display:none;'}">
                <button class="btn-3d btn-sm ${st === 'Present' ? 'btn-primary' : 'btn-secondary'}" onclick="window.setPresence('${s.id}', 'Present')">P</button>
                <button class="btn-3d btn-sm ${st === 'Absent' ? 'btn-danger' : 'btn-secondary'}" onclick="window.setPresence('${s.id}', 'Absent')">A</button>
            </td>
        </tr>`;
    });
};


window.setPresence = function(id, st) {
    const std = document.getElementById('att-standard-filter').value;
    const dt = (document.getElementById('att-date').value || formatToDDMMYYYY(new Date().toISOString().split('T')[0])).replace(/\//g, '-');
    const batch = getActiveBatchTarget();
    const key = `${dt}_${batch}_${std}`;


    if (!db.attendance[key]) db.attendance[key] = {};
    db.attendance[key][id] = st;
    saveDatabase();
    window.loadAttendanceRoster();
    renderAttendanceChart();
};


window.markBulkAttendance = function(st) {
    const std = document.getElementById('att-standard-filter').value;
    const dt = (document.getElementById('att-date').value || formatToDDMMYYYY(new Date().toISOString().split('T')[0])).replace(/\//g, '-');
    const batch = getActiveBatchTarget();
    const key = `${dt}_${batch}_${std}`;


    if (!db.attendance[key]) db.attendance[key] = {};
    db.students.filter(s => (s.batch === batch && s.std === std)).forEach(s => db.attendance[key][s.id] = st);
    saveDatabase();
    window.loadAttendanceRoster();
    renderAttendanceChart();
};


function renderAttendanceChart() {
    const el = document.getElementById('attendance-bar-chart');
    if (!el) return;
    el.innerHTML = '';


    const batch = getActiveBatchTarget();
    const standards = ["8th", "9th", "10th", "11th-Commerce", "11th-Science", "12th-Commerce", "12th-Science"];
    const todayKey = formatToDDMMYYYY(new Date().toISOString().split('T')[0]).replace(/\//g, '-');


    standards.forEach(std => {
        const classStudents = db.students.filter(s => (s.batch === batch && s.std === std));
        let ratio = 100;


        if (classStudents.length > 0) {
            const roster = db.attendance[`${todayKey}_${batch}_${std}`] || {};
            let presentCount = 0;
            classStudents.forEach(s => {
                if (roster[s.id] !== 'Absent') presentCount++;
            });
            ratio = Math.round((presentCount / classStudents.length) * 100);
        }


        el.innerHTML += `
            <div class="chart-bar-group">
                <span style="font-size:10px; font-weight:800; color:#0284c7;">${ratio}%</span>
                <div class="chart-bar-track"><div class="chart-bar-fill" style="height:${ratio}%;"></div></div>
                <span style="font-size:10px; margin-top:3px;">${std}</span>
            </div>
        `;
    });
}


// ==========================================================================
// 7. ASSIGNMENT MODULE
// ==========================================================================
window.toggleAssignForm = () => document.getElementById('assign-publish-form').classList.toggle('hidden-panel');


window.publishAssignment = function() {
    const title = document.getElementById('asg_title').value.trim();
    const link = document.getElementById('asg_link').value.trim();
    const desc = document.getElementById('asg_desc').value.trim();
    if (!title) return alert('Assignment Title is required.');


    db.assignments.unshift({ id: 'a_' + Date.now(), title, link, desc });
    saveDatabase();
    loadAssignments();
    window.toggleAssignForm();
};


function loadAssignments() {
    const el = document.getElementById('assignment-feed');
    if (!el) return;
    el.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.assignments.forEach(a => {
        el.innerHTML += `
            <div class="notice-item-3d card-3d">
                <div class="flex-between">
                    <h4>${a.title}</h4>
                    ${a.link ? `<a href="${a.link}" target="_blank" class="btn-3d btn-secondary btn-sm">Open File / Link ➔</a>` : ''}
                </div>
                <p style="margin-top:8px; line-height:1.6; color:#334155;">${a.desc || ''}</p>
                <div style="${isTeacher ? '' : 'display:none;'}; margin-top:12px;">
                    <button class="btn-3d btn-danger btn-sm" onclick="window.delAssign('${a.id}')">Delete</button>
                </div>
            </div>
        `;
    });
}


window.delAssign = function(id) {
    if (confirm('Delete assignment?')) {
        db.assignments = db.assignments.filter(x => x.id !== id);
        saveDatabase();
        loadAssignments();
    }
};


// ==========================================================================
// 8. HOLIDAYS MODULE
// ==========================================================================
window.toggleHolidayForm = () => document.getElementById('holiday-add-form').classList.toggle('hidden-panel');


window.addHolidayRecord = function() {
    const date = document.getElementById('hld-date').value.trim();
    const name = document.getElementById('hld-name').value.trim();
    if (!date || !name) return alert('Date and Holiday Name are mandatory.');


    db.holidays.push({ id: 'hld_' + Date.now(), date: formatToDDMMYYYY(date), name });
    saveDatabase();
    loadHolidays();
    window.toggleHolidayForm();
};


function loadHolidays() {
    const el = document.getElementById('holiday-roster');
    const hl = document.getElementById('home-holidays-list');
    if (el) el.innerHTML = '';
    if (hl) hl.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.holidays.forEach(h => {
        if (el) {
            el.innerHTML += `
                <div class="holiday-card-3d card-3d">
                    <h4>${h.name}</h4>
                    <small style="color:#0284c7;">Date: ${formatToDDMMYYYY(h.date)}</small>
                    <div style="${isTeacher ? '' : 'display:none;'}; margin-top:10px;">
                        <button class="btn-3d btn-danger btn-sm" onclick="window.delHoliday('${h.id}')">Delete</button>
                    </div>
                </div>
            `;
        }
        if (hl) hl.innerHTML += `<li><strong>${h.name}</strong> (${formatToDDMMYYYY(h.date)})</li>`;
    });
}


window.delHoliday = function(id) {
    if (confirm('Delete holiday?')) {
        db.holidays = db.holidays.filter(x => x.id !== id);
        saveDatabase();
        loadHolidays();
    }
};


// ==========================================================================
// 9. FEE STATUS
// ==========================================================================
window.loadFeeRoster = function() {
    const m = document.getElementById('fee-month-selector').value;
    const tb = document.getElementById('fee-table-body');
    if (!tb) return;
    tb.innerHTML = '';


    const batch = getActiveBatchTarget();
    const isTeacher = (activeRole === 'Teacher');


    const list = db.students.filter(s => isTeacher ? (s.batch === batch) : (s.batch === activeRole));


    if (list.length === 0) {
        tb.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:#64748b;">No students found in ${batch} Batch.</td></tr>`;
        return;
    }


    list.forEach((s, idx) => {
        const k = `${s.id}_${m}`;
        const st = db.fees[k] || 'Pending';
        const isPaid = (st === 'Paid');


        tb.innerHTML += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${s.name}</strong></td>
            <td>${s.batch} Batch</td>
            <td>${s.std}</td>
            <td>${m} 2026</td>
            <td><span class="badge-role" style="${isPaid ? 'color:#15803d; background:#dcfce7;' : 'color:#b45309; background:#fef3c7;'}">${st}</span></td>
            <td class="staff-only-btn" style="${isTeacher ? '' : 'display:none;'}">
                <button class="btn-3d btn-sm ${isPaid ? 'btn-secondary' : 'btn-primary'}" onclick="window.toggleFeeStatus('${s.id}', '${m}')">
                    ${isPaid ? 'Set Pending' : 'Mark Paid ✓'}
                </button>
            </td>
        </tr>`;
    });
};


window.toggleFeeStatus = function(id, m) {
    const k = `${id}_${m}`;
    db.fees[k] = (db.fees[k] === 'Paid') ? 'Pending' : 'Paid';
    saveDatabase();
    window.loadFeeRoster();
};


// ==========================================================================
// 10. GALLERY MANAGER
// ==========================================================================
function renderPortalGallery() {
    const el = document.getElementById('portal-gallery-grid');
    if (!el) return;
    el.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.gallery.forEach(item => {
        const isVideo = item.type === 'video';
        const mediaTag = isVideo 
            ? `<video src="${item.url}" controls></video>` 
            : `<img src="${item.url}" alt="${item.title}">`;


        el.innerHTML += `
            <div class="gallery-card-item card-3d">
                <div class="gallery-media-slot">
                    ${mediaTag}
                </div>
                <div class="gallery-caption-box">
                    <strong>${item.title}</strong>
                    <div style="${isTeacher ? '' : 'display:none;'}">
                        <button class="btn-3d btn-danger btn-sm" onclick="window.deleteGalleryItem('${item.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}


function renderPublicGallery() {
    const pubGrid = document.getElementById('public-gallery-grid');
    if (!pubGrid) return;
    pubGrid.innerHTML = '';


    db.gallery.forEach(item => {
        const isVideo = item.type === 'video';
        const mediaTag = isVideo 
            ? `<video src="${item.url}" controls></video>` 
            : `<img src="${item.url}" alt="${item.title}">`;


        pubGrid.innerHTML += `
            <div class="gallery-card-item card-3d">
                <div class="gallery-media-slot">
                    ${mediaTag}
                </div>
                <div class="gallery-caption-box">
                    <strong>${item.title || 'Classroom Activity'}</strong>
                    <span class="badge-role" style="background:#e0f2fe; color:#0369a1;">${isVideo ? '📹 Video' : '📷 Photo'}</span>
                </div>
            </div>
        `;
    });
}


window.uploadGalleryItem = function() {
    const title = document.getElementById('gal_item_title').value.trim();
    const type = document.getElementById('gal_item_type').value;
    const fileInput = document.getElementById('gal_item_file');


    if (!title || !fileInput.files || !fileInput.files[0]) {
        return alert('Title and Photo/Video file are required.');
    }


    const reader = new FileReader();
    reader.onload = function(e) {
        db.gallery.unshift({
            id: 'g_' + Date.now(),
            title, type, url: e.target.result
        });
        saveDatabase();
        renderPortalGallery();
        renderPublicGallery();
        document.getElementById('gal_item_title').value = '';
        fileInput.value = '';
        alert('Item uploaded to gallery!');
    };
    reader.readAsDataURL(fileInput.files[0]);
};


window.deleteGalleryItem = function(id) {
    if (confirm('Delete this gallery item?')) {
        db.gallery = db.gallery.filter(x => x.id !== id);
        saveDatabase();
        renderPortalGallery();
        renderPublicGallery();
    }
};


// ==========================================================================
// 11. DOUBTS & SUGGESTIONS
// ==========================================================================
window.toggleDoubtForm = () => document.getElementById('doubt-add-form').classList.toggle('hidden-panel');


window.submitDoubt = function() {
    const name = document.getElementById('doubt_st_name').value.trim();
    const sub = document.getElementById('doubt_sub').value.trim();
    const msg = document.getElementById('doubt_msg').value.trim();
    if (!name || !sub || !msg) return alert('All fields are required.');


    db.doubts.unshift({
        id: 'd_' + Date.now(),
        name, batch: activeRole, sub, msg
    });
    saveDatabase();
    loadDoubts();
    window.toggleDoubtForm();
    alert('Doubt sent to the teacher!');
};


function loadDoubts() {
    const el = document.getElementById('doubts-feed');
    if (!el) return;
    el.innerHTML = '';
    const isTeacher = (activeRole === 'Teacher');


    db.doubts.forEach(d => {
        el.innerHTML += `
            <div class="notice-item-3d card-3d">
                <div class="flex-between">
                    <h4>${d.sub}</h4>
                    <span class="badge-role" style="background:#e0f2fe; color:#0369a1;">${d.name} (${d.batch} Batch)</span>
                </div>
                <p style="margin-top:8px; line-height:1.6; color:#334155;">${d.msg}</p>
                <div style="${isTeacher ? '' : 'display:none;'}; margin-top:10px;">
                    <button class="btn-3d btn-danger btn-sm" onclick="window.delDoubt('${d.id}')">Dismiss Doubt</button>
                </div>
            </div>
        `;
    });
}


window.delDoubt = function(id) {
    if (confirm('Dismiss doubt?')) {
        db.doubts = db.doubts.filter(x => x.id !== id);
        saveDatabase();
        loadDoubts();
    }
};


// ==========================================================================
// 12. WEBSITE & DETAILS LIVE EDITOR
// ==========================================================================
function applyWebsiteContent(c) {
    if (!c) c = db.website_content;


    const sName = c.schoolName || "Educare Group Tuition";
    ['pub-school-main-name', 'modal-school-name', 'sidebar-school-title', 'header-school-name'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = sName;
    });


    const subEl = document.getElementById('pub-school-subtag');
    if (subEl) subEl.innerText = c.schoolSubtag || "";


    const footEl = document.getElementById('pub-footer-copy');
    if (footEl) footEl.innerText = `© 2026 ${sName}. All Rights Reserved.`;


    const bgOverlay = document.getElementById('site-background-wallpaper');
    if (bgOverlay) {
        bgOverlay.style.backgroundImage = c.bgWallpaper ? `url('${c.bgWallpaper}')` : 'none';
        const opVal = (c.bgOpacity !== undefined ? c.bgOpacity : 18) / 100;
        bgOverlay.style.opacity = opVal;
    }


    const topR = document.getElementById('pub-top-ribbon');
    if (topR && c.topRibbon) topR.innerHTML = c.topRibbon;


    const hBadge = document.getElementById('pub-hero-badge');
    if (hBadge && c.heroBadge) hBadge.innerText = c.heroBadge;


    const hTitle = document.getElementById('pub-hero-title');
    if (hTitle && c.heroTitle) hTitle.innerText = c.heroTitle;


    const hDesc = document.getElementById('pub-hero-desc');
    if (hDesc && c.heroDesc) hDesc.innerText = c.heroDesc;


    const tPhone = document.getElementById('pub-top-phone');
    if (tPhone && c.phone) { tPhone.innerText = c.phone; tPhone.href = `tel:${c.phone}`; }


    const cPhone = document.getElementById('pub-contact-phone');
    if (cPhone && c.phone) { cPhone.innerText = `+91 ${c.phone}`; cPhone.href = `tel:${c.phone}`; }


    const tEmail = document.getElementById('pub-top-email');
    if (tEmail && c.email) { tEmail.innerText = c.email; tEmail.href = `mailto:${c.email}`; }


    const cEmail = document.getElementById('pub-contact-email');
    if (cEmail && c.email) { cEmail.innerText = c.email; cEmail.href = `mailto:${c.email}`; }


    const cAddr = document.getElementById('pub-contact-address');
    if (cAddr && c.address) cAddr.innerText = c.address;


    const cHours = document.getElementById('pub-contact-hours');
    if (cHours && c.hours) cHours.innerText = c.hours;


    const mIframe = document.getElementById('pub-map-iframe');
    if (mIframe && c.mapUrl) mIframe.src = c.mapUrl;


    const cName = document.getElementById('pub-campus-name');
    if (cName && c.campusTitle) cName.innerText = c.campusTitle;


    // Populate Editor
    const edName = document.getElementById('edit-web-schoolname');
    if (edName) edName.value = c.schoolName || "Educare Group Tuition";


    const edSubtag = document.getElementById('edit-web-schoolsubtag');
    if (edSubtag) edSubtag.value = c.schoolSubtag || "";


    const edRibbon = document.getElementById('edit-web-topribbon');
    if (edRibbon) edRibbon.value = c.topRibbon || '';


    const edBadge = document.getElementById('edit-web-herobadge');
    if (edBadge) edBadge.value = c.heroBadge || '';


    const edTitle = document.getElementById('edit-web-herotitle');
    if (edTitle) edTitle.value = c.heroTitle || '';


    const edDesc = document.getElementById('edit-web-herodesc');
    if (edDesc) edDesc.value = c.heroDesc || '';


    const edPhone = document.getElementById('edit-web-phone');
    if (edPhone) edPhone.value = c.phone || '9173830909';


    const edEmail = document.getElementById('edit-web-email');
    if (edEmail) edEmail.value = c.email || 'educaregrouptuition@gmail.com';


    const edHours = document.getElementById('edit-web-hours');
    if (edHours) edHours.value = c.hours || '';


    const edCamp = document.getElementById('edit-web-campustitle');
    if (edCamp) edCamp.value = c.campusTitle || '';


    const edAddr = document.getElementById('edit-web-address');
    if (edAddr) edAddr.value = c.address || '';


    const edMap = document.getElementById('edit-web-mapurl');
    if (edMap) edMap.value = c.mapUrl || '';


    const opSlider = document.getElementById('edit-web-bg-opacity');
    const opLabel = document.getElementById('bg-opacity-val-label');
    if (opSlider && opLabel) {
        const val = c.bgOpacity !== undefined ? c.bgOpacity : 18;
        opSlider.value = val;
        opLabel.innerText = `${val}%`;
    }
}


window.updateBgOpacityPreview = function(val) {
    const opLabel = document.getElementById('bg-opacity-val-label');
    if (opLabel) opLabel.innerText = `${val}%`;
    const bgOverlay = document.getElementById('site-background-wallpaper');
    if (bgOverlay) bgOverlay.style.opacity = val / 100;
};


let uploadedBgWallpaperBase64 = null;
window.handleBgPhotoUpload = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            uploadedBgWallpaperBase64 = e.target.result;
            const bgOverlay = document.getElementById('site-background-wallpaper');
            if (bgOverlay) bgOverlay.style.backgroundImage = `url('${e.target.result}')`;
            alert('Classroom background image selected! Click "Save & Publish" to keep it permanent.');
        };
        reader.readAsDataURL(input.files[0]);
    }
};


window.saveWebsiteContentToCloud = function() {
    const opacityInput = document.getElementById('edit-web-bg-opacity');
    const parsedOpacity = opacityInput ? parseInt(opacityInput.value) : 18;


    db.website_content = {
        schoolName: document.getElementById('edit-web-schoolname').value.trim() || "Educare Group Tuition",
        schoolSubtag: document.getElementById('edit-web-schoolsubtag').value.trim() || "",
        topRibbon: document.getElementById('edit-web-topribbon').value.trim() || "",
        heroBadge: document.getElementById('edit-web-herobadge').value.trim() || "",
        heroTitle: document.getElementById('edit-web-herotitle').value.trim() || "",
        heroDesc: document.getElementById('edit-web-herodesc').value.trim() || "",
        phone: document.getElementById('edit-web-phone').value.trim() || '9173830909',
        email: document.getElementById('edit-web-email').value.trim() || 'educaregrouptuition@gmail.com',
        hours: document.getElementById('edit-web-hours').value.trim() || "",
        campusTitle: document.getElementById('edit-web-campustitle').value.trim() || "",
        address: document.getElementById('edit-web-address').value.trim() || "",
        mapUrl: document.getElementById('edit-web-mapurl').value.trim() || "",
        bgWallpaper: uploadedBgWallpaperBase64 || db.website_content.bgWallpaper,
        bgOpacity: parsedOpacity
    };


    saveDatabase();
    applyWebsiteContent(db.website_content);
    alert('Tuition details and background wallpaper saved successfully!');
};


// ==========================================================================
// 13. BATCH PASSWORD MANAGEMENT
// ==========================================================================
window.saveBatchPasswords = function() {
    const g = document.getElementById('cfg-girls-pass').value.trim();
    const b = document.getElementById('cfg-boys-pass').value.trim();
    const t = document.getElementById('cfg-teacher-pass').value.trim();


    if (!g || !b || !t) return alert('All passwords are required.');


    safeSet(PASSWORDS_KEY, JSON.stringify({ Girls: g, Boys: b, Teacher: t }));
    alert(`Batch passwords updated successfully!\nGirls: ${g}\nBoys: ${b}\nTeacher: ${t}`);
};


window.saveQuickPasswords = function() {
    const g = document.getElementById('quick-girls-pass').value.trim();
    const b = document.getElementById('quick-boys-pass').value.trim();
    const t = document.getElementById('quick-teacher-pass').value.trim();


    if (!g || !b || !t) return alert('All passwords are required.');


    safeSet(PASSWORDS_KEY, JSON.stringify({ Girls: g, Boys: b, Teacher: t }));
    window.closeManagePasswordsModal();
    alert('Passwords updated!');
};


function renderPublicFaculty() {
    const el = document.getElementById('public-faculty-grid');
    if (!el) return;
    el.innerHTML = '';


    initialFaculty.forEach(t => {
        el.innerHTML += `
            <div class="faculty-card-pro card-3d">
                <div class="faculty-avatar-crest">👨‍🏫</div>
                <h3>${t.name}</h3>
                <span class="faculty-qualification">${t.qual}</span>
                <span class="faculty-tag">${t.subject}</span>
                <span class="faculty-experience-badge">${t.exp} Experience</span>
                <span class="faculty-class-badge">${t.classteacher}</span>
            </div>
        `;
    });
}


window.exportBackupJSON = function() {
    const a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db));
    a.download = 'Educare_Tuition_Backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
};


window.resetTuitionData = function() {
    if (confirm('Are you sure you want to reset all records to initial default?')) {
        safeRemove(STORAGE_KEY);
        safeRemove(PASSWORDS_KEY);
        location.reload();
    }
};


// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
    const savedRole = safeGet('EDUCARE_ACTIVE_ROLE');
    if (savedRole) {
        openPortal(savedRole);
    } else {
        renderPublicFaculty();
        renderPublicGallery();
        applyWebsiteContent(db.website_content);
    }
    window.switchLanguage('en');
});