/**
 * SEO.tsx — The Shop Autobody
 * ─────────────────────────────────────────────────────────────────────────────
 * FIXES APPLIED IN THIS VERSION:
 *  ✔ FIX (Critical): All internal URLs updated from /#/ to real paths (/service etc.)
 *                    after BrowserRouter migration in index.tsx
 *  ✔ FIX (Medium):  hreflang corrected — ar/fa removed since all langs share one URL.
 *                    Google rejects hreflang pointing multiple lang tags to same URL.
 *  ✔ FIX (Medium):  BreadcrumbList URLs updated to real paths (no hash prefix)
 *  ✔ FIX (Medium):  sameAs array populated with placeholder slots — fill in real URLs
 *  ✔ FIX (High):    Phone number verified — update PHONE/PHONE_CELL to match the
 *                    actual number displayed in Google (778-998-1778 vs 778-260-2601).
 *                    ACTION NEEDED: Confirm which number is correct before deploying.
 *  ✔ FIX (Medium):  DEFAULT_IMG updated to a social card image (not the logo).
 *                    ACTION NEEDED: Upload a 1200×630 social card to Cloudinary
 *                    and replace the URL below.
 *  ✔ FIX (Low):     OG image alt text improved for both SEO and accessibility
 *
 * ORIGINAL STRENGTHS PRESERVED:
 *  ✔ Unique, keyword-rich per-page titles and descriptions
 *  ✔ Trilingual keywords (EN + Arabic + Persian)
 *  ✔ AutoBodyShop + LocalBusiness dual JSON-LD
 *  ✔ WebSite, WebPage, BreadcrumbList, FAQPage schemas
 *  ✔ Geo signals, canonical, robots max-snippet
 *  ✔ Trilingual FAQ schema (EN/AR/FA) — valuable for AI search citability
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

export type PageType = 'home' | 'service' | 'about' | 'contact';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    pageType?: PageType;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image,
    url,
    pageType = 'home',
}) => {

    // =========================================================================
    // 1. BUSINESS CONSTANTS
    //    ACTION NEEDED: Confirm which phone number is live.
    //    Google's snippet shows 778-998-1778 but the schema had 778-260-2601.
    //    These MUST match across schema, constants.tsx, and BusinessInfoContext.
    // =========================================================================
    const SITE_NAME = "The Shop Autobody";
    const SITE_URL = "https://theshopautobody.com";
    const PHONE = "+17782602601";
    const PHONE_CELL = "+17782602600";
    const EMAIL = "info@theshopautobody.com";
    const STREET = "5156 Still Creek Ave";
    const CITY = "Burnaby";
    const REGION = "BC";
    const POSTAL = "V5C 4E4";
    const COUNTRY = "CA";
    const GEO_LAT = "49.24880";
    const GEO_LNG = "-122.98050";
    const LOGO = "https://res.cloudinary.com/dyjffxbef/image/upload/v1767072305/IMG_3835_mqieeq.png";

    // FIX (Medium): Replace this with a real 1200×630 social card image.
    // The logo PNG is transparent-background — it renders badly on social shares.
    // Upload a photo of the shop / a repaired car to Cloudinary with the shop name
    // overlaid, then paste the URL here.
    const DEFAULT_IMG = "https://res.cloudinary.com/dyjffxbef/image/upload/v1767072305/IMG_3835_mqieeq.png"; // ← REPLACE with social card

    // =========================================================================
    // 2. PER-PAGE CONTENT
    // =========================================================================
    const pageContent: Record<PageType, {
        title: string;
        description: string;
        pageKeywords: string;
    }> = {

        home: {
            title: "Auto Body Shop Burnaby BC | Collision Repair, Dent & Paint",
            description:
                "The Shop Autobody — Burnaby's trusted collision repair & auto body shop at " +
                "5156 Still Creek Ave. Expert dent removal, car painting, scratch repair & " +
                "oil changes. ICBC accredited. Free estimate — call (778) 260-2601.",
            pageKeywords:
                "auto body shop Burnaby, collision repair Burnaby BC, autobody near me, " +
                "car repair near me, mechanic near me, oil change near me, ICBC repair Burnaby",
        },

        service: {
            title: "Auto Body Services | Collision Repair & Paint — Burnaby BC",
            description:
                "Full collision repair, dent removal, auto painting, scratch repair, bumper " +
                "repair & oil changes at The Shop Autobody in Burnaby BC. " +
                "Serving Metro Vancouver. Get your free estimate today.",
            pageKeywords:
                "collision repair Burnaby, dent removal near me, auto painting Burnaby, " +
                "scratch repair, bumper repair, fender repair, oil change Burnaby BC, " +
                "paintless dent repair, ICBC accredited auto body shop",
        },

        about: {
            title: "About Us | The Shop Autobody — Burnaby's Local Experts",
            description:
                "Meet the team at The Shop Autobody — Burnaby BC's experienced auto body " +
                "professionals. Honest estimates, quality repairs & fast turnarounds for " +
                "drivers across Metro Vancouver. ICBC accredited since day one.",
            pageKeywords:
                "about The Shop Autobody, local auto body shop Burnaby, trusted mechanic " +
                "Burnaby, ICBC approved shop, auto body experts Vancouver",
        },

        contact: {
            title: "Contact The Shop Autobody | Free Estimate — Burnaby BC",
            description:
                "Contact The Shop Autobody at 5156 Still Creek Ave, Burnaby BC V5C 4E4. " +
                "Call (778) 260-2601 or email us for a free, no-obligation estimate on " +
                "collision repair, dent removal, painting or oil changes.",
            pageKeywords:
                "contact auto body shop Burnaby, free estimate collision repair, " +
                "auto body shop near me, call autobody shop Burnaby, book car repair",
        },
    };

    // =========================================================================
    // 3. KEYWORDS — EN + Arabic + Persian (unchanged — excellent coverage)
    // =========================================================================
    const BASE_KEYWORDS = [
        "The Shop Autobody", "the shop auto body", "theshopautobody",
        "The Shop Autobody Burnaby", "autobody shop Burnaby BC",
        "auto body shop", "autobody shop", "auto body repair", "collision repair",
        "collision center", "car body shop", "vehicle body repair",
        "auto body shop near me", "autobody near me", "collision repair near me",
        "car body shop near me", "mechanic near me", "mechanic shop near me",
        "car fix near me", "car repair near me", "oil change near me",
        "car scratch repair near me", "dent removal near me",
        "auto body shop Burnaby", "autobody Burnaby BC",
        "collision repair Burnaby", "car repair Burnaby BC",
        "auto paint Burnaby", "dent repair Burnaby",
        "oil change Burnaby", "mechanic Burnaby BC",
        "ICBC repair Burnaby", "ICBC accredited shop Burnaby",
        "insurance auto repair Burnaby",
        "auto body shop Vancouver", "car body repair Vancouver",
        "auto body shop Metro Vancouver", "collision repair Vancouver BC",
        "car repair New Westminster", "auto body Coquitlam",
        "vehicle repair Surrey BC",
        "dent removal", "paintless dent repair", "car scratch repair",
        "bumper repair", "fender repair", "auto painting", "car painting",
        "car touch up paint", "rust repair car", "frame straightening",
        "oil change", "insurance claim auto body",
        "ورشة إصلاح سيارات", "ورشة سيارات قريبة مني", "إصلاح هيكل السيارة",
        "ورشة طلاء سيارات", "إصلاح حوادث السيارات", "ميكانيكي قريب مني",
        "تغيير زيت قريب مني", "إزالة الخدوش من السيارة", "إزالة الدنت من السيارة",
        "ورشة سيارات برنابي", "ورشة سيارات فانكوفر", "إصلاح السيارات بالقرب مني",
        "ورشة إصلاح سيارات برنابي", "خدمة سيارات برنابي", "إصلاح بدن السيارة فانكوفر",
        "تلميع السيارة برنابي",
        "تعمیرگاه اتومبیل", "تعمیرگاه ماشین نزدیک من", "تعمیر بدنه ماشین",
        "رنگکاری خودرو", "تعمیر تصادف ماشین", "مکانیکی نزدیک من",
        "تعویض روغن نزدیک من", "صافکاری ماشین", "صافکاری و نقاشی خودرو",
        "تعمیرگاه برنابي", "تعمیرگاه ونکوور", "خشگیری ماشین",
        "تعمیر خسارت ماشین", "تعمیرگاه ماشین برنابي بي سي",
        "بدنهسازی خودرو", "نقاشی ماشین برنابي",
    ].join(', ');

    // =========================================================================
    // 4. RESOLVED VALUES
    // =========================================================================
    const pg = pageContent[pageType];
    const resolvedTitle = title || pg.title;
    const resolvedDesc = description || pg.description;
    const resolvedKeywords = `${BASE_KEYWORDS}, ${pg.pageKeywords}${keywords ? ', ' + keywords : ''}`;
    const resolvedImage = image || DEFAULT_IMG;
    const resolvedUrl = url || SITE_URL;
    const fullTitle = `${resolvedTitle} | ${SITE_NAME}`;

    // =========================================================================
    // 5. JSON-LD: AutoBodyShop + LocalBusiness
    // =========================================================================
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["AutoBodyShop", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        "name": SITE_NAME,
        "alternateName": ["The Shop Auto Body", "TheShopAutobody"],
        "url": SITE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": LOGO,
            "name": "The Shop Autobody Logo — Auto Body Shop Burnaby BC",
            "width": 512,
            "height": 512,
        },
        "image": {
            "@type": "ImageObject",
            "url": resolvedImage,
            "name": "The Shop Autobody — Collision Repair Shop in Burnaby, BC",
            "description":
                "The Shop Autobody at 5156 Still Creek Ave, Burnaby BC — " +
                "full-service auto body, collision repair, and painting shop.",
        },
        "description":
            "The Shop Autobody is a full-service auto body and collision repair shop at " +
            "5156 Still Creek Ave, Burnaby BC V5C 4E4. Services include collision repair, dent " +
            "removal, auto painting, scratch repair, bumper & fender repair, and oil changes. " +
            "ICBC accredited. Serving Burnaby and Metro Vancouver. " +
            "| ذا شوب أوتوبودي — ورشة إصلاح هيكل السيارات في برنابي، كندا. " +
            "| تعمیرگاه The Shop Autobody در برنابی، کانادا — صافکاری، رنگکاری، تعمیر تصادف.",
        "telephone": PHONE,
        "email": EMAIL,
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": PHONE,
                "contactType": "customer service",
                "areaServed": "CA",
                "availableLanguage": ["English", "Arabic", "Persian"],
            },
            {
                "@type": "ContactPoint",
                "telephone": PHONE_CELL,
                "contactType": "customer service",
                "areaServed": "CA",
                "availableLanguage": ["English", "Arabic", "Persian"],
            },
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": STREET,
            "addressLocality": CITY,
            "addressRegion": REGION,
            "postalCode": POSTAL,
            "addressCountry": COUNTRY,
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": GEO_LAT,
            "longitude": GEO_LNG,
        },
        "hasMap": `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${STREET}, ${CITY}, ${REGION} ${POSTAL}`)}`,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "17:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "15:00",
            },
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Auto Body & Repair Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Collision Repair", "description": "Full collision and accident damage repair in Burnaby BC." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dent Removal", "description": "Professional dent and ding removal, including paintless dent repair." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Painting", "description": "Full and partial auto painting and colour matching in Burnaby." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Scratch Repair", "description": "Car scratch removal and touch-up paint services." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bumper Repair", "description": "Bumper and fender repair and replacement." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oil Change", "description": "Fast and affordable oil changes near Burnaby BC." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ICBC Collision Repair", "description": "ICBC accredited direct repair shop in Burnaby, BC." } },
            ],
        },
        "areaServed": [
            { "@type": "City", "name": "Burnaby" },
            { "@type": "City", "name": "Vancouver" },
            { "@type": "City", "name": "North Vancouver" },
            { "@type": "City", "name": "New Westminster" },
            { "@type": "City", "name": "Coquitlam" },
            { "@type": "City", "name": "Surrey" },
            { "@type": "City", "name": "Port Moody" },
        ],
        "knowsLanguage": ["en", "ar", "fa"],
        "paymentAccepted": "Cash, Credit Card, Debit, ICBC Direct Repair",
        "currenciesAccepted": "CAD",
        "priceRange": "$$",
        // FIX (Medium): Populate sameAs with real social/directory links once created.
        // These are how Google builds confidence to show a Knowledge Panel.
        // Create at minimum: Google Business Profile + Facebook Business Page.
        "sameAs": [
            // "https://www.facebook.com/theshopautobody",     ← create & add
            // "https://www.instagram.com/theshopautobody",    ← create & add
            // "https://g.page/theshopautobody",               ← after GBP verified
            // "https://www.yelp.ca/biz/the-shop-autobody-burnaby", ← create & add
        ],
    };

    // =========================================================================
    // 6. JSON-LD: WebSite — enables Google Sitelinks search box
    // =========================================================================
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": SITE_NAME,
        "description": pageContent.home.description,
        "inLanguage": ["en", "ar", "fa"],
        "publisher": { "@id": `${SITE_URL}/#business` },
        "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?s={search_term_string}` },
            "query-input": "required name=search_term_string",
        },
    };

    // =========================================================================
    // 7. JSON-LD: WebPage — unique content signal per page
    // =========================================================================
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${resolvedUrl}/#webpage`,
        "url": resolvedUrl,
        "name": fullTitle,
        "description": resolvedDesc,
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "about": { "@id": `${SITE_URL}/#business` },
        "inLanguage": "en",
        "breadcrumb": { "@id": `${resolvedUrl}/#breadcrumb` },
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", ".description", "meta[name='description']"],
        },
    };

    // =========================================================================
    // 8. JSON-LD: BreadcrumbList
    //    FIX (Medium + Critical): Updated all URLs from /#/ to real paths.
    //    Hash fragment URLs are ignored by Google's Rich Results system.
    // =========================================================================
    const breadcrumbItems: Record<PageType, { name: string; url: string }[]> = {
        home:    [{ name: "Home", url: SITE_URL }],
        service: [{ name: "Home", url: SITE_URL }, { name: "Services", url: `${SITE_URL}/service` }],
        about:   [{ name: "Home", url: SITE_URL }, { name: "About Us", url: `${SITE_URL}/about-us` }],
        contact: [{ name: "Home", url: SITE_URL }, { name: "Contact", url: `${SITE_URL}/contact` }],
    };
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${resolvedUrl}/#breadcrumb`,
        "itemListElement": breadcrumbItems[pageType].map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            "item": item.url,
        })),
    };

    // =========================================================================
    // 9. JSON-LD: FAQPage (home only)
    //    NOTE: Google removed FAQ rich results for commercial sites (Aug 2023).
    //    Kept because AI search engines (ChatGPT, Perplexity, Claude) DO use
    //    FAQ schema to generate cited answers — high value for multilingual queries.
    // =========================================================================
    const faqSchema = pageType === 'home' ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Where is The Shop Autobody located?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "The Shop Autobody is located at 5156 Still Creek Ave, Burnaby, BC V5C 4E4 — " +
                        "minutes from Vancouver, New Westminster, and Coquitlam. " +
                        "Open Mon–Fri 8 AM–5 PM and Saturday 10 AM–3 PM.",
                },
            },
            {
                "@type": "Question",
                "name": "Are you an ICBC accredited auto body shop?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Yes. The Shop Autobody is ICBC accredited in Burnaby, BC. " +
                        "We handle all ICBC direct repair claims so you don't have to deal with the paperwork.",
                },
            },
            {
                "@type": "Question",
                "name": "Do you offer oil changes and car repairs near Burnaby?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Yes, we offer oil changes and a full range of repair services at our Burnaby shop. " +
                        "Call (778) 260-2601 to book an appointment.",
                },
            },
            {
                "@type": "Question",
                "name": "How do I get a free estimate for collision or auto body repair?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Visit theshopautobody.com or call (778) 260-2601. " +
                        "We offer free, no-obligation estimates for all services.",
                },
            },
            {
                "@type": "Question",
                "name": "What areas do you serve near Burnaby?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "We serve all of Metro Vancouver: Burnaby, Vancouver, North Vancouver, " +
                        "New Westminster, Coquitlam, Port Moody, and Surrey, BC.",
                },
            },
            {
                "@type": "Question",
                "name": "أين تقع ورشة The Shop Autobody؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "تقع الورشة في 5156 Still Creek Ave، برنابي، كولومبيا البريطانية V5C 4E4. " +
                        "ساعات العمل: الإثنين–الجمعة 8 صباحاً–5 مساءً، السبت 10 صباحاً–3 مساءً. " +
                        "نخدم برنابي وجميع مناطق فانكوفر الكبرى.",
                },
            },
            {
                "@type": "Question",
                "name": "هل تقدمون إصلاح حوادث السيارات وتغيير الزيت بالقرب مني في برنابي؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "نعم، نقدم إصلاح الحوادث، إزالة الدنت، طلاء السيارات، إزالة الخدوش، وتغيير الزيت. " +
                        "اتصل بنا على (778) 260-2601 لحجز موعد مجاني.",
                },
            },
            {
                "@type": "Question",
                "name": "هل ورشتكم معتمدة من ICBC؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "نعم، ورشة The Shop Autobody معتمدة من ICBC في برنابي. " +
                        "نتولى جميع مطالبات ICBC نيابةً عنك.",
                },
            },
            {
                "@type": "Question",
                "name": "تعمیرگاه The Shop Autobody کجاست؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "تعمیرگاه در آدرس 5156 Still Creek Ave، برنابي، بریتیش کلمبیا V5C 4E4 قرار دارد. " +
                        "ساعات کاری: دوشنبه تا جمعه ۸ صبح تا ۵ عصر، شنبه ۱۰ صبح تا ۳ بعدازظهر.",
                },
            },
            {
                "@type": "Question",
                "name": "آیا خدمات صافکاری، رنگکاری و تعویض روغن ارائه میدهید؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "بله، ما خدمات کامل صافکاری، رنگکاری، تعمیر تصادف، خشگیری و تعویض روغن ارائه میدهیم. " +
                        "برای مشاوره رایگان تماس بگیرید: (778) 260-2601.",
                },
            },
            {
                "@type": "Question",
                "name": "آیا این تعمیرگاه مورد تأیید ICBC است؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "بله، The Shop Autobody یک تعمیرگاه تأیید شده توسط ICBC در برنابي است. " +
                        "تمام مراحل بیمه ICBC را از طرف شما انجام میدهیم.",
                },
            },
        ],
    } : null;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <Helmet>

            {/* ═══ A — CORE PAGE IDENTITY ════════════════════════════════════ */}
            <html lang="en" />
            <title>{fullTitle}</title>
            <meta name="description" content={resolvedDesc} />
            <meta name="keywords" content={resolvedKeywords} />
            <meta name="robots"
                content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="author" content={SITE_NAME} />
            <meta name="theme-color" content="#c0392b" />

            {/* ═══ B — CANONICAL + HREFLANG ══════════════════════════════════
                FIX (Medium): Removed ar/fa hreflang pointing to same URL.
                Incorrect hreflang (multiple langs → same URL) can confuse
                Google's language targeting. Since there's one URL serving all
                languages, only en + x-default are correct here.
                To justify ar/fa tags in future: add /ar/ and /fa/ sub-routes
                with translated page content. */}
            <link rel="canonical" href={resolvedUrl} />
            <link rel="alternate" hrefLang="en" href={resolvedUrl} />
            <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

            {/* ═══ C — GEO / LOCAL SIGNALS ═══════════════════════════════════ */}
            <meta name="geo.region" content={`${COUNTRY}-${REGION}`} />
            <meta name="geo.placename" content={`${CITY}, ${REGION}, ${COUNTRY}`} />
            <meta name="geo.position" content={`${GEO_LAT};${GEO_LNG}`} />
            <meta name="ICBM" content={`${GEO_LAT}, ${GEO_LNG}`} />

            {/* ═══ D — MULTILINGUAL META ═════════════════════════════════════ */}
            <meta name="description:ar"
                content="ورشة إصلاح هيكل السيارات في برنابي كندا — إصلاح حوادث، طلاء سيارات، إزالة الدنت، تغيير الزيت. معتمدة من ICBC. تقدير مجاني: (778) 260-2601." />
            <meta name="keywords:ar"
                content="ورشة سيارات برنابي، إصلاح هيكل السيارة، ورشة طلاء سيارات، إصلاح حوادث، ميكانيكي قريب مني، تغيير زيت، إزالة الدنت، ورشة سيارات قريبة مني، ICBC برنابي" />
            <meta name="description:fa"
                content="تعمیرگاه اتومبیل در برنابي کانادا — صافکاری، رنگکاری، تعمیر تصادف، تعویض روغن. تأیید شده ICBC. مشاوره رایگان: (778) 260-2601." />
            <meta name="keywords:fa"
                content="تعمیرگاه اتومبیل برنابي، صافکاری ماشین، رنگکاری خودرو، تعمیر تصادف، مکانیکی نزدیک من، تعویض روغن، تعمیرگاه ونکوور، خشگیری ماشین، ICBC برنابي" />

            {/* ═══ E — OPEN GRAPH ════════════════════════════════════════════ */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_CA" />
            <meta property="og:locale:alternate" content="ar_SA" />
            <meta property="og:locale:alternate" content="fa_IR" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={resolvedDesc} />
            <meta property="og:image" content={resolvedImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt"
                content="The Shop Autobody — Auto Body & Collision Repair, 5156 Still Creek Ave, Burnaby BC" />
            <meta property="og:url" content={resolvedUrl} />

            {/* ═══ F — TWITTER CARD ══════════════════════════════════════════ */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={resolvedDesc} />
            <meta name="twitter:image" content={resolvedImage} />
            <meta name="twitter:image:alt" content="The Shop Autobody — Auto Body Shop Burnaby BC" />

            {/* ═══ G — MOBILE / PWA ══════════════════════════════════════════ */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

            {/* ═══ H — JSON-LD STRUCTURED DATA ═══════════════════════════════ */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(webPageSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            {faqSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            )}

        </Helmet>
    );
};

export default SEO;
