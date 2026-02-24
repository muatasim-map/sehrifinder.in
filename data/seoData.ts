export interface FAQItem {
    q: string;
    a: string;
}

export interface CitySEOData {
    city: string;
    h1: string;
    h2: string;
    introText: string;
    shortDescription: string;
    keywords: string[];
    faqItems: FAQItem[];
}

export const SEO_DATA: Record<string, CitySEOData> = {
    chennai: {
        city: "Chennai",
        h1: "Sehri Spots in Chennai — Ramadan 2026",
        h2: "Verified Suhoor Meals, Masjids & Community Sehri in Chennai",
        introText: "Discover the best Sehri spots across Chennai. From traditional Masjids in Triplicane and Royapettah offering communal Suhoor to verified restaurants open late-night, find everything you need for a blessed Ramadan 2026.",
        shortDescription: "Find verified Sehri locations, timings, and menus across Chennai.",
        keywords: ["sehri chennai", "suhoor chennai", "sehr chennai", "ramadan food chennai", "triplicane sehri"],
        faqItems: [
            { q: "Where can I find communal Sehri in Chennai?", a: "Major Masjids in Triplicane and Royapettah offer communal Sehri. Check our directory for specific locations and timings." },
            { q: "Are there any women-friendly Suhoor spots in Chennai?", a: "Yes, பல locations marked as 'Family Friendly' in our Chennai list have dedicated sections for sisters." }
        ]
    },
    bengaluru: {
        city: "Bengaluru",
        h1: "Sehri & Suhoor Spots in Bengaluru — Ramadan 2026",
        h2: "Find Late-Night Dining & Community Sehri in Bangalore",
        introText: "Explore verified Suhoor experiences and Sehri food spots in Bengaluru. Whether you're in Shivajinagar or Koramangala, our community map helps you find the right place for your pre-dawn meal.",
        shortDescription: "Discover places offering Sehri meals in Bengaluru during Ramadan.",
        keywords: ["sehri bangalore", "suhoor bengaluru", "shivajinagar sehri", "ramadan food bangalore"],
        faqItems: [
            { q: "What are the common Sehri spots in Shivajinagar?", a: "Shivajinagar is famous for its late-night food stalls during Ramadan. Use our map to find specific verified stalls and Masjids." },
            { q: "What time does Suhoor end in Bangalore?", a: "Suhoor ends at the start of Fajr. Timings change daily; please check a reliable prayer timetable for today's exact time." }
        ]
    },
    mumbai: {
        city: "Mumbai",
        h1: "Sehri Spots in Mumbai — Ramadan 2026",
        h2: "Mohammed Ali Road Suhoor & Masjid Sehri across Mumbai",
        introText: "Mumbai's Ramadan spirit is legendary. From the bustling Mohammed Ali Road to local Masjids in suburbs, find the most authentic and verified Sehri and Suhoor experiences in Mumbai.",
        shortDescription: "Locate authentic Sehri experiences and food spots in Mumbai.",
        keywords: ["sehri mumbai", "suhoor mumbai", "mohammed ali road suhoor", "mumbai ramadan food"],
        faqItems: [
            { q: "Is Mohammed Ali Road open for Sehri?", a: "Yes, many iconic restaurants on Mohammed Ali Road stay open until Suhoor during Ramadan." },
            { q: "Where can travelers find Suhoor in Mumbai?", a: "We list spots near major railway stations like Mumbai Central and Bandra that are verified for late-night meals." }
        ]
    },
    hyderabad: {
        city: "Hyderabad",
        h1: "Sehri & Suhoor in Hyderabad — Ramadan 2026",
        h2: "Charminar Sehri Spots & Traditional Suhoor in Hyderabad",
        introText: "Indulge in the rich culinary heritage of Hyderabad this Ramadan. Find verified Sehri locations, traditional Suhoor meals, and late-night dining options from Charminar to Gachibowli.",
        shortDescription: "Explore verified Sehri locations and traditional dining in Hyderabad.",
        keywords: ["sehri hyderabad", "suhoor hyderabad", "charminar suhoor", "hyderabad ramadan food"],
        faqItems: [
            { q: "Which areas in Hyderabad are best for Suhoor?", a: "Charminar and Old City are the most vibrant, but many locations in Tolichowki and Gachibowli also offer excellent Sehri options." },
            { q: "Are these Hyderabad spots verified?", a: "Yes, our community members verify these locations every year to ensure they are serving Sehri." }
        ]
    },
    london: {
        city: "London",
        h1: "Suhoor & Sehri Spots in London — Ramadan 2026",
        h2: "Find Verified Suhoor Meals, Masjids & Late-Night Eateries in London",
        introText: "Looking for Suhoor or Sehri in London? From Central London's Halal restaurants to community-run Masjids in East London and beyond, find verified spots to have your pre-dawn meal this Ramadan.",
        shortDescription: "Find verified Sehri locations, Masjids, and late-night eateries across London.",
        keywords: ["suhoor london", "sehri london", "halal late night london", "london masjids suhoor"],
        faqItems: [
            { q: "Which London Masjids offer Suhoor?", a: "Several major Masjids, including East London Mosque and Regents Park Mosque, often have Suhoor programs. Check our latest verified list for updates." },
            { q: "Are there 24-hour Halal spots for Sehri in London?", a: "Yes, many eateries in areas like Edgware Road and Whitechapel operate through the night during Ramadan." }
        ]
    },
    "new-york": {
        city: "New York",
        h1: "Suhoor & Sehri Spots in NYC — Ramadan 2026",
        h2: "Find Halal Suhoor, Masjids & Late-Night Bites in New York City",
        introText: "Discover where to find Suhoor and Sehri in the city that never sleeps. Our NYC directory includes verified Halal restaurants, community Masjids, and late-night spots across Brooklyn, Queens, and Manhattan.",
        shortDescription: "Discover Sehri spots, Halal restaurants, and prayer locations in NYC.",
        keywords: ["suhoor nyc", "sehri nyc", "halal suhoor brooklyn", "queens ramadan food"],
        faqItems: [
            { q: "Where can I find Suhoor in Queens?", a: "Jackson Heights and Astoria have a high density of Halal spots open for Suhoor. Check our map for specific markers." },
            { q: "Do Masjids in NYC serve Suhoor?", a: "Many Masjids offer community suhoors, especially on weekends and during the last 10 nights (Itikaf)." }
        ]
    },
    "san-francisco": {
        city: "San Francisco",
        h1: "Suhoor & Sehri in the Bay Area — Ramadan 2026",
        h2: "Find Verified Ramadan Meals in San Francisco & South Bay",
        introText: "Navigate the Bay Area's Ramadan scene with ease. Find verified Suhoor meals, community Sehri events, and Halal dining from San Francisco into the East Bay and Silicon Valley.",
        shortDescription: "Locate Ramadan Sehri meals and community spaces in the SF Bay Area.",
        keywords: ["suhoor bay area", "sehri san francisco", "bay area ramadan meals", "sf halal suhoor"],
        faqItems: [
            { q: "Are there late-night Halal spots in SF?", a: "Yes, though more limited than other cities. Use our filters to find spots verified for 2026." },
            { q: "Where is the best place for community Suhoor in the South Bay?", a: "Several Masjids in Santa Clara and Fremont have active community programs. See our verified list." }
        ]
    },
    toronto: {
        city: "Toronto",
        h1: "Sehri & Suhoor Spots in Toronto — Ramadan 2026",
        h2: "Verified Halal Suhoor, Masjids & Community Meals in GTA",
        introText: "Find the best Sehri spots in Toronto and the Greater Toronto Area. Our community-verified directory includes Masjids offering late-night Suhoor, Halal restaurants open before Fajr, and free community meals in Scarborough and Mississauga.",
        shortDescription: "Explore verified Sehri locations and Halal dining in the Greater Toronto Area.",
        keywords: ["sehri toronto", "suhoor gta", "toronto halal suhoor", "mississauga sehri"],
        faqItems: [
            { q: "Where can I find community Sehri in Toronto?", a: "Masjids like Islamic Foundation of Toronto and ISNA Canada often host verified community Suhoors." },
            { q: "Is there late-night Halal food in Mississauga?", a: "Yes, many spots in the Heartland and Erin Mills areas stay open late for Suhoor commuters." }
        ]
    },
    edmonton: {
        city: "Edmonton",
        h1: "Suhoor & Sehri in Edmonton — Ramadan 2026",
        h2: "Find Verified Ramadan Food & Masjids in Edmonton",
        introText: "Discover verified Suhoor spots and community Sehri in Edmonton. We list local Masjids and Halal eateries providing pre-dawn meals for the community this Ramadan.",
        shortDescription: "Find verified Sehri spots, Masjids, and Halal eateries in Edmonton.",
        keywords: ["suhoor edmonton", "sehri edmonton", "edmonton halal suhoor", "edmonton ramadan food"],
        faqItems: [
            { q: "Which Edmonton Masjids serve Suhoor?", a: "Al-Rashid and other local centers often have community programs. Check our live markers for status." }
        ]
    },
    montreal: {
        city: "Montreal",
        h1: "Suhoor & Sehri in Montreal — Ramadan 2026",
        h2: "Find Verified Halal Suhoor & Masjids across Montreal",
        introText: "Explore Montreal's vibrant Ramadan community. Find verified Suhoor food spots and community Sehri events across Montreal, from the Plateau to the West Island.",
        shortDescription: "Discover Sehri experiences and Halal food spots across Montreal.",
        keywords: ["suhoor montreal", "sehri montreal", "montreal halal suhoor", "ramadan food montreal"],
        faqItems: [
            { q: "Are there any 24-hour Halal spots in Montreal?", a: "Certain locations in Cote-des-Neiges and Ville Saint-Laurent operate during Suhoor hours." }
        ]
    },
    brampton: {
        city: "Brampton",
        h1: "Sehri & Suhoor in Brampton — Ramadan 2026",
        h2: "Verified Halal Suhoor & Community Meals in Brampton",
        introText: "Locate the best Sehri and Suhoor options in Brampton. Our community directory features verified Halal dining and Masjids offering late-night meals for those observing Ramadan.",
        shortDescription: "Locate verified Sehri locations and Halal dining in Brampton.",
        keywords: ["sehri brampton", "suhoor brampton", "brampton halal suhoor", "ramadan food brampton"],
        faqItems: [
            { q: "Which Brampton Masjids are active for Suhoor?", a: "Several large centers in Brampton offer Suhoor during the last 10 days of Ramadan." }
        ]
    },
    calgary: {
        city: "Calgary",
        h1: "Suhoor & Sehri in Calgary — Ramadan 2026",
        h2: "Find Verified Halal Suhoor & community Sehri in Calgary",
        introText: "Find verified Suhoor and Sehri spots in Calgary. Our directory helps you discover Masjids and Halal restaurants open for your pre-dawn meal this Ramadan.",
        shortDescription: "Explore Sehri spots, Masjids, and Halal eateries in Calgary.",
        keywords: ["suhoor calgary", "sehri calgary", "calgary halal suhoor", "ramadan food calgary"],
        faqItems: [
            { q: "Where can I find Suhoor in NE Calgary?", a: "The NE quadrant has many Halal establishments; use our map to find those verified for late-night hours." }
        ]
    },
    ottawa: {
        city: "Ottawa",
        h1: "Suhoor & Sehri in Ottawa — Ramadan 2026",
        h2: "Verified Halal Suhoor & Masjids across Ottawa",
        introText: "Discover verified Suhoor and Sehri locations in Canada's capital. From local Masjids to Halal-certified eateries, find the best spots for your pre-dawn meal in Ottawa.",
        shortDescription: "Find verified Sehri locations and Halal dining across Ottawa.",
        keywords: ["suhoor ottawa", "sehri ottawa", "ottawa halal suhoor", "ramadan food ottawa"],
        faqItems: [
            { q: "Do Ottawa Masjids host community Suhoors?", a: "Yes, several centers have active Ramadan programs. Check our verified markers for details." }
        ]
    },
    cambridge: {
        city: "Cambridge",
        h1: "Suhoor & Sehri in Cambridge — Ramadan 2026",
        h2: "Find Verified Ramadan Food in Cambridge, Ontario",
        introText: "Find verified Suhoor and Sehri spots in Cambridge, Ontario. Our community-led directory lists Masjids and local Halal eateries open during pre-dawn hours.",
        shortDescription: "Discover Sehri spots and Halal eateries in Cambridge, Ontario.",
        keywords: ["suhoor cambridge", "sehri cambridge", "cambridge ontario suhoor"],
        faqItems: [
            { q: "Are there any communal Suhoors in Cambridge?", a: "Local Masjids occasionally host community events; check our live list for verified updates." }
        ]
    },
    kanata: {
        city: "Kanata",
        h1: "Suhoor & Sehri in Kanata — Ramadan 2026",
        h2: "Verified Halal Suhoor & Masjids in Kanata",
        introText: "Locate verified Suhoor food spots and community Sehri in Kanata. We provide a community-led list of locations for those observing Ramadan in the Kanata area.",
        shortDescription: "Locate verified Sehri locations and Halal dining in Kanata.",
        keywords: ["suhoor kanata", "sehri kanata", "kanata ramadan food"],
        faqItems: [
            { q: "Where is the nearest Suhoor in Kanata?", a: "Use our 'Near Me' feature on the map to find verified locations closest to your current position." }
        ]
    },
    chicago: {
        city: "Chicago",
        h1: "Suhoor & Sehri Spots in Chicago — Ramadan 2026",
        h2: "Find Verified Suhoor, Halal Late-Night & Masjids in Chicago",
        introText: "Chicago's Devon Avenue and beyond come alive during Ramadan. Find verified Suhoor meals, community Sehri events, and late-night Halal restaurants in Chicago this year.",
        shortDescription: "Find late-night Sehri spots and Ramadan community events in Chicago.",
        keywords: ["suhoor chicago", "sehri chicago", "devon avenue suhoor", "chicago masjids sehri"],
        faqItems: [
            { q: "Is Devon Avenue open for Suhoor?", a: "Yes, many legendary spots on Devon Avenue operate extended hours during Ramadan." }
        ]
    },
    houston: {
        city: "Houston",
        h1: "Suhoor & Sehri in Houston — Ramadan 2026",
        h2: "Verified Halal Suhoor & community Sehri across Houston",
        introText: "From Sugar Land to Hillcroft, discover verified Suhoor spots and community Sehri in Houston. Our community directory makes it easy to find late-night Halal food and Masjids.",
        shortDescription: "Discover verified Sehri food spots and Masjids across Houston.",
        keywords: ["suhoor houston", "sehri houston", "hillcroft suhoor", "houston halal ramadan"],
        faqItems: [
            { q: "Where are the best clusters of Suhoor spots in Houston?", a: "Hillcroft and Sugar Land areas have high concentrations of Halal eateries open for Suhoor." }
        ]
    },
    detroit: {
        city: "Detroit",
        h1: "Suhoor & Sehri in Detroit & Dearborn — Ramadan 2026",
        h2: "Verified Halal Suhoor & Community Sehri in Michigan",
        introText: "Explore the heart of America's Muslim community this Ramadan. Find verified Suhoor meals, community Sehri events, and late-night Halal dining in Detroit, Dearborn, and surrounding areas.",
        shortDescription: "Locate authentic Sehri experiences and food spots in Detroit and Dearborn.",
        keywords: ["suhoor dearborn", "sehri detroit", "michigan suhoor spots", "dearborn ramadan food"],
        faqItems: [
            { q: "How late are Dearborn restaurants open?", a: "Many restaurants in Dearborn stay open specifically until Suhoor time during Ramadan." }
        ]
    },
    "kuala-lumpur": {
        city: "Kuala Lumpur",
        h1: "Sahur & Suhoor Spots in Kuala Lumpur — Ramadan 2026",
        h2: "Find Verified Sahur Meals & 24hr Eateries in KL",
        introText: "Experience the vibrant Sahur culture in Kuala Lumpur. From 24-hour Mamak stalls to community Masjids offering Suhoor, find verified spots across KL for your pre-dawn meal.",
        shortDescription: "Discover 24-hour eateries and Masjid Suhoors in Kuala Lumpur.",
        keywords: ["sahur kl", "suhoor kuala lumpur", "kl 24 hour eating", "ramadan food kl"],
        faqItems: [
            { q: "Where are the best spots for Sahur in KL?", a: "Bukit Bintang and Kampung Baru offer many 24-hour options verified for Sahur." }
        ]
    }
};
