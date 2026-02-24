import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const fs = require('fs');
const Prerenderer = require('@prerenderer/prerenderer');
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');

const routes = [
    '/',
    '/submit',
    '/find/chennai',
    '/find/bengaluru',
    '/find/mumbai',
    '/find/hyderabad',
    '/find/london',
    '/find/new-york',
    '/find/san-francisco',
    '/find/chicago',
    '/find/houston',
    '/find/detroit',
    '/find/toronto',
    '/find/edmonton',
    '/find/montreal',
    '/find/brampton',
    '/find/calgary',
    '/find/ottawa',
    '/find/cambridge',
    '/find/kanata',
    '/find/kuala-lumpur'
];

async function run() {
    console.log('🚀 Starting comprehensive manual pre-render...');

    const distPath = path.resolve('dist').replace(/\\/g, '/');
    console.log(`🚀 Using distPath: ${distPath}`);

    const prerenderer = new Prerenderer({
        staticDir: distPath,
        renderer: new PuppeteerRenderer({
            renderAfterElementExists: '#root[data-prerender-status="ready"]',
            renderAfterTime: 20000,
            headless: true,
            maxConcurrentRoutes: 1,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-web-security'],
            consoleHandler: (route, message) => {
                const type = message.type().toUpperCase();
                const text = message.text();
                console.log(`   [Browser:${route}] ${type}: ${text}`);
                if (type === 'ERROR') {
                    console.error(`   [Browser:${route}] CRITICAL ERROR: ${text}`);
                }
            }
        })
    });

    try {
        await prerenderer.initialize();

        console.log('✅ Initialized. Starting render of', routes.length, 'routes...');

        const renderedRoutes = await prerenderer.renderRoutes(routes);

        console.log('✅ Rendering complete. Writing files...');

        for (const route of renderedRoutes) {
            const routePath = route.route === '/' ? 'index.html' : path.join(route.route.substring(1), 'index.html');
            const fullPath = path.join(distPath, routePath);
            const dir = path.dirname(fullPath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(fullPath, route.html);
            console.log(`   📄 Wrote: ${routePath} (${route.html.length} bytes)`);
        }

        console.log('✨ Simplified pre-render complete!');
    } catch (error) {
        console.error('❌ Pre-render failed partially:', error);
        // Do not exit 1, let the build continue so inject-seo can run
    } finally {
        await prerenderer.destroy();
    }
}

run();
