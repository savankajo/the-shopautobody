import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const site = {
  name: 'The Shop Autobody',
  url: 'https://theshopautobody.com',
  phone: '+17782602601',
  displayPhone: '+1 (778) 260 2601',
  email: 'info@theshopautobody.com',
  address: {
    street: '5156 Still Creek Ave',
    city: 'Burnaby',
    region: 'BC',
    postal: 'V5C 4E4',
    country: 'CA',
  },
  image: 'https://res.cloudinary.com/dyjffxbef/image/upload/v1761022109/generate_a_photo_of_a_nice_car_preferably_a_porsche_as_a_cover_photo_for_an_autobody_website_e30rcr.jpg',
  logo: 'https://res.cloudinary.com/dyjffxbef/image/upload/v1767072305/IMG_3835_mqieeq.png',
};

const pages = [
  {
    route: '/',
    output: 'index.html',
    title: 'Auto Body Shop Burnaby BC | Collision Repair, Dent & Paint | The Shop Autobody',
    description: 'The Shop Autobody is a Burnaby collision repair and auto body shop at 5156 Still Creek Ave. Expert dent removal, car painting, scratch repair, oil changes, and free estimates.',
    keywords: 'auto body shop Burnaby, collision repair Burnaby BC, dent removal Burnaby, car painting Burnaby, ICBC repair Burnaby',
  },
  {
    route: '/service',
    output: 'service/index.html',
    title: 'Auto Body Services | Collision Repair & Paint Burnaby BC | The Shop Autobody',
    description: 'Explore collision repair, dent removal, auto painting, scratch repair, bumper repair, oil changes, brake service, wrap, and tint services in Burnaby BC.',
    keywords: 'collision repair Burnaby, auto painting Burnaby, bumper repair Burnaby, paintless dent repair, oil change Burnaby BC',
  },
  {
    route: '/about-us',
    output: 'about-us/index.html',
    title: 'About The Shop Autobody | Burnaby Auto Body Experts',
    description: 'Meet The Shop Autobody, a Burnaby auto body team focused on careful collision repair, precise paint work, honest estimates, and organized service.',
    keywords: 'about The Shop Autobody, trusted auto body shop Burnaby, local collision repair Burnaby, ICBC auto body Burnaby',
  },
  {
    route: '/contact',
    output: 'contact/index.html',
    title: 'Contact The Shop Autobody | Free Estimate Burnaby BC',
    description: 'Contact The Shop Autobody at 5156 Still Creek Ave, Burnaby BC. Call +1 (778) 260 2601 or request a free estimate for collision repair, paint, dents, or service.',
    keywords: 'contact auto body shop Burnaby, free estimate collision repair, auto body shop near me, Burnaby car repair contact',
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function pageUrl(route) {
  return `${site.url}${route === '/' ? '/' : route}`;
}

function schemaFor(page) {
  const url = pageUrl(page.route);
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['AutoBodyShop', 'LocalBusiness'],
      '@id': `${site.url}/#business`,
      name: site.name,
      url: site.url,
      logo: site.logo,
      image: site.image,
      telephone: site.phone,
      email: site.email,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postal,
        addressCountry: site.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.2488,
        longitude: -122.9805,
      },
      areaServed: ['Burnaby', 'Metro Vancouver', 'Vancouver', 'New Westminster', 'Coquitlam'],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '15:00' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Auto body and collision repair services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Collision Repair' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paint & Color Matching' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dent & Scratch Repair' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bumper & Panel Replacement' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: site.url },
      about: { '@id': `${site.url}/#business` },
    },
  ];
}

function seoBlock(page) {
  const url = pageUrl(page.route);
  const tags = [
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}">`,
    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">',
    '<meta name="author" content="The Shop Autobody">',
    '<meta name="geo.region" content="CA-BC">',
    '<meta name="geo.placename" content="Burnaby, BC, CA">',
    '<meta name="geo.position" content="49.24880;-122.98050">',
    '<meta name="ICBM" content="49.24880, -122.98050">',
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(url)}">`,
    `<link rel="alternate" hreflang="x-default" href="${site.url}/">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="The Shop Autobody">',
    '<meta property="og:locale" content="en_CA">',
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:image" content="${escapeHtml(site.image)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="The Shop Autobody collision repair shop in Burnaby BC">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(site.image)}">`,
    `<script type="application/ld+json">${JSON.stringify(schemaFor(page))}</script>`,
  ];

  return `\n  ${tags.join('\n  ')}\n`;
}

function withStaticSeo(template, page) {
  const title = `<title>${escapeHtml(page.title)}</title>`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/, () => `${title}${seoBlock(page)}`)
    .replace('<html lang="en">', '<html lang="en-CA">');
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

for (const page of pages) {
  const html = withStaticSeo(template, page);
  const outputPath = path.join(dist, page.output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}
