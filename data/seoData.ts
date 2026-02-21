export interface CitySEOData {
    city: string;
    shortDescription: string;
}

export const SEO_DATA: Record<string, CitySEOData> = {
    chennai: {
        city: "Chennai",
        shortDescription: "Find verified Sehri locations, timings, and menus across Chennai."
    },
    bengaluru: {
        city: "Bengaluru",
        shortDescription: "Discover places offering Sehri meals in Bengaluru during Ramadan."
    },
    mumbai: {
        city: "Mumbai",
        shortDescription: "Locate authentic Sehri experiences and food spots in Mumbai."
    },
    hyderabad: {
        city: "Hyderabad",
        shortDescription: "Explore verified Sehri locations and traditional dining in Hyderabad."
    }
};
