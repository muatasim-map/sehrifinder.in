
const STORAGE_KEYS = {
  CITY: 'sehri_finder_city',
  SAVED_SPOTS: 'sehri_finder_saved_ids'
};

export const getStoredCity = (defaultCity: string): string => {
  if (typeof window === 'undefined') return defaultCity;
  return localStorage.getItem(STORAGE_KEYS.CITY) || defaultCity;
};

export const setStoredCity = (city: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CITY, city);
};

export const getSavedSpots = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_SPOTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const setSavedSpots = (ids: number[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SAVED_SPOTS, JSON.stringify(ids));
};
