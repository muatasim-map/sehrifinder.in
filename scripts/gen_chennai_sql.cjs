const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../data/chennai.ts');
const outputPath = path.join(__dirname, '../seed_chennai_final.sql');

try {
    let content = fs.readFileSync(inputPath, 'utf8');

    // specific cleanup for the known structure of chennai.ts
    content = content.replace(/import .*/g, '');
    content = content.replace(/export const CHENNAI_DATA: RawSehriSpot\[\] =/, 'const data =');
    // Remove type annotation if regex didn't catch it strictly
    content = content.replace(/: RawSehriSpot\[\]/, '');

    // Evaluate the content to get the data object
    // We wrap in a function to allow the internal 'data' variable to be returned
    const data = eval(content + '; data;');

    const sqlHeader = `
-- SEED DATA: CHENNAI 2026 FINAL
-- Generated from data/chennai.ts
-- Includes address and last_verified columns

-- 1. Schema Updates (Idempotent)
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS last_verified text;

-- 2. Clean up old Chennai data
DELETE FROM public.spots WHERE city = 'Chennai';

-- 3. Insert New Data
INSERT INTO public.spots (
  location_id, venue_name, city, primary_area, venue_type, food_type, 
  timing, availability, address, landmark, features, latitude, longitude, phones, contact_persons, notes, last_verified
) VALUES 
`;

    const values = data.map(spot => {
        // Helper to escape SQL strings
        const esc = (val) => {
            if (val === undefined || val === null) return 'NULL';
            return `'${String(val).replace(/'/g, "''")}'`;
        };

        // Helper for arrays (features, phones, contact_persons) -> PostgreSQL array literal '{a,b}'
        const escArr = (arr) => {
            if (!arr || arr.length === 0) return 'NULL';
            // Escape elements: replace ' and " and \ 
            // PostgreSQL text[] format: '{"item 1", "item 2"}'
            const items = arr.map(s => `"${String(s).replace(/"/g, '\\"')}"`).join(',');
            return `'${"{" + items + "}"}'`;
        };

        // Helper for JSON (timing)
        const escJson = (obj) => {
            if (!obj) return 'NULL';
            return `'${JSON.stringify(obj).replace(/'/g, "''")}'`;
        };

        // Mapping Logic
        const location_id = spot.location_id;
        const venue_name = esc(spot.venue_name);
        const city = "'Chennai'";
        const primary_area = esc(spot.primary_area);
        const venue_type = esc(spot.venue_type);
        const food_type = esc(spot.food_type);
        const timing = escJson(spot.timing);
        const availability = esc(spot.availability);

        // Use 'address' field if exists, otherwise fallback to 'landmark'
        // In database, we want 'address' column to have the best address info.
        const rawAddress = spot.address || spot.landmark;
        const address = esc(rawAddress);

        // 'landmark' column - use same value or specific landmark if separate (TS only has one usually)
        const landmark = esc(spot.landmark || spot.address); // Fallback to ensure not null if possible

        const features = escArr(spot.features);
        const latitude = spot.latitude || 'NULL';
        const longitude = spot.longitude || 'NULL';
        const phones = escArr(spot.phones);
        const contact_persons = escArr(spot.contact_persons);
        const notes = esc(spot.notes);
        const last_verified = esc(spot.last_verified);

        return `(${location_id}, ${venue_name}, ${city}, ${primary_area}, ${venue_type}, ${food_type}, ${timing}, ${availability}, ${address}, ${landmark}, ${features}, ${latitude}, ${longitude}, ${phones}, ${contact_persons}, ${notes}, ${last_verified})`;
    }).join(',\n');

    fs.writeFileSync(outputPath, sqlHeader + values + ';\n');
    console.log(`Successfully generated ${outputPath}`);

} catch (err) {
    console.error('Error parsing TS or generating SQL:', err);
    process.exit(1);
}
