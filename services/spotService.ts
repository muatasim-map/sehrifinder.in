
import { SehriSpot } from '../types';
import { SAMPLE_DATA } from '../constants';

/**
 * SERVICE LAYER - THE INTEGRATION SEAM
 * ------------------------------------
 * Currently: Returns static JSON data from local files.
 * Future: Will fetch data from Supabase/API.
 * 
 * Why this exists:
 * 1. Allows the UI to be "Async Ready" (handling loading states).
 * 2. Isolates the backend logic. When you add Supabase, you only edit this file.
 */

import { supabase } from '../utils/supabase';
import { transformRawSpot } from '../utils/transformers';

/**
 * SERVICE LAYER - THE INTEGRATION SEAM
 * ------------------------------------
 * Hybrid Implementation:
 * 1. Tries to fetch from Supabase first.
 * 2. Falls back to static SAMPLE_DATA if Supabase is unconfigured or fails.
 */

export const fetchSehriSpots = async (): Promise<SehriSpot[]> => {
  try {
    // 1. Try Supabase
    if (supabase) {
      const { data, error } = await supabase.from('spots').select('*');

      if (error) {
        console.warn("Supabase fetch error, falling back to local data:", error);
      } else if (data) {
        // @ts-ignore - Supabase types might be inferred loosely, but our schema matches RawSehriSpot
        return data.map(transformRawSpot);
      }
    } else {
      console.log("Supabase not configured (missing env vars). Using local data.");
    }

    // 2. Fallback to Local Data
    return Promise.resolve(SAMPLE_DATA);

  } catch (error) {
    console.error("Unexpected error in spotService:", error);
    return Promise.resolve(SAMPLE_DATA);
  }
};
