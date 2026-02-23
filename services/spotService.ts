import { SehriSpot } from '../types';
import { supabase } from '../utils/supabase';
import { transformRawSpot } from '../utils/transformers';

/**
 * SERVICE LAYER - THE INTEGRATION SEAM
 * ------------------------------------
 * Hybrid Implementation:
 * 1. Tries to fetch from Supabase first.
 * 2. Falls back to empty array if Supabase is unconfigured or unavailable.
 */

export const fetchSehriSpots = async (): Promise<SehriSpot[]> => {
  try {
    // 1. Try Supabase
    if (supabase) {
      const { data, error } = await supabase.from('spots').select('*');

      if (error) {
        console.warn("Supabase fetch error, falling back to local data:", error);
      } else if (data) {
        if (import.meta.env.DEV) {
          console.log(`Supabase fetch successful. Found ${data.length} spots.`);
        }

        if (data.length === 0) {
          console.warn("Supabase table is EMPTY.");
          return Promise.resolve([]);
        }

        // @ts-ignore - Supabase types might be inferred loosely, but our schema matches RawSehriSpot
        return data.map(transformRawSpot);
      }
    } else {
      if (import.meta.env.DEV) {
        console.log("Supabase not configured (missing env vars). Using local data.");
      }
    }

    // 2. Fallback
    return Promise.resolve([]);

  } catch (error) {
    console.error("Unexpected error in spotService:", error);
    return Promise.resolve([]);
  }
};
