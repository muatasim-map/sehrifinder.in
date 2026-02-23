export type CountryCode = 'IN' | 'UK' | 'US' | 'CA' | 'MY';

export interface Country {
    name: string;
    code: CountryCode;
    cities: string[];
}

export const COUNTRIES: Country[] = [
    {
        name: 'India',
        code: 'IN',
        cities: ['Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai']
    },
    {
        name: 'United Kingdom',
        code: 'UK',
        cities: ['London']
    },
    {
        name: 'USA',
        code: 'US',
        cities: ['New York', 'San Francisco', 'Chicago', 'Houston', 'Detroit']
    },
    {
        name: 'Canada',
        code: 'CA',
        cities: ['Toronto']
    },
    {
        name: 'Malaysia',
        code: 'MY',
        cities: ['Kuala Lumpur']
    }
];

export const getCountryByCity = (cityName: string): Country | undefined => {
    return COUNTRIES.find(country => country.cities.includes(cityName));
};
