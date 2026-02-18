const fs = require('fs');
const path = require('path');
const CHENNAI_ZONES = require('./chennai_zones.cjs');

// Assuming running from scripts/ (adjust if needed, but path.join handles dots)
// Actually we will assume execution from root (Cwd: c:\Users\HP\Downloads\sehri)
// So inputs are ./data/....

const FILES = [
    { path: 'data/chennai.ts', varName: 'CHENNAI_DATA' },
    { path: 'data/bangalore.ts', varName: 'BANGALORE_DATA' },
    { path: 'data/mumbai.ts', varName: 'MUMBAI_DATA' },
    { path: 'data/hyderabad.ts', varName: 'HYDERABAD_DATA' }
];

const OUTPUT_PATH = 'seed_full_database.sql';

function parseFile(relPath, varName) {
    // Use absolute path relative to CWD, or just strict relPath
    const content = fs.readFileSync(relPath, 'utf8');

    // Cleanup TS syntax for eval
    let cleaned = content;
    // Remove imports
    cleaned = cleaned.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    // Remove export const ... : Type ... =
    // Need to capture the array content
    // Simple hack: find "export const VARNAME" and replace with "const data"
    // And remove type annotation ": RawSehriSpot[]"

    // 1. Remove type annotation
    cleaned = cleaned.replace(/:\s*RawSehriSpot\[\]/g, '');

    // 2. Replace export const with const data
    cleaned = cleaned.replace(new RegExp(`export\\s+const\\s+${varName}\\s*=`), 'const data =');

    // 3. Remove any other exports if present (like interfaces) - usually in types.ts though

    try {
        // Eval in a function scope
        const data = eval(cleaned + '; data;');
        return data;
    } catch (e) {
        console.error(`Error parsing ${relPath}:`, e.message);
        // console.log("Partial content:", cleaned.substring(0, 200));
        return [];
    }
}

try {
    let allSpots = [];

    for (const file of FILES) {
        if (fs.existsSync(file.path)) {
            const spots = parseFile(file.path, file.varName);
            console.log(`Loaded ${spots.length} spots from ${file.path}`);

            // Post-processing for specific cities if needed
            // Post-processing for specific cities if needed
            // Post-processing for specific cities if needed
            if (file.varName === 'CHENNAI_DATA') {
                spots.forEach(s => {
                    // 1. Ensure Verified Status & City
                    if (!s.last_verified) {
                        s.last_verified = '2026';
                    }
                    if (!s.city) {
                        s.city = 'Chennai';
                    }

                    // 2. Zone & Coordinate Mapping
                    if (!s.zone || !s.latitude || !s.longitude) {
                        const areaInfo = CHENNAI_ZONES[s.primary_area] || CHENNAI_ZONES['Unknown'];

                        if (areaInfo) {
                            if (!s.zone) s.zone = areaInfo.zone;
                            // Only overwrite lat/lng if BOTH are missing or null
                            if (!s.latitude || !s.longitude) {
                                s.latitude = areaInfo.lat;
                                s.longitude = areaInfo.lng;
                            }
                        }
                    }
                });
            }

            // Global defaults for all spots
            spots.forEach(s => {
                if (!s.city && file.varName === 'BANGALORE_DATA') s.city = 'Bengaluru';
                if (!s.city && file.varName === 'MUMBAI_DATA') s.city = 'Mumbai';
                if (!s.city && file.varName === 'HYDERABAD_DATA') s.city = 'Hyderabad';

                // Fallback if still no city
                if (!s.city) s.city = 'Unknown City';

                if (!s.country) s.country = 'India';
                // We don't have state column in DB schema yet, so skipping state for now
            });

            allSpots = allSpots.concat(spots);
        } else {
            console.warn(`File not found: ${file.path}`);
        }
    }

    // Deduplicate allSpots by location_id
    // Since we loaded 2026 data first, we want to keep the FIRST occurrence of any ID.
    const uniqueSpots = [];
    const seenIds = new Set();

    // Track stats
    let duplicates = 0;

    for (const spot of allSpots) {
        if (!seenIds.has(spot.location_id)) {
            uniqueSpots.push(spot);
            seenIds.add(spot.location_id);
        } else {
            duplicates++;
        }
    }
    allSpots = uniqueSpots;
    console.log(`Deduplication complete. Removed ${duplicates} duplicates. Final count: ${allSpots.length}`);

    const sqlHeader = `
-- SEED DATA: FULL DATABASE RESET
-- Generated: ${new Date().toISOString()}
-- Operations: 
-- 1. Schema Updates (Ensure columns exist)
-- 2. TRUNCATE spots table (Wipe clean)
-- 3. Insert All Data (${allSpots.length} records)

-- 1. Schema Updates
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS last_verified text;
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS zone text;
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS target_audience text[];

-- 2. Clean Slate
TRUNCATE TABLE public.spots;

-- 3. Insert New Data
INSERT INTO public.spots (
  location_id, venue_name, city, primary_area, venue_type, food_type, 
  timing, availability, address, landmark, features, latitude, longitude, phones, contact_persons, notes, last_verified, zone, target_audience
) VALUES 
`;

    const values = allSpots.map(spot => {
        const esc = (val) => {
            if (val === undefined || val === null) return 'NULL';
            return `'${String(val).replace(/'/g, "''")}'`;
        };

        const escArr = (arr) => {
            if (!arr || arr.length === 0) return 'NULL';
            // PostgreSQL array literal '{ "a", "b" }'
            const items = arr.map(s => `"${String(s).replace(/"/g, '\\"')}"`).join(',');
            return `'${"{" + items + "}"}'`;
        };

        const escJson = (obj) => {
            if (!obj) return 'NULL';
            return `'${JSON.stringify(obj).replace(/'/g, "''")}'`;
        };

        // Mapping
        const location_id = spot.location_id;
        const venue_name = esc(spot.venue_name);
        const city = esc(spot.city);
        const primary_area = esc(spot.primary_area);
        const venue_type = esc(spot.venue_type);
        const food_type = esc(spot.food_type);
        const timing = escJson(spot.timing);
        const availability = esc(spot.availability);

        // Fallback logic for address/landmark
        const rawAddress = spot.address || spot.landmark;
        const address = esc(rawAddress);
        const landmark = esc(spot.landmark || spot.address);

        const features = escArr(spot.features);
        const latitude = spot.latitude || 'NULL';
        const longitude = spot.longitude || 'NULL';
        const phones = escArr(spot.phones);
        const contact_persons = escArr(spot.contact_persons);
        const notes = esc(spot.notes);

        // Default last_verified to '2025' if missing
        // Logic: If '2026' is not present, assume older data (2025)
        // Chennai data already has 2026 or 2025 explicitly set in some cases? 
        // Actually our checking code sets it to 2026 if missing for Chennai.
        const last_verified = esc(spot.last_verified || '2025');

        const zone = esc(spot.zone);
        const target_audience = escArr(spot.target_audience);

        return `(${location_id}, ${venue_name}, ${city}, ${primary_area}, ${venue_type}, ${food_type}, ${timing}, ${availability}, ${address}, ${landmark}, ${features}, ${latitude}, ${longitude}, ${phones}, ${contact_persons}, ${notes}, ${last_verified}, ${zone}, ${target_audience})`;
    }).join(',\n');

    fs.writeFileSync(OUTPUT_PATH, sqlHeader + values + ';\n');
    console.log(`Successfully generated ${OUTPUT_PATH} with ${allSpots.length} records.`);

} catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
}
