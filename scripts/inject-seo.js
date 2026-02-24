import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SEO_DATA_PATH = path.resolve('data/seoData.ts');

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

    // 1. Update Head Meta
    html = html.replace(/<title>.*?<\/title>/, `<title>${data.h1} | Sehri Finder</title>`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${data.h1} | Sehri Finder">`);
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${data.shortDescription}">`);
    html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${data.shortDescription}">`);

    // 2. Inject Static Content into #root
    // We inject a visible fallback that React will replace during hydration
    const staticContent = `
        <div id="seo-static-content" style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
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

    // Inject before the end of #root
    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticContent}</div>`);

    fs.writeFileSync(filePath, html);
    log(`Successfully injected SEO content into ${cityKey}`);
}

async function run() {
    log('Starting Static SEO Injection...');
    const seoData = parseSEOData();
    const cities = Object.keys(seoData);

    log(`Found ${cities.length} cities to process.`);

    for (const city of cities) {
        inject(city, seoData[city]);
    }

    log('Static SEO Injection complete!');
}

run().catch(err => {
    console.error('Injection failed:', err);
    process.exit(1);
});
