# Prompt for GitHub Copilot Agent

You are working on a static Hebrew (RTL) law firm website for "Krispel Law" (krispelaw.com). The site uses Tailwind CSS (CDN), Bootstrap Icons, Google Fonts (Heebo), and AOS animations. It will be hosted on GitHub Pages with a custom domain.

**IMPORTANT:** Preserve all existing design, colors, content, accessibility features, and RTL layout. Do not change the visual appearance. Only restructure, optimize, and add missing elements.

---

## Task 1: Restructure for Clean URLs (No .html)

Move each HTML file (except `index.html` in root) into its own folder with `index.html` inside:

```
BEFORE:                     AFTER:
index.html            →     index.html (stays in root)
about.html            →     about/index.html
contact.html          →     contact/index.html
team.html             →     team/index.html
privacy.html          →     privacy/index.html
accessibility.html    →     accessibility/index.html
inner-page.html       →     DELETE this file (unused template)
```

After moving, update ALL internal links across ALL pages:
- `about.html` → `/about/`
- `contact.html` → `/contact/`
- `team.html` → `/team/`
- `privacy.html` → `/privacy/`
- `accessibility.html` → `/accessibility/`
- `index.html` → `/`
- Anchor links like `index.html#practices` → `/#practices`
- Image paths: since files are now in subdirectories, update relative paths (e.g., `images/logo1.png` → `/images/logo1.png`) — use absolute paths starting with `/` for all assets (images, JS, etc.)
- Update `main.js` path in all pages to `/main.js`
- Update all CDN links to remain unchanged (they are already absolute)

---

## Task 2: Add CNAME File

Create a `CNAME` file in the project root with:
```
krispelaw.com
```

---

## Task 3: Create Thank You Page

Create `thank-you/index.html` — a clean, elegant thank you page shown after successful form submission.

Content and design:
- Same header/nav as other pages (consistent navigation)
- Centered content with a checkmark icon (use Bootstrap Icons `bi-check-circle-fill`)
- Heading: "תודה שפנית אלינו!"
- Subtext: "פנייתך התקבלה בהצלחה. צוות המשרד יחזור אליך בהקדם האפשרי."
- A button to return to homepage: "חזרה לדף הבית" linking to `/`
- Same footer as other pages
- Same styling (colors, fonts, RTL) as the rest of the site
- Add `<meta name="robots" content="noindex, nofollow">` — this page should not be indexed

Then update `main.js` — in the form submit success handler (after `response.ok`), instead of showing the inline success message and disabling the form, redirect to the thank you page:
```javascript
window.location.href = "/thank-you/";
```

Remove the inline success message code that currently exists (the status element update, form.reset, opacity change, etc.). Keep the error handling as-is.

---

## Task 4: Rename Image Files to English

Rename all Hebrew-named image files to English:
- `פרופיל_אבא1.jpg` → `profile-yosef.jpg`
- `פרופיל מאור1.jpg` → `profile-maor.jpg`
- `פרופיל מאוד_חדש.jpg` → `profile-maor-new.jpg`

Update all references to these files across all HTML pages.

---

## Task 5: Full SEO Setup

### 5.1 Meta Tags on Every Page

Add to every page's `<head>` (customize description per page):

```html
<meta name="description" content="[UNIQUE DESCRIPTION PER PAGE - SEE BELOW]">
<meta name="keywords" content="עורך דין, משרד עורכי דין, יוסף קריספל, דיני משפחה, מקרקעין, נדלן, משפט מסחרי, גישור, גדרה">
<link rel="canonical" href="https://krispelaw.com/[PAGE_PATH]/">
```

Page-specific descriptions (in Hebrew):
- **Homepage (/):** "משרד עורכי דין יוסף קריספל - מומחים בדיני משפחה, מקרקעין ומשפט מסחרי. שירות בוטיק אישי ומקצועי בגדרה והסביבה. צרו קשר לייעוץ ראשוני."
- **About (/about/):** "אודות משרד עורכי דין יוסף קריספל - למעלה מ-25 שנות ניסיון בתחום המשפט. גישה אישית, מקצועיות ומחויבות ללקוח."
- **Team (/team/):** "הכירו את צוות משרד קריספל - עו״ד יוסף קריספל ועו״ד מאור קריספל. מומחיות בדיני משפחה, מקרקעין, משפט מסחרי ותעבורה."
- **Contact (/contact/):** "צרו קשר עם משרד עורכי דין קריספל - דוד רמז 4, גדרה. טלפון: 052-3849777. מייל: adv@krispelaw.com. תיאום פגישת ייעוץ."
- **Privacy (/privacy/):** "מדיניות פרטיות - משרד עורכי דין יוסף קריספל. מידע על איסוף נתונים, שימוש בעוגיות ושמירה על פרטיותכם."
- **Accessibility (/accessibility/):** "הצהרת נגישות - משרד עורכי דין יוסף קריספל. האתר עומד בתקן IS 5568 ובהנחיות WCAG 2.1 ברמה AA."

### 5.2 Open Graph Tags on Every Page

Add to `<head>` of every page:
```html
<meta property="og:title" content="[PAGE TITLE]">
<meta property="og:description" content="[SAME AS META DESCRIPTION]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://krispelaw.com/[PAGE_PATH]/">
<meta property="og:image" content="https://krispelaw.com/images/og-image.jpg">
<meta property="og:locale" content="he_IL">
<meta property="og:site_name" content="משרד עורכי דין קריספל">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[PAGE TITLE]">
<meta name="twitter:description" content="[SAME AS META DESCRIPTION]">
```

### 5.3 Schema.org Structured Data (LocalBusiness)

Add to `index.html` `<head>` only:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "משרד עורכי דין יוסף קריספל",
  "alternateName": "Krispel Law",
  "url": "https://krispelaw.com",
  "logo": "https://krispelaw.com/images/logo1.png",
  "image": "https://krispelaw.com/images/og-image.jpg",
  "telephone": "+972-52-3849777",
  "email": "adv@krispelaw.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "דוד רמז 4",
    "addressLocality": "גדרה",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.8145",
    "longitude": "34.7796"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "31.8145",
      "longitude": "34.7796"
    },
    "geoRadius": "50000"
  },
  "priceRange": "$$",
  "openingHours": "Su-Th 09:00-18:00",
  "sameAs": [],
  "description": "משרד עורכי דין יוסף קריספל - מומחים בדיני משפחה, מקרקעין ומשפט מסחרי. שירות בוטיק אישי ומקצועי בגדרה והסביבה.",
  "knowsAbout": ["דיני משפחה", "מקרקעין", "נדל\"ן", "משפט מסחרי", "גישור", "תעבורה"]
}
</script>
```

### 5.4 Create robots.txt

Create `robots.txt` in root:
```
User-agent: *
Allow: /
Disallow: /thank-you/

Sitemap: https://krispelaw.com/sitemap.xml
```

### 5.5 Create sitemap.xml

Create `sitemap.xml` in root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://krispelaw.com/</loc>
    <priority>1.0</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://krispelaw.com/about/</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://krispelaw.com/team/</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://krispelaw.com/contact/</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://krispelaw.com/privacy/</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://krispelaw.com/accessibility/</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>
```

---

## Task 6: Performance Optimization

### 6.1 Add Preconnect for External Resources

Add to `<head>` of every page (BEFORE the font/CDN links):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://unpkg.com">
```

### 6.2 Lazy Loading for Images

Add `loading="lazy"` to ALL `<img>` tags that are NOT in the hero/above-the-fold section. For hero images, keep eager loading.

### 6.3 Defer Non-Critical Scripts

Add `defer` to AOS script tag:
```html
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></script>
```

---

## Task 7: Create 404 Page

Create `404.html` in the project ROOT (GitHub Pages requires it in root, NOT in a subfolder):

Design:
- Same header/nav as other pages
- Centered content with a large "404" number styled in the gold color (#C8A45E)
- Icon: `bi-exclamation-triangle`
- Heading: "הדף לא נמצא"
- Subtext: "מצטערים, הדף שחיפשת אינו קיים. ייתכן שהקישור שגוי או שהדף הוסר."
- Button: "חזרה לדף הבית" linking to `/`
- Same footer as other pages
- Same styling (colors, fonts, RTL)

---

## Task 8: Favicon

Add to `<head>` of every page:
```html
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">
```

(The actual favicon.png file will be added manually by the developer)

---

## Task 9: UX Improvements

### 9.1 Back to Top Button

Add a floating "back to top" button that appears after scrolling down 300px. Place it above the WhatsApp button on the left side.

```html
<button id="back-to-top" class="fixed bottom-28 left-5 z-50 bg-[#C8A45E] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#b8944e] transition-all duration-300 opacity-0 pointer-events-none" aria-label="חזרה למעלה">
    <i class="bi bi-arrow-up text-xl"></i>
</button>
```

Add the scroll logic in `main.js`:
- Show button when `window.scrollY > 300`
- Smooth scroll to top on click
- Toggle opacity and pointer-events

### 9.2 Preloader

Add a simple preloader overlay that hides after the page loads:

```html
<div id="preloader" class="fixed inset-0 bg-[#0E2441] z-[9999] flex items-center justify-center transition-opacity duration-500">
    <img src="/images/logo1.png" alt="טוען..." class="w-24 animate-pulse">
</div>
```

Add to `main.js`:
```javascript
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});
```

Add preloader HTML at the very beginning of `<body>` in every page.

---

## Task 10: Google Analytics Placeholder

Add to `<head>` of every page (commented out, ready for activation):
```html
<!-- Google Analytics - Replace GA_MEASUREMENT_ID with actual ID -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
-->
```

---

## Task 11: Add .gitignore

Create `.gitignore` in root:
```
.DS_Store
.idea/
node_modules/
*.log
```

---

## Task 12: Verify Formspree Email

In the contact form, the Formspree endpoint is `https://formspree.io/f/xnjvvlde`. Add a comment above it in `main.js`:
```javascript
// Formspree form — emails are sent to krispelaw@gmail.com
// To change the recipient, update the Formspree dashboard at https://formspree.io
```

---

## Final Checklist

After completing all tasks, verify:
- [ ] All pages load without broken links
- [ ] All images display correctly with new paths
- [ ] Navigation works from every page
- [ ] Form submission redirects to /thank-you/
- [ ] 404 page displays correctly
- [ ] Clean URLs work (no .html in any link)
- [ ] RTL layout is preserved on all pages
- [ ] Accessibility widget works on all pages
- [ ] Cookie consent banner works on all pages
- [ ] WhatsApp button works on all pages
- [ ] Mobile hamburger menu works on all pages
- [ ] All meta tags and SEO elements are in place
- [ ] sitemap.xml and robots.txt are valid
- [ ] CNAME file exists with krispelaw.com
- [ ] Back to top button works
- [ ] Preloader shows and hides correctly

---

## File Structure After All Changes

```
/
├── index.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── favicon.png (to be added manually)
├── main.js
├── .gitignore
├── package.json
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── team/
│   └── index.html
├── thank-you/
│   └── index.html
├── privacy/
│   └── index.html
├── accessibility/
│   └── index.html
└── images/
    ├── logo1.png
    ├── yosef-hero.png
    ├── profile-yosef.jpg
    ├── profile-maor.jpg
    ├── profile-maor-new.jpg
    ├── Cinematic_Law_Firm_Header_Video.mp4
    └── backgraundweb.mp4
```
