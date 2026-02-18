
import { SehriSpot } from "./types";
import { CHENNAI_DATA } from "./data/chennai";
import { BANGALORE_DATA } from "./data/bangalore";
import { HYDERABAD_DATA } from "./data/hyderabad";
import { MUMBAI_DATA } from "./data/mumbai";
import { transformRawSpot } from "./utils/transformers";

/**
 * ============================================================================
 * MOCK DATABASE LAYER
 * ============================================================================
 * ⚠️ NOTE FOR DEVELOPERS:
 * This file currently acts as both the Database and the Transformer.
 * 
 * When migrating to Supabase:
 * 1. The Raw Data imports below will become irrelevant.
 * 2. The transformation logic (map) should be moved to `services/spotService.ts` 
 *    or a dedicated `utils/transformers.ts`.
 * 3. SAMPLE_DATA will be replaced by the async response from the DB.
 * ============================================================================
 */

// Combine all datasets with safety fallbacks
const RAW_DATA = [
  ...(CHENNAI_DATA || []),
  ...(BANGALORE_DATA || []),
  ...(HYDERABAD_DATA || []),
  ...(MUMBAI_DATA || [])
];

/**
 *  DATA TRANSFORMATION LAYER
 *  Maps Raw DB (Snake Case) -> UI Model (Camel Case)
 */
export const SAMPLE_DATA: SehriSpot[] = RAW_DATA.map(transformRawSpot);


