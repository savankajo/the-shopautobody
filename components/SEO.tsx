import React from ‘react’;
import { Helmet } from ‘react-helmet-async’;

interface SEOProps {
title?: string;
description?: string;
keywords?: string;
image?: string;
url?: string;
pageType?: ‘home’ | ‘service’ | ‘about’ | ‘contact’;
}

const SEO: React.FC<SEOProps> = ({
title,
description,
keywords,
image,
url,
pageType = ‘home’,
}) => {
// ─── Site-wide constants ──────────────────────────────────────────────────
const SITE_NAME        = “The Shop Autobody”;
const SITE_URL         = “https://theshopautobody.com”;
const PHONE            = “+17782602601”;
const PHONE_CELL       = “+17782602600”;
const EMAIL            = “info@theshopautobody.com”;
const STREET           = “5156 Still Creek Ave”;
const CITY             = “Burnaby”;
const REGION           = “BC”;
const POSTAL           = “V5C 4E4”;
const COUNTRY          = “CA”;
const GEO_LAT          = “49.2488”;
const GEO_LNG          = “-122.9805”;
const DEFAULT_IMAGE    = `${SITE_URL}/og-image.jpg`; // ← ensure this file exists

```
// ─── Default keywords (exhaustive local + intent coverage) ───────────────
const BASE_KEYWORDS = [
    // Brand
    "The Shop Autobody", "the shop auto body", "theshopautobody",
    // Core service – autobody
    "auto body shop", "autobody shop", "auto body repair", "autobody repair",
    "collision repair", "collision center",
    // Near-me intent
    "auto body shop near me", "autobody shop near me",
    "collision repair near me", "car body shop near me",
    // Local – Burnaby
    "auto body shop Burnaby", "autobody Burnaby BC",
    "collision repair Burnaby", "car repair Burnaby BC",
    "auto paint Burnaby", "dent repair Burnaby",
    // Adjacent searches users make
    "mechanic near me", "mechanic shop near me",
    "car fix near me", "car repair near me",
    "oil change near me", "oil change Burnaby",
    "car scratch repair", "dent removal",
    "fender repair", "bumper repair",
    "paintless dent repair", "ICBC accredited shop",
    "ICBC repair Burnaby", "insurance claim auto body",
    // Vancouver metro
    "auto body shop Vancouver", "auto body shop Metro Vancouver",
    "car body repair Burnaby", "vehicle repair Burnaby",
].join(', ');

// ─── Per-page defaults ────────────────────────────────────────────────────
const pageDefaults: Record<
    NonNullable<SEOProps['pageType']>,
    { title: string; description: string; keywords: string }
> = {
    home: {
        title: "Auto Body Shop Burnaby BC | Collision Repair & Paint",
        description:
            "The Shop Autobody — Burnaby's trusted auto body & collision repair shop. " +
            "Expert dent removal, car painting, scratch repair & oil changes near you. " +
            "ICBC accredited. Call for a free estimate today.",
        keywords:
            "auto body shop Burnaby, autobody near me, collision repair Burnaby, " +
            "car repair near me, mechanic near me, oil change near me",
    },
    service: {
        title: "Auto Body & Collision Repair Services | Burnaby BC",
        description:
            "Full-service auto body repairs in Burnaby BC — collision repair, " +
            "dent removal, car painting, scratch repair, bumper repair & oil changes. " +
            "Serving Burnaby, Vancouver & Metro Vancouver.",
        keywords:
            "collision repair, dent removal, auto painting, scratch repair, " +
            "bumper repair, oil change Burnaby",
    },
    about: {
        title: "About The Shop Autobody | Burnaby's Local Auto Body Experts",
        description:
            "Learn about The Shop Autobody — Burnaby BC's experienced collision " +
            "repair and auto body team. Trusted by drivers across Metro Vancouver " +
            "for quality repairs, honest estimates & fast turnarounds.",
        keywords:
            "about The Shop Autobody, local auto body shop, trusted mechanic Burnaby",
    },
    contact: {
        title: "Contact Us | Auto Body Shop in Burnaby BC",
        description:
            "Get in touch with The Shop Autobody in Burnaby BC. Request a free " +
            "estimate for collision repair, dent removal, auto painting or oil " +
            "changes. Find us near you in Metro Vancouver.",
        keywords:
            "contact auto body shop Burnaby, free estimate collision repair, " +
            "auto body shop near me",
    },
};

const resolvedTitle       = title       || pageDefaults[pageType].title;
const resolvedDescription = description || pageDefaults[pageType].description;
const resolvedKeywords    = `${BASE_KEYWORDS}, ${pageDefaults[pageType].keywords}${keywords ? ', ' + keywords : ''}`;
const resolvedImage       = image  || DEFAULT_IMAGE;
const resolvedUrl         = url    || SITE_URL;
const fullTitle           = `${resolvedTitle} | ${SITE_NAME}`;

// ─── JSON-LD: LocalBusiness + AutoBodyShop ────────────────────────────────
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoBodyShop", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": resolvedImage,
    "description":
        "The Shop Autobody is a full-service auto body and collision repair shop " +
        "in Burnaby, BC serving Metro Vancouver. Services include collision repair, " +
        "dent removal, auto painting, scratch repair, bumper repair, and oil changes.",
    "telephone": PHONE,
    "email": EMAIL,
    "contactPoint": [
        { "@type": "ContactPoint", "telephone": PHONE,      "contactType": "customer service" },
        { "@type": "ContactPoint", "telephone": PHONE_CELL, "contactType": "customer service" },
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
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
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
    "areaServed": [
        { "@type": "City", "name": "Burnaby" },
        { "@type": "City", "name": "Vancouver" },
        { "@type": "City", "name": "North Vancouver" },
        { "@type": "City", "name": "New Westminster" },
        { "@type": "City", "name": "Coquitlam" },
        { "@type": "City", "name": "Surrey" },
    ],
    "serviceType": [
        "Auto Body Repair",
        "Collision Repair",
        "Dent Removal",
        "Paintless Dent Repair",
        "Auto Painting",
        "Car Scratch Repair",
        "Bumper Repair",
        "Fender Repair",
        "Oil Change",
        "ICBC Repair",
    ],
    "paymentAccepted": "Cash, Credit Card, Debit, ICBC Direct Repair",
    "currenciesAccepted": "CAD",
    "priceRange": "$$",
    "sameAs": [
        // Add your actual social/directory profiles:
        // "https://www.facebook.com/theshopautobody",
        // "https://www.instagram.com/theshopautobody",
        // "https://www.google.com/maps?cid=YOUR_CID",
        // "https://www.yelp.ca/biz/the-shop-autobody-burnaby",
    ],
};

// ─── JSON-LD: WebSite + Sitelinks Searchbox ───────────────────────────────
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": SITE_NAME,
    "description": pageDefaults.home.description,
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
    },
};

// ─── JSON-LD: BreadcrumbList (dynamic per page) ───────────────────────────
const breadcrumbMap: Record<NonNullable<SEOProps['pageType']>, { name: string; url: string }[]> = {
    home:    [{ name: "Home", url: SITE_URL }],
    service: [{ name: "Home", url: SITE_URL }, { name: "Services", url: `${SITE_URL}/#/service` }],
    about:   [{ name: "Home", url: SITE_URL }, { name: "About Us", url: `${SITE_URL}/#/about-us` }],
    contact: [{ name: "Home", url: SITE_URL }, { name: "Contact",  url: `${SITE_URL}/#/contact` }],
};
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbMap[pageType].map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": item.url,
    })),
};

// ─── JSON-LD: FAQPage (home page only – boosts rich results) ─────────────
const faqSchema = pageType === 'home' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where is The Shop Autobody located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Shop Autobody is located at 5156 Still Creek Ave, Burnaby, BC V5C 4E4. We serve Burnaby and all of Metro Vancouver.",
            },
        },
        {
            "@type": "Question",
            "name": "Do you do ICBC collision repairs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, The Shop Autobody is an ICBC accredited auto body shop. We handle all ICBC claims and direct repair work in Burnaby, BC.",
            },
        },
        {
            "@type": "Question",
            "name": "Do you offer oil changes near Burnaby?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer oil changes and general maintenance services at our Burnaby auto body shop. Contact us to book an appointment.",
            },
        },
        {
            "@type": "Question",
            "name": "How do I get a free estimate for auto body repair?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply visit our contact page at theshopautobody.com or call us to schedule a free, no-obligation estimate for any collision repair, dent removal, or auto painting service.",
            },
        },
    ],
} : null;

return (
    <Helmet>
        {/* ── Primary metadata ───────────────────────────────────────── */}
        <html lang="en" />
        <title>{fullTitle}</title>
        <meta name="description"            content={resolvedDescription} />
        <meta name="keywords"               content={resolvedKeywords} />
        <meta name="robots"                 content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author"                 content={SITE_NAME} />
        <meta name="theme-color"            content="#c0392b" />

        {/* ── Canonical ─────────────────────────────────────────────── */}
        <link rel="canonical" href={resolvedUrl} />

        {/* ── Geo / local signals ───────────────────────────────────── */}
        <meta name="geo.region"             content={`${COUNTRY}-${REGION}`} />
        <meta name="geo.placename"          content={`${CITY}, ${REGION}`} />
        <meta name="geo.position"           content={`${GEO_LAT};${GEO_LNG}`} />
        <meta name="ICBM"                   content={`${GEO_LAT}, ${GEO_LNG}`} />

        {/* ── Open Graph ────────────────────────────────────────────── */}
        <meta property="og:type"            content="website" />
        <meta property="og:site_name"       content={SITE_NAME} />
        <meta property="og:locale"          content="en_CA" />
        <meta property="og:title"           content={fullTitle} />
        <meta property="og:description"     content={resolvedDescription} />
        <meta property="og:image"           content={resolvedImage} />
        <meta property="og:image:width"     content="1200" />
        <meta property="og:image:height"    content="630" />
        <meta property="og:image:alt"       content={`${SITE_NAME} – Auto Body Shop Burnaby BC`} />
        <meta property="og:url"             content={resolvedUrl} />

        {/* ── Twitter Card ──────────────────────────────────────────── */}
        <meta name="twitter:card"           content="summary_large_image" />
        <meta name="twitter:title"          content={fullTitle} />
        <meta name="twitter:description"    content={resolvedDescription} />
        <meta name="twitter:image"          content={resolvedImage} />
        <meta name="twitter:image:alt"      content={`${SITE_NAME} – Auto Body Shop Burnaby BC`} />

        {/* ── Mobile / PWA ──────────────────────────────────────────── */}
        <meta name="viewport"               content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable"         content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title"           content={SITE_NAME} />

        {/* ── Structured Data ───────────────────────────────────────── */}
        <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
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
```

};

export default SEO;