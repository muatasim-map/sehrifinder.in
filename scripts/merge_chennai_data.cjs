const fs = require('fs');
const path = require('path');

// Helper to parse TS file content (simple eval extraction)
function parseTsFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove imports
    content = content.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    // Remove types
    content = content.replace(/:\s*RawSehriSpot\[\]/g, '');
    // Replace export const with const local
    content = content.replace(/export\s+const\s+(\w+)\s*=/, 'const data =');

    try {
        return eval(content + '; data;');
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e.message);
        return [];
    }
}

const masterPath = 'data/chennai.ts';
const oldPath = 'data/chennai_2026.ts';

const masterData = parseTsFile(masterPath);
const oldData = parseTsFile(oldPath);

console.log(`Master Count (Before): ${masterData.length}`);
console.log(`Old 2026 Count: ${oldData.length}`);

// Merge Logic
let addedCount = 0;
const masterIds = new Set(masterData.map(s => s.location_id));
const masterNames = new Set(masterData.map(s => s.venue_name.toLowerCase().trim()));

// Ensure master data has city
masterData.forEach(s => {
    if (!s.city) s.city = 'Chennai';
});

for (const spot of oldData) {
    // Check by ID
    if (masterIds.has(spot.location_id)) {
        continue;
    }

    // Check by Name (Fuzzy)
    const normalizedName = spot.venue_name.toLowerCase().trim();
    if (masterNames.has(normalizedName)) {
        console.log(`Skipping dup by name: ${spot.venue_name}`);
        continue;
    }

    // It's new!
    // Enforce default fields
    if (!spot.city) spot.city = 'Chennai';
    if (!spot.last_verified) spot.last_verified = '2026';
    if (!spot.country) spot.country = 'India'; // Just in case

    // Ensure address fallback
    if (!spot.address && spot.landmark) spot.address = spot.landmark;
    if (!spot.address) spot.address = `${spot.primary_area}, Chennai`;

    // Assign a new ID if it conflicts (though we checked Ids, but let's be safe if old has conflicting IDs with new range)
    // Actually, let's keep original ID if unique, otherwise find new one? 
    // The user's list has IDs like 1, 2, 3... 100+.
    // Old list has 101, 102...
    // Let's just push it.

    masterData.push(spot);
    masterIds.add(spot.location_id);
    masterNames.add(normalizedName);
    addedCount++;
}

console.log(`Added ${addedCount} missing spots.`);
console.log(`Master Count (After): ${masterData.length}`);

// Write back to data/chennai.ts
const fileContent = `import { RawSehriSpot } from "../types";

export const CHENNAI_DATA: RawSehriSpot[] = ${JSON.stringify(masterData, null, 2)};
`;

fs.writeFileSync(masterPath, fileContent);
console.log(`Updated ${masterPath}`);
