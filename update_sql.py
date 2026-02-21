import re
import urllib.parse
import re

def parse_sql_values(line):
    # This regex attempts to find values inside (...) VALUES (...), (...);
    # But since we are processing line by line, we just need to parse $(val1, val2, ...)$
    # We remove the leading '(' and trailing '),' or ');'
    content = line.strip()
    if content.startswith('('):
        content = content[1:]
    if content.endswith('),') or content.endswith(');'):
        content = content[:-2]
    elif content.endswith(')'):
        content = content[:-1]
    
    # Simple state machine to split by comma but skip commas inside quotes or curly braces
    values = []
    current = []
    in_quote = False
    in_curly = 0
    
    i = 0
    while i < len(content):
        char = content[i]
        
        if char == "'" and (i == 0 or content[i-1] != "\\"):
            # Check for escaped single quote in SQL (represented as '')
            if in_quote and i + 1 < len(content) and content[i+1] == "'":
                current.append("'")
                current.append("'")
                i += 1 
            else:
                in_quote = not in_quote
                current.append(char)
        elif char == "{" and not in_quote:
            in_curly += 1
            current.append(char)
        elif char == "}" and not in_quote:
            in_curly -= 1
            current.append(char)
        elif char == "," and not in_quote and in_curly == 0:
            values.append("".join(current).strip())
            current = []
        else:
            current.append(char)
        i += 1
    
    if current:
        values.append("".join(current).strip())
        
    return values

def process_full_seed():
    with open('full_seed.sql', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    output_lines = [
        "-- SEED DATA (CHUNKED)\n",
        "BEGIN;\n\n",
        "ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS address text;\n",
        "ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS last_verified text;\n",
        "ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS zone text;\n",
        "ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS target_audience text[];\n",
        "ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS google_maps_link text;\n\n",
        "TRUNCATE TABLE public.spots;\n\n"
    ]

    insert_header = (
        "INSERT INTO public.spots (\n"
        "  location_id, venue_name, city, primary_area, venue_type, food_type, \n"
        "  timing, availability, address, landmark, features, latitude, longitude, phones, contact_persons, notes, last_verified, zone, target_audience, google_maps_link\n"
        ") VALUES "
    )

    records = []
    for line in lines:
        stripped = line.strip()
        if not stripped.startswith('('):
            continue
            
        vals = parse_sql_values(stripped)
        if len(vals) < 19:
            continue
            
        # Clean up values (remove extra quotes if they were added erroneously)
        # But here we want to KEEP the SQL format.
        # location_id (0), venue_name (1), city (2), area (3), ..., address (8)
        
        def get_raw_val(s):
            if s.upper() == "NULL": return None
            if s.startswith("'") and s.endswith("'"):
                # Remove outer quotes and unescape '' to '
                inner = s[1:-1]
                return inner.replace("''", "'")
            return s

        venue_name = get_raw_val(vals[1])
        city = get_raw_val(vals[2])
        area = get_raw_val(vals[3])
        address = get_raw_val(vals[8])
        
        # Infer City
        if not city:
            loc_id = int(vals[0])
            if loc_id < 1000: city = "Chennai"
            elif 3000 <= loc_id < 4000: city = "Bengaluru"
            elif 4000 <= loc_id < 5000: city = "Mumbai"
            elif 5000 <= loc_id < 6000: city = "Hyderabad"
            else: city = "Chennai"

        # Generate Link
        query_parts = [venue_name]
        if address and address != venue_name:
            query_parts.append(address)
        if area and area not in (address or ""):
            query_parts.append(area)
        query_parts.append(city)
        
        query = " ".join(filter(None, query_parts))
        encoded = urllib.parse.quote(query)
        link = f"https://www.google.com/maps/search/?api=1&query={encoded}"
        
        # Add the link to the values list
        vals.append(f"'{link}'")
        
        # If city was NULL in vals[2], update it if we inferred it
        if vals[2].upper() == "NULL" and city:
             vals[2] = f"'{city}'"
        
        records.append(f"({', '.join(vals)})")

    # Chunking: 50 records per insert
    chunk_size = 50
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i + chunk_size]
        output_lines.append(insert_header + "\n")
        output_lines.append(",\n".join(chunk) + ";\n\n")

    output_lines.append("COMMIT;\n")

    with open('updated_seed.sql', 'w', encoding='utf-8') as f:
        f.writelines(output_lines)

if __name__ == "__main__":
    process_full_seed()
    print("Successfully generated chunked updated_seed.sql")
