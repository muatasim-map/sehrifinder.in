const fs = require('fs');
const path = require('path');

const dir = process.cwd();

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk(dir);
let changed = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const initial = content;
    content = content.replace(/\bfont-brand\b/g, 'font-serif');
    content = content.replace(/\bfont-landing-heading\b/g, 'font-serif');
    content = content.replace(/\bfont-landing-subhead\b/g, 'font-serif');
    content = content.replace(/\bfont-reem\b/g, 'font-serif');
    content = content.replace(/\bfont-landing-body\b/g, 'font-sans');
    content = content.replace(/\bfont-landing-accent\b/g, 'font-sans');

    if (initial !== content) {
        fs.writeFileSync(file, content);
        changed++;
    }
});

console.log('Modified', changed, 'files');
