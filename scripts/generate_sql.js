
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHENNAI_PATH = path.join(__dirname, '../data/chennai.ts');
const BANGALORE_PATH = path.join(__dirname, '../data/bangalore.ts');
const MUMBAI_PATH = path.join(__dirname, '../data/mumbai.ts');
const HYDERABAD_PATH = path.join(__dirname, '../data/hyderabad.ts');
const OUTPUT_PATH = path.join(__dirname, 'full_migration_v2.sql');

function parseData(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Remove imports
    content = content.replace(/import .*?;/g, '');

    // 2. Remove comments (basic)
    content = content.replace(/\/\/.*$/gm, '');

    // 3. Transform export to simple variable and remove type annotation
    // Matches: export const CHENNAI_DATA: RawSehriSpot[] = [
    // We want: const data = [
    content = content.replace(/export const \w+(\s*:\s*\w+\[\])?\s*=\s*/, 'const data = ');

    // 4. Remove trailing semi-colon if present
    content = content.trim();
    if (content.endsWith(';')) content = content.slice(0, -1);

    // 5. Eval to get the object
    // We wrap it in a function to avoid scope pollution if we were doing this differently,
    // but here we just want the array.
    try {
        const func = new Function(content + '; return data;');
        return func();
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e);
        return [];
    }
}

function escapeSql(val, type = 'text') {
    if (val === undefined || val === null) return 'NULL';

    if (type === 'jsonb') {
        return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
    }

    if (type === 'array') {
        if (!Array.isArray(val)) return "'{}'::text[]";
        if (val.length === 0) return "'{}'::text[]";
        const items = val.map(v => `'${v.replace(/'/g, "''")}'`).join(',');
        return `ARRAY[${items}]::text[]`;
    }

    if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    return 'NULL';
}


const chennaiData = parseData(CHENNAI_PATH);
const bangaloreData = parseData(BANGALORE_PATH);
const mumbaiData = parseData(MUMBAI_PATH);
const hyderabadData = parseData(HYDERABAD_PATH);

console.log(`Parsed ${chennaiData.length} Chennai spots.`);
console.log(`Parsed ${bangaloreData.length} Bangalore spots.`);
console.log(`Parsed ${mumbaiData.length} Mumbai spots.`);
console.log(`Parsed ${hyderabadData.length} Hyderabad spots.`);

const allData = [...chennaiData, ...bangaloreData, ...mumbaiData, ...hyderabadData];

let sql = `-- FULL MIGRATION SCRIPT (${allData.length} records)
-- Run this in Supabase SQL Editor

BEGIN;

-- 1. Clear existing data
TRUNCATE TABLE public.spots RESTART IDENTITY;

-- 2. Insert all spots
INSERT INTO public.spots (
  location_id, 
  venue_name, 
  city, 
  primary_area, 
  locality, 
  landmark, 
  zone, 
  latitude, 
  longitude, 
  venue_type, 
  food_type, 
  timing, 
  availability, 
  price, 
  notes,
  features, 
  target_audience, 
  phones, 
  contact_persons
) VALUES 
`;

const values = allData.map(item => {
    // Mapping TS fields to DB columns
    const city = item.city || 'Chennai';

    return `(
      ${item.location_id},
      ${escapeSql(item.venue_name)},
      ${escapeSql(city)},
      ${escapeSql(item.primary_area)},
      ${escapeSql(item.locality)},
      ${escapeSql(item.landmark)},
      ${escapeSql(item.zone)},
      ${item.latitude || 'NULL'},
      ${item.longitude || 'NULL'},
      ${escapeSql(item.venue_type)},
      ${escapeSql(item.food_type)},
      ${escapeSql(item.timing, 'jsonb')},
      ${escapeSql(item.availability)},
      ${escapeSql(item.price)},
      ${escapeSql(item.notes)},
      ${escapeSql(item.features, 'array')},
      ${escapeSql(item.target_audience, 'array')},
      ${escapeSql(item.phones, 'array')},
      ${escapeSql(item.contact_persons, 'array')}
    )`;
}).join(',\n');

sql += values + ';';

sql += `

-- 3. Reset the sequence to avoid ID conflicts with new submissions
-- Note: 'spots_location_id_seq' is the standard name created by identity columns
SELECT setval(pg_get_serial_sequence('public.spots', 'location_id'), MAX(location_id)) FROM public.spots;

COMMIT;
`;

fs.writeFileSync(OUTPUT_PATH, sql);
console.log(`SQL written to ${OUTPUT_PATH}`);
