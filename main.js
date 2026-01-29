/**
 * Main System Script - Krispel Law Firm
 * Includes: Accessibility (IS 5568 Compliant), Cookie Consent, Global Navigation Logic
 */

document.addEventListener('DOMContentLoaded', function() {
    initCookieConsent();
    injectFloatingWidgets();
    initMobileMenu();
    applySavedAccessibilitySettings(); // שחזור הגדרות נגישות בטעינת דף
});

/* --- 1. Accessibility Engine (מנוע הנגישות) --- */
const a11ySettings = {
    fontSize: 100,
    contrast: 'normal',
    highlightLinks: false,
    readableFont: false,
    animationsStopped: false
};

function injectFloatingWidgets() {
    // 1. הזרקת ה-CSS של הנגישות
    const style = document.createElement('style');
    style.innerHTML = `
        /* מחלקות עזר לנגישות */
        .a11y-high-contrast { filter: contrast(150%); background-color: #000 !important; color: #fff !important; }
        .a11y-high-contrast * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }
        
        .a11y-light-contrast { filter: contrast(120%); background-color: #fff !important; color: #000 !important; }
        .a11y-light-contrast * { background-color: #fff !important; color: #000 !important; border-color: #000 !important; }

        .a11y-highlight-links a { text-decoration: underline !important; font-weight: bold !important; color: #ffff00 !important; background-color: #000 !important; }
        
        .a11y-readable-font, .a11y-readable-font * { font-family: Arial, Helvetica, sans-serif !important; letter-spacing: 0.5px; }
        
        .a11y-stop-animations *, .a11y-stop-animations video { animation: none !important; transition: none !important; }
        
        /* כפתורי הווידג'טים */
        .widget-btn { transition: all 0.3s ease; }
        .widget-btn:focus { outline: 3px solid #C8A45E; outline-offset: 2px; }
    `;
    document.head.appendChild(style);

    // 2. יצירת ה-HTML של הווידג'טים
    const widgets = document.createElement('div');
    widgets.innerHTML = `
        <a href="https://wa.me/972523849777?text=היי,%20אשמח%20לפרטים%20נוספים" target="_blank" 
           aria-label="שלח הודעה בוואטסאפ"
           class="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition duration-300 widget-btn">
            <i class="bi bi-whatsapp"></i>
        </a>

        <div class="fixed bottom-6 right-6 z-50 group">
            <button id="a11yToggleBtn" onclick="toggleAccessMenu()" 
                aria-label="פתח תפריט נגישות" aria-expanded="false"
                class="bg-[#0E2441] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-[#C8A45E] transition border-2 border-white widget-btn">
                <i class="bi bi-universal-access"></i>
            </button>
            
            <div id="accessMenu" class="hidden absolute bottom-20 right-0 bg-white shadow-2xl rounded-xl w-72 border border-gray-200 overflow-hidden transform origin-bottom-right" role="dialog" aria-modal="true" aria-labelledby="a11yTitle">
                <div class="bg-[#0E2441] p-4 flex justify-between items-center">
                    <h2 id="a11yTitle" class="text-white font-bold text-lg">כלי נגישות</h2>
                    <button onclick="toggleAccessMenu()" class="text-white hover:text-[#C8A45E]"><i class="bi bi-x-lg"></i></button>
                </div>
                
                <div class="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                    <button onclick="changeFontSize(10)" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>הגדל טקסט</span> <i class="bi bi-zoom-in text-xl"></i>
                    </button>
                    <button onclick="changeFontSize(-10)" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>הקטן טקסט</span> <i class="bi bi-zoom-out text-xl"></i>
                    </button>
                    <button onclick="toggleContrast()" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>ניגודיות גבוהה</span> <i class="bi bi-circle-half text-xl"></i>
                    </button>
                    <button onclick="toggleHighlightLinks()" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>הדגשת קישורים</span> <i class="bi bi-link-45deg text-xl"></i>
                    </button>
                    <button onclick="toggleReadableFont()" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>גופן קריא</span> <i class="bi bi-type text-xl"></i>
                    </button>
                     <button onclick="toggleAnimations()" class="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition widget-btn">
                        <span>עצור אנימציות</span> <i class="bi bi-pause-circle text-xl"></i>
                    </button>
                    
                    <button onclick="resetAccessibility()" class="w-full text-center p-2 text-red-600 font-bold hover:bg-red-50 rounded mt-2 border border-red-100 widget-btn">
                        איפוס הגדרות
                    </button>
                    
                    <div class="text-center pt-2 border-t mt-2">
                        <a href="accessibility.html" class="text-xs text-blue-600 underline">הצהרת נגישות</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(widgets);
}

// לוגיקה של הנגישות
function toggleAccessMenu() {
    const menu = document.getElementById('accessMenu');
    const btn = document.getElementById('a11yToggleBtn');
    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // פוקוס על האלמנט הראשון בתפריט
        menu.querySelector('button').focus();
    } else {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }
}

function saveSettings() {
    localStorage.setItem('krispelA11y', JSON.stringify(a11ySettings));
}

function changeFontSize(amount) {
    a11ySettings.fontSize += amount;
    // הגבלה בין 80% ל-200%
    if (a11ySettings.fontSize < 80) a11ySettings.fontSize = 80;
    if (a11ySettings.fontSize > 200) a11ySettings.fontSize = 200;

    document.body.style.fontSize = a11ySettings.fontSize + '%';
    saveSettings();
}

function toggleContrast() {
    if (a11ySettings.contrast === 'normal') {
        a11ySettings.contrast = 'high';
        document.body.classList.add('a11y-high-contrast');
    } else if (a11ySettings.contrast === 'high') {
        a11ySettings.contrast = 'light';
        document.body.classList.remove('a11y-high-contrast');
        document.body.classList.add('a11y-light-contrast');
    } else {
        a11ySettings.contrast = 'normal';
        document.body.classList.remove('a11y-high-contrast', 'a11y-light-contrast');
    }
    saveSettings();
}

function toggleHighlightLinks() {
    a11ySettings.highlightLinks = !a11ySettings.highlightLinks;
    document.body.classList.toggle('a11y-highlight-links', a11ySettings.highlightLinks);
    saveSettings();
}

function toggleReadableFont() {
    a11ySettings.readableFont = !a11ySettings.readableFont;
    document.body.classList.toggle('a11y-readable-font', a11ySettings.readableFont);
    saveSettings();
}

function toggleAnimations() {
    a11ySettings.animationsStopped = !a11ySettings.animationsStopped;
    document.body.classList.toggle('a11y-stop-animations', a11ySettings.animationsStopped);

    // עצירה ספציפית של וידאו הרקע
    const videos = document.querySelectorAll('video');
    videos.forEach(v => a11ySettings.animationsStopped ? v.pause() : v.play());

    saveSettings();
}

function resetAccessibility() {
    a11ySettings.fontSize = 100;
    a11ySettings.contrast = 'normal';
    a11ySettings.highlightLinks = false;
    a11ySettings.readableFont = false;
    a11ySettings.animationsStopped = false;

    document.body.style.fontSize = '';
    document.body.classList.remove('a11y-high-contrast', 'a11y-light-contrast', 'a11y-highlight-links', 'a11y-readable-font', 'a11y-stop-animations');

    const videos = document.querySelectorAll('video');
    videos.forEach(v => v.play());

    localStorage.removeItem('krispelA11y');
    document.getElementById('accessMenu').classList.add('hidden');
}

function applySavedAccessibilitySettings() {
    const saved = localStorage.getItem('krispelA11y');
    if (saved) {
        const settings = JSON.parse(saved);
        // שחזור הגדרות
        a11ySettings.fontSize = settings.fontSize;
        a11ySettings.contrast = settings.contrast;
        a11ySettings.highlightLinks = settings.highlightLinks;
        a11ySettings.readableFont = settings.readableFont;
        a11ySettings.animationsStopped = settings.animationsStopped;

        // יישום בפועל
        if (settings.fontSize !== 100) document.body.style.fontSize = settings.fontSize + '%';
        if (settings.contrast === 'high') document.body.classList.add('a11y-high-contrast');
        if (settings.contrast === 'light') document.body.classList.add('a11y-light-contrast');
        if (settings.highlightLinks) document.body.classList.add('a11y-highlight-links');
        if (settings.readableFont) document.body.classList.add('a11y-readable-font');
        if (settings.animationsStopped) {
            document.body.classList.add('a11y-stop-animations');
            setTimeout(() => { // המתנה לטעינת הוידאו
                document.querySelectorAll('video').forEach(v => v.pause());
            }, 1000);
        }
    }
}


/* --- 2. Cookie Consent Logic (עוגיות) --- */
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.innerHTML = `
            <div id="cookieBanner" class="fixed bottom-0 w-full bg-gray-900 text-white p-4 z-[60] transform translate-y-full transition-transform duration-500 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p class="text-sm text-gray-300 text-center md:text-right">
                        🍪 אתר זה עושה שימוש בקבצי Cookies על מנת לשפר את חווית הגלישה. 
                        <a href="privacy.html" class="underline text-[#C8A45E] hover:text-white">למידע נוסף</a>
                    </p>
                    <button onclick="acceptCookies()" class="bg-[#C8A45E] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#b5952f] transition shadow-lg whitespace-nowrap">
                        אני מסכים/ה
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);
        setTimeout(() => document.getElementById('cookieBanner').classList.remove('translate-y-full'), 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.getElementById('cookieBanner');
    banner.classList.add('translate-y-full');
    setTimeout(() => banner.remove(), 500);
}

/* --- 3. Mobile Menu Logic (תפריט מובייל) --- */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if(btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            // שינוי האייקון
            const icon = btn.querySelector('i');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            } else {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x');
            }
        });
    }
}
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // מונע מהדף להתרענן או לעבור לאתר אחר

    const form = event.target;
    const status = document.getElementById("form-status");
    const button = form.querySelector("button");
    const originalBtnText = button.innerHTML;

    // 1. חיווי "שולח..."
    button.disabled = true;
    button.innerHTML = `<i class="bi bi-hourglass-split animate-spin ml-2"></i> שולח...`;

    // 2. הכנת הנתונים
    const data = new FormData(form);

    // 3. שליחה ל-Formspree ברקע
    try {
        const response = await fetch("https://formspree.io/f/xnjvvlde", {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // 4. חיווי הצלחה מדליק
            status.classList.remove('hidden', 'bg-red-100', 'text-red-700');
            status.classList.add('bg-green-100', 'text-green-700', 'animate-bounce');
            status.innerHTML = `<i class="bi bi-check-circle-fill ml-2"></i> פנייתך התקבלה בהצלחה! נחזור אליך בהקדם.`;

            form.reset(); // איפוס הטופס
            button.innerHTML = `<i class="bi bi-check2-all ml-2"></i> נשלח!`;

            // הסתרת הטופס אחרי 2 שניות (אופציונלי)
            setTimeout(() => {
                form.style.opacity = '0.3';
                form.style.pointerEvents = 'none';
            }, 2000);

        } else {
            throw new Error();
        }
    } catch (error) {
        // חיווי שגיאה
        status.classList.remove('hidden', 'bg-green-100', 'text-green-700');
        status.classList.add('bg-red-100', 'text-red-700');
        status.innerHTML = `<i class="bi bi-exclamation-triangle-fill ml-2"></i> אופס! הייתה שגיאה. נסה שנית או התקשר אלינו.`;
        button.disabled = false;
        button.innerHTML = originalBtnText;
    }
});