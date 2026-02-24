
const STORAGE_KEYS = {
  CITY: 'sehri_finder_city',
  SAVED_SPOTS: 'sehri_finder_saved_ids'
};

export const getStoredCity = (defaultCity: string): string => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return defaultCity;
    return window.localStorage.getItem(STORAGE_KEYS.CITY) || defaultCity;
  } catch {
    return defaultCity;
  }
};

export const setStoredCity = (city: string): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEYS.CITY, city);
  } catch { }
};

export const getSavedSpots = (): number[] => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const stored = window.localStorage.getItem(STORAGE_KEYS.SAVED_SPOTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const setSavedSpots = (ids: number[]): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEYS.SAVED_SPOTS, JSON.stringify(ids));
  } catch { }
};
