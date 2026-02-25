export type CountryCode = 'IN' | 'UK' | 'US' | 'CA' | 'MY';

export interface CityLocation {
    name: string;
    lat: number;
    lng: number;
}

export interface Country {
    name: string;
    code: CountryCode;
    cities: CityLocation[];
}

export const COUNTRIES: Country[] = [
    {
        name: 'India',
        code: 'IN',
        cities: [
            { name: 'Chennai', lat: 13.08, lng: 80.27 },
            { name: 'Bengaluru', lat: 12.97, lng: 77.59 },
            { name: 'Hyderabad', lat: 17.39, lng: 78.49 },
            { name: 'Mumbai', lat: 19.08, lng: 72.88 },
        ]
    },
    {
        name: 'United Kingdom',
        code: 'UK',
        cities: [
            { name: 'London', lat: 51.51, lng: -0.13 },
        ]
    },
    {
        name: 'USA',
        code: 'US',
        cities: [
            { name: 'New York', lat: 40.71, lng: -74.01 },
            { name: 'San Francisco', lat: 37.77, lng: -122.42 },
            { name: 'Chicago', lat: 41.88, lng: -87.63 },
            { name: 'Houston', lat: 29.76, lng: -95.37 },
            { name: 'Detroit', lat: 42.33, lng: -83.05 },
        ]
    },
    {
        name: 'Canada',
        code: 'CA',
        cities: [
            { name: 'Toronto', lat: 43.65, lng: -79.38 },
            { name: 'Edmonton', lat: 53.55, lng: -113.49 },
            { name: 'Montreal', lat: 45.50, lng: -73.57 },
            { name: 'Brampton', lat: 43.73, lng: -79.76 },
            { name: 'Calgary', lat: 51.05, lng: -114.07 },
            { name: 'Ottawa', lat: 45.42, lng: -75.70 },
            { name: 'Cambridge', lat: 43.36, lng: -80.31 },
            { name: 'Kanata', lat: 45.30, lng: -75.90 },
        ]
    },
    {
        name: 'Malaysia',
        code: 'MY',
        cities: [
            { name: 'Kuala Lumpur', lat: 3.14, lng: 101.69 },
        ]
    }
];

/** Backward-compatible helper: flat list of city names per country */
export const getCountryByCity = (cityName: string): Country | undefined => {
    return COUNTRIES.find(country => country.cities.some(c => c.name === cityName));
};
