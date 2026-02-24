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

    const distPath = path.resolve('dist');

    const prerenderer = new Prerenderer({
        staticDir: distPath,
        renderer: new PuppeteerRenderer({
            renderAfterTime: 15000,
            headless: true,
            maxConcurrentRoutes: 1,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
            consoleHandler: (route, message) => {
                console.log(`   [Browser:${route}] ${message.type().toUpperCase()}: ${message.text()}`);
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
        console.error('❌ Pre-render failed:', error);
        process.exit(1);
    } finally {
        await prerenderer.destroy();
    }
}

run();
