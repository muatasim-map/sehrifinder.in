
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ------------------------------------------------------------------
// 1. Load Environment Variables (Manual Parse since no dotenv)
// ------------------------------------------------------------------
function loadEnv() {
    try {
        const files = ['.env', '.env.local'];
        const env = {};

        files.forEach(file => {
            const envPath = path.resolve(__dirname, '../' + file);
            if (fs.existsSync(envPath)) {
                console.log("Loading env from " + file);
                const content = fs.readFileSync(envPath, 'utf8');
                content.split('\n').forEach(line => {
                    const match = line.match(/^([^=]+)=(.*)$/);
                    if (match) {
                        const key = match[1].trim();
                        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
                        if (key && !key.startsWith('#')) {
                            env[key] = value;
                        }
                    }
                });
            }
        });

        return env;
    } catch (e) {
        console.error("Error loading .env", e);
        return {};
    }
}

// Hardcoded for seeding to bypass env parsing issues
const SUPABASE_URL = "https://mhyvyifbuujniqkjtyuk.supabase.co";
const SUPABASE_KEY = "sb_publishable_EKRsFAI8mnmXbLZCtkH2OA_jtlvOkcX";

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Credentials missing.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------------------------------------------------------
// 2. Data Parsing Helper (from merge script)
// ------------------------------------------------------------------
function parseTsFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Strip BOM
        content = content.replace(/^\uFEFF/, '');

        // Debug: Show start of file
        console.log(`[DEBUG] Reading ${path.basename(filePath)} (First 50 chars):`, JSON.stringify(content.slice(0, 50)));

        // 1. Remove imports (multiline support)
        content = content.replace(/import[\s\S]*?from[\s\S]*?['"];?/g, '');

        // 2. Remove comments (basic)
        content = content.replace(/\/\/.*$/gm, '');

        // 3. Find the main array
        const startMarker = "export const";
        const structStart = content.indexOf(startMarker);
        if (structStart === -1) throw new Error("No export const found");

        const arrayStart = content.indexOf('[', structStart);
        const arrayEnd = content.lastIndexOf(']');

        if (arrayStart === -1 || arrayEnd === -1) throw new Error("Could not find array brackets []");

        const arrayString = content.substring(arrayStart, arrayEnd + 1);

        // 4. Eval just the array
        console.log(`[DEBUG] Extracted array string length: ${arrayString.length}`);
        return eval('(' + arrayString + ')');
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e.message);
        return [];
    }
}

const logFile = path.resolve(__dirname, 'seed_log.txt');
fs.writeFileSync(logFile, "Starting Log\n");

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + "\n");
}

// ------------------------------------------------------------------
// 3. Seeding Logic
// ------------------------------------------------------------------
async function seedData() {
    log("🚀 Starting Data Seed...");

    const files = [
        { path: '../data/chennai.ts', city: 'Chennai' },
        { path: '../data/bangalore.ts', city: 'Bangalore' },
        { path: '../data/hyderabad.ts', city: 'Hyderabad' },
        { path: '../data/mumbai.ts', city: 'Mumbai' }
    ];

    let totalUpserted = 0;

    for (const file of files) {
        const fullPath = path.resolve(__dirname, file.path);
        if (!fs.existsSync(fullPath)) {
            log(`Skipping ${file.city} (File not found)`);
            continue;
        }

        const spots = parseTsFile(fullPath);
        log(`\nProcessing ${file.city}: Found ${spots.length} spots...`);

        if (spots.length === 0) {
            log(`[WARNING] No spots found in ${file.city}`);
            continue;
        }

        // Prepare data for Supabase
        // Ensure fields map correctly to DB columns
        const payload = spots.map(s => ({
            location_id: s.location_id,
            venue_name: s.venue_name,
            city: s.city || file.city,
            primary_area: s.primary_area,
            venue_type: s.venue_type,
            food_type: s.food_type,
            // Ensure timing is valid JSON. If it's an object, stringify it.
            // If it's undefined, leave it (Supabase handles optional).
            timing: s.timing ? (typeof s.timing === 'object' ? JSON.stringify(s.timing) : s.timing) : null,
            latitude: s.latitude,
            longitude: s.longitude,
            verified: true, // Auto-verify seeded data
            features: s.features || [],
            phones: s.phones || [],
            notes: s.notes,
            last_verified: s.last_verified || '2026'
        }));

        // Batch Upsert (Supabase handles upsert by PK)
        const { error, count } = await supabase
            .from('spots')
            .upsert(payload, { onConflict: 'location_id' }) // Use location_id as PK
            .select();

        if (error) {
            log(`❌ Error seeding ${file.city}: ${error.message}`);
        } else {
            log(`✅ Upserted ${payload.length} spots for ${file.city}`);
            totalUpserted += payload.length;
        }
    }

    log(`\n✨ Seeding Complete! Total records processed: ${totalUpserted}`);
}

seedData();
