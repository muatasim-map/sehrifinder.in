/**
 * Standardizes city names into URL-friendly slugs.
 * Example: "New York" -> "new-york", "Kuala Lumpur" -> "kuala-lumpur"
 */
export const toSlug = (city: string): string => {
    return city
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');
};

/**
 * Reverts a slug back into a human-readable city name for internal lookups.
 * Note: This might not restore proper casing (e.g. "new-york" -> "new york"),
 * but it serves as a lookup key for case-insensitive data maps.
 */
export const fromSlug = (slug: string): string => {
    return slug.replace(/-/g, ' ');
};
