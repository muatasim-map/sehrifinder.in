import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SEO_DATA_PATH = path.resolve('data/seoData.ts');
const BASE_URL = 'https://www.sehrifinder.com';
const TODAY = new Date().toISOString().split('T')[0];

function log(msg) {
    console.log(`[SEO-INJECT] ${msg}`);
}

// Simplified parser for seoData.ts
function parseSEOData() {
    const content = fs.readFileSync(SEO_DATA_PATH, 'utf8');
    const data = {};

    // Match city blocks: "key: { ... }" with stronger end detection
    const cityRegex = /["']?([\w-]+)["']?:\s*\{([\s\S]+?)\n\s{4}\}/g;
    let match;

    while ((match = cityRegex.exec(content)) !== null) {
        const cityKey = match[1];
        const block = match[2];

        const cityData = {
            city: (block.match(/city:\s*"(.+?)"/) || [])[1],
            h1: (block.match(/h1:\s*"(.+?)"/) || [])[1],
            h2: (block.match(/h2:\s*"(.+?)"/) || [])[1],
            introText: (block.match(/introText:\s*"([\s\S]+?)"/) || [])[1],
            shortDescription: (block.match(/shortDescription:\s*"(.+?)"/) || [])[1]
        };

        // Match FAQ items
        const faqSection = block.match(/faqItems:\s*\[([\s\S]+?)\]/);
        if (faqSection) {
            const faqMatches = faqSection[1].matchAll(/\{\s*q:\s*"(.+?)",\s*a:\s*"(.+?)"\s*\}/g);
            cityData.faqItems = Array.from(faqMatches).map(m => ({ q: m[1], a: m[2] }));
        }

        // Match Featured Spots
        const spotsSection = block.match(/featuredSpots:\s*\[([\s\S]+?)\]/);
        if (spotsSection) {
            const spotMatches = spotsSection[1].matchAll(/"(.+?)"/g);
            cityData.featuredSpots = Array.from(spotMatches).map(m => m[1]);
        }

        data[cityKey] = cityData;
    }

    return data;
}

function buildFaqSchema(faqItems, cityName) {
    if (!faqItems || faqItems.length === 0) return '';
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildLocalBusinessSchema(cityKey, data) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Sehri Finder - ${data.city}`,
        "description": data.shortDescription,
        "url": `${BASE_URL}/find/${cityKey}`,
        "areaServed": {
            "@type": "City",
            "name": data.city
        },
        "provider": {
            "@type": "Organization",
            "name": "Sehri Finder",
            "url": BASE_URL
        }
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function inject(cityKey, data) {
    const isHome = cityKey === 'index';
    const cityDir = isHome ? '' : `find/${cityKey}`;
    const targetDir = path.join(DIST_DIR, cityDir);
    const filePath = path.join(targetDir, 'index.html');
    const sourcePath = path.join(DIST_DIR, 'index.html');

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        log(`Created directory: ${targetDir}`);
    }

    // Copy base index.html if the target doesn't exist (e.g. pre-render failed)
    if (!fs.existsSync(filePath)) {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, filePath);
            log(`Copied base index.html to ${filePath}`);
        } else {
            log(`ERROR: Source index.html not found at ${sourcePath}`);
            return;
        }
    }

    let html = fs.readFileSync(filePath, 'utf8');

    const canonicalUrl = `${BASE_URL}/find/${cityKey}`;

    // 1. Update Title & Meta Description
    html = html.replace(/<title>.*?<\/title>/, `<title>${data.h1} | Sehri Finder</title>`);
    html = html.replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${data.shortDescription}" />`);

    // 2. Update Canonical and OG URL to be city-specific
    html = html.replace(/<link rel="canonical".*?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${data.h1} | Sehri Finder">`);
    html = html.replace(/<meta property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${data.shortDescription}">`);
    html = html.replace(/<meta property="twitter:url" content=".*?">/, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${data.h1} | Sehri Finder">`);
    html = html.replace(/<meta property="twitter:description"[\s\S]*?\/?>/, `<meta property="twitter:description" content="${data.shortDescription}">`);

    // 3. Inject FAQ & LocalBusiness structured data before </head>
    const faqSchema = buildFaqSchema(data.faqItems, data.city);
    const localBusinessSchema = buildLocalBusinessSchema(cityKey, data);
    html = html.replace('</head>', `${faqSchema}\n${localBusinessSchema}\n</head>`);

    // 4. Inject visible static content into #root (for Googlebot)
    const staticContent = `
        <div id="seo-static-content" style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
            <nav aria-label="Breadcrumb" style="font-size:0.85rem; margin-bottom:1rem; color:#6b7280;">
                <a href="${BASE_URL}" style="color:#064e3b;">Home</a> &rsaquo;
                <a href="${BASE_URL}/find/chennai" style="color:#064e3b;">Find Sehri</a> &rsaquo;
                <span>${data.city}</span>
            </nav>
            <h1 style="font-size: 2.5rem; color: #064e3b; margin-bottom: 1rem;">${data.h1}</h1>
            <h2 style="font-size: 1.5rem; color: #065f46; margin-bottom: 1.5rem;">${data.h2}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; color: #374151; margin-bottom: 2rem;">${data.introText}</p>
            
            ${data.featuredSpots ? `
                <section style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Famous Verified Spots</h3>
                    <ul>
                        ${data.featuredSpots.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section>
                <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Frequently Asked Questions</h3>
                ${data.faqItems ? data.faqItems.map(f => `
                    <div style="margin-bottom: 1rem;">
                        <p><strong>${f.q}</strong></p>
                        <p>${f.a}</p>
                    </div>
                `).join('') : ''}
            </section>
        </div>
    `;

    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticContent}</div>`);
    // Also handle if root already has content
    html = html.replace(/<div id="root">(?!.*seo-static-content)([\s\S]*?)<\/div>/, `<div id="root">${staticContent}</div>`);

    fs.writeFileSync(filePath, html);
    log(`Successfully injected SEO content into ${cityKey}`);
}

function generateSitemap(seoData) {
    const cityKeys = Object.keys(seoData);
    const cityUrls = cityKeys.map(cityKey => `  <url>
    <loc>${BASE_URL}/find/${cityKey}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Core Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/submit</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- City Pages (${cityKeys.length} cities) -->
${cityUrls}

</urlset>`;

    // Write to both dist and public
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap);
    log(`Generated sitemap.xml with ${cityKeys.length + 2} URLs`);
}

async function run() {
    log('Starting Static SEO Injection + Sitemap Generation...');
    const seoData = parseSEOData();
    const cities = Object.keys(seoData);

    log(`Found ${cities.length} cities to process.`);

    for (const city of cities) {
        inject(city, seoData[city]);
    }

    generateSitemap(seoData);
    log('All done! SEO injection and sitemap generation complete.');
}

run().catch(err => {
    console.error('Injection failed:', err);
    process.exit(1);
});
