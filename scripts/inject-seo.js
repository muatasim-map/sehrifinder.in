import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SEO_DATA_PATH = path.resolve('data/seoData.ts');
const BASE_URL = 'https://www.sehrifinder.com';
const TODAY = new Date().toISOString().split('T')[0];

const CATEGORIES = ['free-community-meal', 'drive-thru', 'buffet', '24-hour', 'dessert', 'masjid'];

function getCategoryName(cat) {
    if (cat === 'free-community-meal' || cat === 'free') return 'Free Community Meals';
    if (cat === 'drive-thru') return 'Drive-Thrus';
    if (cat === 'buffet') return 'Buffets';
    if (cat === '24-hour' || cat === '24-hours') return '24-Hour Spots';
    if (cat === 'dessert' || cat === 'sweets') return 'Desserts';
    if (cat === 'masjid' || cat === 'mosque') return 'Masjids';
    return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function toSlug(str) {
    return str ? str.toLowerCase().trim().replace(/\s+/g, '-') : '';
}

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
            shortDescription: (block.match(/shortDescription:\s*"(.+?)"/) || [])[1],
            aiSummary: (block.match(/aiSummary:\s*"([\s\S]+?)"/) || [])[1]
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

        // Match aiFeaturePillars
        const pillarsSection = block.match(/aiFeaturePillars:\s*\[([\s\S]+?)\]/);
        if (pillarsSection) {
            const pillarMatches = pillarsSection[1].matchAll(/"(.+?)"/g);
            cityData.aiFeaturePillars = Array.from(pillarMatches).map(m => m[1]);
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
        },
        "dateModified": TODAY
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildItemListSchema(cityKey, data) {
    if (!data.featuredSpots || data.featuredSpots.length === 0) return '';
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Top Sehri & Suhoor Spots in ${data.city} 2026`,
        "itemListElement": data.featuredSpots.slice(0, 10).map((spot, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": spot,
            "url": `${BASE_URL}/find/${cityKey}`
        }))
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildDatasetSchema(cityKey, data) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": `Ramadan 2026 Suhoor Data - ${data.city}`,
        "description": `Comprehensive, community-verified dataset of late-night halal spots and mosque meals in ${data.city}.`,
        "url": `${BASE_URL}/find/${cityKey}`,
        "keywords": ["Ramadan 2026", data.city, "Suhoor", "Halal Food", "Community Data"],
        "isAccessibleForFree": true,
        "isBasedOn": {
            "@type": "CreativeWork",
            "name": "Sehri Finder Community Database"
        },
        "temporalCoverage": "2026-03-01/2026-04-01"
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildBreadcrumbSchema(cityKey, data) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Find Sehri", "item": `${BASE_URL}/find/chennai` },
            { "@type": "ListItem", "position": 3, "name": data.city, "item": `${BASE_URL}/find/${cityKey}` }
        ]
    };
    return `<script type="application/ld+json" id="breadcrumb-schema">${JSON.stringify(schema)}</script>`;
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

    // 1. Update Title & Meta Description (Clean title without emojis for SERP)
    const cleanTitle = `Find Sehri in ${data.city} 2026 | Sehri Finder`;
    html = html.replace(/<title>.*?<\/title>/, `<title>${cleanTitle}</title>`);
    html = html.replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${data.shortDescription}" />`);

    // 2. Update Canonical and OG URL to be city-specific
    const cityTitle = `Sehri Locations in ${data.city}`;
    const cityOgImage = isHome ? `${BASE_URL}/pwa-512x512.png` : `${BASE_URL}/api/og?title=${encodeURIComponent(cityTitle)}&subtitle=${encodeURIComponent(data.shortDescription)}&count=${data.featuredSpots?.length || '40+'}`;
    html = html.replace(/<link rel="canonical".*?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${data.shortDescription}">`);
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${cityOgImage}">`); // City-specific image
    html = html.replace(/<meta property="twitter:url" content=".*?">/, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="twitter:description"[\s\S]*?\/?>/, `<meta property="twitter:description" content="${data.shortDescription}">`);
    html = html.replace(/<meta property="twitter:image" content=".*?">/, `<meta property="twitter:image" content="${cityOgImage}">`);

    // Freshness Meta Tags
    html = html.replace('</head>', `  <meta name="last-modified" content="${TODAY}">\n  <meta property="article:modified_time" content="${TODAY}T00:00:00Z">\n</head>`);

    // 3. Inject FAQ & LocalBusiness structured data before </head>
    const faqSchema = buildFaqSchema(data.faqItems, data.city);
    const localBusinessSchema = buildLocalBusinessSchema(cityKey, data);
    const breadcrumbSchema = buildBreadcrumbSchema(cityKey, data);
    const itemListSchema = buildItemListSchema(cityKey, data);
    const datasetSchema = buildDatasetSchema(cityKey, data);
    html = html.replace('</head>', `${faqSchema}\n${localBusinessSchema}\n${breadcrumbSchema}\n${itemListSchema}\n${datasetSchema}\n</head>`);

    // 4. Inject visible static content into #root (for Googlebot)
    const staticContent = `
        <main id="seo-static-content" lang="en" style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
            <nav aria-label="Breadcrumb" style="font-size:0.85rem; margin-bottom:1rem; color:#6b7280;">
                <a href="${BASE_URL}" style="color:#064e3b;">Home</a> &rsaquo;
                <a href="${BASE_URL}/find/chennai" style="color:#064e3b;">Find Sehri</a> &rsaquo;
                <span>${data.city}</span>
            </nav>
            <article>
                <header>
                    <h1 style="font-size: 2.5rem; color: #064e3b; margin-bottom: 0.5rem;">${data.h1}</h1>
                    <p class="ai-summary" style="font-size: 1.1rem; line-height: 1.6; color: #374151; margin-bottom: 2rem; font-style: italic; border-left: 4px solid #d4af37; padding-left: 1rem;">
                        ${data.aiSummary}
                    </p>
                </header>

                <section aria-label="Fast Facts" style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h2 style="font-size: 1.25rem; color: #064e3b; margin-bottom: 1rem;">City Overview</h2>
                    <dl style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.5rem;">
                        <dt style="font-weight: bold;">Location</dt><dd>${data.city}</dd>
                        <dt style="font-weight: bold;">Coverage</dt><dd>${data.featuredSpots?.length || 40}+ Verified Spots</dd>
                        <dt style="font-weight: bold;">Verified For</dt><dd><time datetime="2026-03">Ramadan 2026</time></dd>
                        <dt style="font-weight: bold;">Status</dt><dd>Live Database</dd>
                    </dl>
                </section>

                <h2 style="font-size: 1.5rem; color: #065f46; margin-bottom: 1.5rem;">${data.h2}</h2>
                <p style="font-size: 1.1rem; line-height: 1.6; color: #374151; margin-bottom: 2rem;">${data.introText}</p>
                
                ${data.aiFeaturePillars ? `
                    <section aria-label="Key Highlights" style="margin-bottom: 2rem;">
                        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">AI Search Highlights</h3>
                        <ul class="ai-features" style="line-height: 1.8;">
                            ${data.aiFeaturePillars.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${data.featuredSpots ? `
                    <section aria-label="Famous Spots" style="margin-bottom: 2rem;">
                        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Notable Locations in ${data.city}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${data.featuredSpots.map(s => `<span style="background: #ecfdf5; color: #065f46; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.9rem;">${s}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                <section aria-label="Frequently Asked Questions">
                    <h3 style="font-size: 1.5rem; color: #065f46; margin-bottom: 1.5rem;">Direct Answers for Ramadan 2026</h3>
                    ${data.faqItems ? data.faqItems.map(f => `
                        <div style="margin-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem;">
                            <p style="font-size: 1.1rem; font-weight: bold; color: #064e3b;">${f.q}</p>
                            <p style="line-height: 1.6;">${f.a}</p>
                        </div>
                    `).join('') : ''}
                </section>
            </article>
            <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid #f3f4f6; font-size: 0.9rem; color: #6b7280;">
                <p>Data Source: Sehri Finder Community & Local Contributors. Verification: Independent manual review for Ramadan 2026.</p>
                <p>Last Technical Pass: <time datetime="${TODAY}">${TODAY}</time></p>
            </footer>
        </main>
    `;

    // Robust injection into #root
    const rootStartTag = '<div id="root">';
    const rootStartIndex = html.indexOf(rootStartTag);
    if (rootStartIndex !== -1) {
        // Find the matching closing </div> for #root
        // Since we know the structure is generally flat or we can just look for the NEXT </div> that is followed by </body> or similar
        // Or simpler: just replace everything between <div id="root"> and the NEXT </div> if we assume it was empty, 
        // OR if it has content, we need to find the REAL closing tag.

        // Given this is a build script, we can assume the #root div is the one we want to fill.
        // We'll look for the last </div> before </body> as a proxy if it's the main container, 
        // but let's just use a balanced tag approach or a unique marker if possible.

        // Let's try to match the first <div id="root">...</div> completely.
        const contentAfterRoot = html.substring(rootStartIndex + rootStartTag.length);

        // Find the index of the </div> that closes #root. 
        // If it was already injected, it ends with a </div> that is followed by </body> (usually).
        // Let's look for </div> followed by any whitespace and then <noscript> or </body>.
        const rootEndMatch = contentAfterRoot.match(/<\/div>\s*(?=<noscript|<\/body)/);

        if (rootEndMatch) {
            const rootEndIndex = rootEndMatch.index;
            const beforeRoot = html.substring(0, rootStartIndex + rootStartTag.length);
            const afterRoot = contentAfterRoot.substring(rootEndIndex);
            html = beforeRoot + staticContent + afterRoot;
        } else {
            // Fallback to simple replace if structure is simple
            html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticContent}</div>`);
        }
    }

    fs.writeFileSync(filePath, html);
    log(`Successfully injected SEO content into ${cityKey}`);
}

async function fetchSpots() {
    try {
        const vite = await import('vite');
        const env = vite.loadEnv('production', process.cwd(), '');
        const supabaseUrl = env.VITE_SUPABASE_URL;
        const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            log('Supabase env vars missing, skipping spot pre-rendering.');
            return [];
        }

        // Fetch using the REST API
        const res = await fetch(`${supabaseUrl}/rest/v1/spots?select=*`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (!res.ok) throw new Error(`Supabase fetch failed: ${res.statusText}`);
        return await res.json();
    } catch (e) {
        log(`Error fetching spots: ${e.message}`);
        return [];
    }
}

function injectSpot(spot) {
    const spotName = spot.venue_name;
    const city = spot.city || 'Unknown';
    const slug = `${spot.location_id}-${toSlug(spotName)}`;
    const targetDir = path.join(DIST_DIR, 'spot', slug);
    const filePath = path.join(targetDir, 'index.html');
    const sourcePath = path.join(DIST_DIR, 'index.html');

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    if (!fs.existsSync(sourcePath)) {
        log(`ERROR: Source index.html not found for spot: ${spotName}`);
        return null;
    }

    let html = fs.readFileSync(sourcePath, 'utf8');

    const canonicalUrl = `${BASE_URL}/spot/${slug}`;
    const cleanTitle = `${spotName} - Sehri & Suhoor in ${city} | Sehri Finder`;
    const description = `Find Sehri at ${spotName} in ${city}. Verified Ramadan 2026 timings, location, and details.`;
    const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(spotName.slice(0, 50))}&subtitle=${encodeURIComponent(`${city} • Ramadan Updates`)}&count=LIVE`;

    html = html.replace(/<title>.*?<\/title>/, `<title>${cleanTitle}</title>`);
    html = html.replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`);
    html = html.replace(/<link rel="canonical".*?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${description}">`);
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${ogImage}">`);
    html = html.replace(/<meta property="twitter:url" content=".*?">/, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="twitter:description"[\s\S]*?\/?>/, `<meta property="twitter:description" content="${description}">`);
    html = html.replace(/<meta property="twitter:image" content=".*?">/, `<meta property="twitter:image" content="${ogImage}">`);

    // Freshness Meta Tags
    html = html.replace('</head>', `  <meta name="last-modified" content="${TODAY}">\n  <meta property="article:modified_time" content="${TODAY}T00:00:00Z">\n</head>`);

    const restaurantSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": spotName,
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": spot.primary_area,
            "addressRegion": city
        }
    };
    if (spot.latitude && spot.longitude) {
        restaurantSchema.geo = {
            "@type": "GeoCoordinates",
            "latitude": spot.latitude,
            "longitude": spot.longitude
        };
    }
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Find Sehri", "item": `${BASE_URL}/find` },
            { "@type": "ListItem", "position": 3, "name": city, "item": `${BASE_URL}/find/${toSlug(city)}` },
            { "@type": "ListItem", "position": 4, "name": spotName, "item": canonicalUrl }
        ]
    };

    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(restaurantSchema)}</script>\n<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n</head>`);

    const staticContent = `
        <main id="seo-static-content" lang="en" style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
            <nav aria-label="Breadcrumb" style="font-size:0.85rem; margin-bottom:1rem; color:#6b7280;">
                <a href="${BASE_URL}" style="color:#064e3b;">Home</a> &rsaquo;
                <a href="${BASE_URL}/find" style="color:#064e3b;">Find Sehri</a> &rsaquo;
                <a href="${BASE_URL}/find/${toSlug(city)}" style="color:#064e3b;">${city}</a> &rsaquo;
                <span>${spotName}</span>
            </nav>
            <article>
                <header>
                    <h1 style="font-size: 2.5rem; color: #064e3b; margin-bottom: 0.5rem;">${spotName}</h1>
                    <p class="ai-summary" style="font-size: 1.1rem; line-height: 1.6; color: #374151; font-style: italic; border-left: 4px solid #d4af37; padding-left: 1rem;">
                        ${description}
                    </p>
                </header>
                <section style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-top: 2rem;">
                    <dl style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.5rem;">
                        <dt style="font-weight: bold;">City</dt><dd>${city}</dd>
                        <dt style="font-weight: bold;">Area</dt><dd>${spot.primary_area}</dd>
                        <dt style="font-weight: bold;">Type</dt><dd>${spot.venue_type || 'Food Spot'}</dd>
                        <dt style="font-weight: bold;">Food</dt><dd>${spot.food_type || 'Variant'}</dd>
                        <dt style="font-weight: bold;">Timing</dt><dd>${spot.timing?.start || ''} - ${spot.timing?.end || ''}</dd>
                    </dl>
                </section>
            </article>
        </main>
    `;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticContent}</div>`);

    fs.writeFileSync(filePath, html);
    return canonicalUrl;
}

function injectCategory(cityKey, data, category) {
    const isHome = cityKey === 'index';
    if (isHome) return null; // No categories for root index

    const catName = getCategoryName(category);
    const targetDir = path.join(DIST_DIR, 'find', cityKey, category);
    const filePath = path.join(targetDir, 'index.html');
    const sourcePath = path.join(DIST_DIR, 'index.html');

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    if (!fs.existsSync(sourcePath)) return null;

    let html = fs.readFileSync(sourcePath, 'utf8');

    const canonicalUrl = `${BASE_URL}/find/${cityKey}/${category}`;
    const cleanTitle = `${catName} for Sehri in ${data.city} 2026 | Sehri Finder`;
    const description = `Find the best ${catName.toLowerCase()} for Sehri and Suhoor in ${data.city}. Verified Ramadan 2026 timings and locations.`;
    const aiSummary = `This directory lists verified ${catName.toLowerCase()} available for Sehri and Suhoor in ${data.city} during Ramadan 2026. Explore community-sourced data for reliable late-night food options and prayer timings.`;
    const categoryOgImage = `${BASE_URL}/api/og?title=${encodeURIComponent(`${catName} in ${data.city}`)}&subtitle=${encodeURIComponent('Verified Ramadan 2026 Locations')}&count=LIVE`;

    html = html.replace(/<title>.*?<\/title>/, `<title>${cleanTitle}</title>`);
    html = html.replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`);
    html = html.replace(/<link rel="canonical".*?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${description}">`);
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${categoryOgImage}">`);
    html = html.replace(/<meta property="twitter:url" content=".*?">/, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="twitter:description"[\s\S]*?\/?>/, `<meta property="twitter:description" content="${description}">`);
    html = html.replace(/<meta property="twitter:image" content=".*?">/, `<meta property="twitter:image" content="${categoryOgImage}">`);

    // Freshness Meta Tags
    html = html.replace('</head>', `  <meta name="last-modified" content="${TODAY}">\n  <meta property="article:modified_time" content="${TODAY}T00:00:00Z">\n</head>`);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Top ${catName} for Sehri in ${data.city}`,
        "description": description,
        "url": canonicalUrl
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Find Sehri", "item": `${BASE_URL}/find` },
            { "@type": "ListItem", "position": 3, "name": data.city, "item": `${BASE_URL}/find/${cityKey}` },
            { "@type": "ListItem", "position": 4, "name": catName, "item": canonicalUrl }
        ]
    };

    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n</head>`);

    const staticContent = `
        <main id="seo-static-content" lang="en" style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
            <nav aria-label="Breadcrumb" style="font-size:0.85rem; margin-bottom:1rem; color:#6b7280;">
                <a href="${BASE_URL}" style="color:#064e3b;">Home</a> &rsaquo;
                <a href="${BASE_URL}/find" style="color:#064e3b;">Find Sehri</a> &rsaquo;
                <a href="${BASE_URL}/find/${cityKey}" style="color:#064e3b;">${data.city}</a> &rsaquo;
                <span>${catName}</span>
            </nav>
            <article>
                <header>
                    <h1 style="font-size: 2.5rem; color: #064e3b; margin-bottom: 0.5rem;">${catName} for Sehri in ${data.city}</h1>
                    <p class="ai-summary" style="font-size: 1.1rem; line-height: 1.6; color: #374151; font-style: italic; border-left: 4px solid #d4af37; padding-left: 1rem;">
                        ${aiSummary}
                    </p>
                </header>
                <section style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-top: 2rem;">
                    <p style="margin: 0; font-size: 1.1rem;">Search intent mapped for: <strong>${category} in ${data.city}</strong>.</p>
                </section>
            </article>
        </main>
    `;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticContent}</div>`);

    fs.writeFileSync(filePath, html);
    return canonicalUrl;
}

function generateSitemap(seoData, spotUrls = [], categoryUrls = []) {
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

  <!-- Spot Pages (${spotUrls.length} spots) -->
${spotUrls.map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}

  <!-- Category Pages (${categoryUrls.length} pages) -->
${categoryUrls.map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')}

</urlset>`;

    // Write to both dist and public
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap);
    log(`Generated sitemap.xml with ${cityKeys.length + 2 + spotUrls.length + categoryUrls.length} URLs`);
}

async function run() {
    log('Starting Static SEO Injection + Sitemap Generation...');
    const seoData = parseSEOData();
    const cities = Object.keys(seoData);

    log(`Found ${cities.length} cities to process.`);
    const categoryUrls = [];

    for (const city of cities) {
        inject(city, seoData[city]);

        // Generate Category Pages
        if (city !== 'index') {
            for (const cat of CATEGORIES) {
                const url = injectCategory(city, seoData[city], cat);
                if (url) categoryUrls.push(url);
            }
        }
    }

    const spots = await fetchSpots();
    log(`Fetched ${spots.length} spots for pre-rendering`);
    const spotUrls = [];
    for (const spot of spots) {
        if (spot.location_id && spot.venue_name) {
            const url = injectSpot(spot);
            if (url) spotUrls.push(url);
        }
    }

    generateSitemap(seoData, spotUrls, categoryUrls);
    log('All done! SEO injection and sitemap generation complete.');
}

run().catch(err => {
    console.error('Injection failed:', err);
    process.exit(1);
});
