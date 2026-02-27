# Product Requirements Document (PRD) 
**Product Name:** Sehri Finder  
**Document Version:** 1.0  
**Date:** February 2026  

---

## 1. Executive Summary & Vision
Sehri Finder is a specialized, mobile-optimized web application designed to help Muslims locate, filter, and share venues offering Sehri (pre-dawn meals) during the holy month of Ramadan. 

**Vision:** To build the most reliable, community-driven directory that ensures no one misses their pre-dawn meal by connecting seekers with both charitable efforts (Sadaqah) and commercial food options.

## 2. Problem Statement
During Ramadan, locating open restaurants or masjids offering Sehri late at night (2:00 AM - 4:30 AM) is notoriously difficult. Information is fragmented across WhatsApp groups, word-of-mouth, and outdated social media posts. Travelers, students residing in hostels, and hospital patients' caretakers are particularly vulnerable to missing these meals due to a lack of accessible, verified, local information.

## 3. Target Audience & Personas
The application categorizes and serves several distinct subgroups, often identified via specific "Target Audience" tags on individual listing cards (e.g., Hospital Patients, Caretakers, Students).

**The Seekers (Consumers)**
- **Students & Hostel/PG Residents:** Young adults, often non-natives, living away from families who rely on nearby masjids or delivery services (identified via "StudentFriendly" or "Students" tags).
- **Hospital Patients & Caretakers:** Individuals stationed at major hospitals (e.g., Jayadeva, Omandur) who cannot leave the premises. The app highlights NGOs and foundations delivering directly to these demographics (identified via "HospitalSupport", "Patients", "Caretakers" tags).
- **Working Professionals & Expats:** Night-shift workers or expatriates seeking late-night dining options or subscription-based meal plans for the entire month.
- **Travelers & General Public:** People in transit or families seeking high-quality paid restaurant experiences (identified via "TravelerSupport" or "FamilyFriendly" tags).
- **The Beneficiary (Underprivileged):** Individuals relying on strictly "Free (Sadaqah)" meals provided by the community.

**The Contributors & Curators**
- **The Contributor (Community):** Local volunteers, mosque committee members, or restaurant owners who want to amplify the reach of their Sehri provisions.
- **The Curator (Admin):** The product team responsible for maintaining high data fidelity, preventing spam, and approving community submissions.

## 4. Scope & Supported Cities
The platform has evolved from its initial 4-city MVP into a global directory covering **19+ cities across 5 countries** (India, UK, USA, Canada, Malaysia), including major hubs like:
- **India:** Chennai, Bengaluru, Mumbai, Hyderabad.
- **UK:** London.
- **USA:** New York, San Francisco, Chicago, Houston, Detroit.
- **Canada:** Toronto, Edmonton, Montreal, Brampton, Calgary, Ottawa, Cambridge, Kanata.
- **Malaysia:** Kuala Lumpur.

---

## 5. Core Features & Requirements

### 5.1 Consumer Features (The "Find" Flow)
- **REQ-01 Geographic Filtering:** Users must be able to select a City and drill down to specific Areas/Zones.
- **REQ-02 Conditional Rendering (List vs. Map):** Users can toggle between a card-based List View and an interactive Map View. Map View must utilize marker clustering (via `react-leaflet-cluster`) for performance on dense datasets.
- **REQ-03 Granular Filtering:** Users can filter listings by:
  - Venue Type (Masjid, Restaurant, Foundation, etc.)
  - Food Economics (Free/Sadaqah vs. Paid)
  - Features (e.g., Ladies Friendly, Delivery Available, Hospital Support).
- **REQ-04 Near Me (Geolocation):** An HTML5 geolocation prompt that, upon approval, utilizes the Haversine formula to calculate the distance to all spots and sorts the dataset by closest proximity.
- **REQ-05 Save/Bookmark:** Users must be able to save spots to local storage for quick access without requiring user authentication.

### 5.2 Contributor Features (The "Submit" Flow)
- **REQ-06 Frictionless Submission:** A public form to submit new spots. Mandatory fields include Name, City, Area, Venue Type, Food Type, and Approximate Timings.
- **REQ-07 Dual-Homing Data Submission:** Submissions must post to a backend database (`pending_spots`) AND generate a pre-filled WhatsApp intent as a notification/failsafe.

### 5.3 Administrative Features (The "Curation" Flow)
- **REQ-08 Secure Access:** A hidden route (`/admin`) or easter egg shortcut (`Shift + A`) secured by authentication.
- **REQ-09 Review Dashboard:** A table/list of all `pending_spots` with options to Edit, Approve, or Reject.
- **REQ-10 Approval Mechanism:** Approving a spot alters its state in the database and pushes it to the live public dataset fed to consumers.

### 5.4 Advanced & SEO Features
- **REQ-11 Programmatic SEO:** Dynamic meta-tag injection and static site generation (SSG) for all 19+ cities to capture hyper-local search volume.
- **REQ-12 Schema.org Domination:** Comprehensive JSON-LD implementation for `FAQPage`, `LocalBusiness`, and `BreadcrumbList` to achieve rich results.
- **REQ-13 Live Sehri Countdown:** Real-time countdown widget to the next Fajr/Suhoor deadline per city.
- **REQ-14 PWA Support:** Fully installable progressive web app with offline fallback pages and caching via `vite-plugin-pwa`.
- **REQ-15 E-E-A-T Signals:** "Community Verified" badges and "Live Update" banners to signify human curation and build trust (Experience-Expertise-Authoritativeness-Trustworthiness).

---

## 6. Technical Architecture & Tech Stack

### 6.1 Frontend
- **Framework:** React 19 (Latest stable release).
- **Routing:** React Router DOM (v7).
- **Styling:** Tailwind CSS (v4) with vanilla CSS layer-based tokenization.
- **Animations:** Framer Motion (v12) for volumetric lanterns, cinematic lighting, and 2D globe renders.
- **Mapping:** Leaflet & React-Leaflet with aggressive Marker Clustering and custom Islamic tile patterns.
- **Architecture:** Static Site Generation (SSG) using headless Chrome for zero-JS tax on social crawlers.

### 6.2 Backend & Data
- **Database:** Supabase (PostgreSQL) + Edge Functions for moderation.
- **State Management:** React Context API for cross-city hydration and filter persistence.
- **Analytics:** Vercel Web Analytics, Speed Insights, and real-time INP (Interaction to Next Paint) monitoring.

### 6.3 Infrastructure & DevOps
- **Hosting:** Vercel (Free Tier).
- **Analytics:** Vercel Web Analytics & Speed Insights integration.
- **Performance:** Optimized for mobile connections; lazy-loading of heavy components (Map).

---

## 7. Data Models

### 7.1 Core Spot Schema (`public.spots`)
| Field | Type | Description |
|-------|------|-------------|
| `location_id` | INT (PK) | Unique Identifier |
| `venue_name` | TEXT | Display name of the location |
| `city` | TEXT | Primary metropolitan area (ENUM) |
| `primary_area` | TEXT | Neighborhood / Locality |
| `venue_type` | TEXT | Masjid, Restaurant, Hotel, NGO |
| `food_type` | TEXT | Free, Paid, Partially Paid |
| `timing` | JSONB | `{ "start": "03:00", "end": "04:30" }` |
| `latitude`/`longitude` | FLOAT | For Map rendering and Haversine math |
| `features` | TEXT[] | Array of tags (e.g., `["PreBookingRequired", "LadiesFriendly"]`) |
| `target_audience` | TEXT[] | Specific groups (e.g., `["Students", "Patients"]`) |
| `google_maps_link` | TEXT | Outbound navigation URL |

---

## 8. Non-Functional Requirements (NFRs)
- **Performance:** The App Page (List View) must reach Time to Interactive (TTI) in under 1.5 seconds on a 4G connection.
- **Accessibility (a11y):** Form fields must have proper labels. Contrast ratios for the primary theme (Emerald/Gold) must meet WCAG AA standards.
- **Resilience:** The submission form must gracefully fallback to the WhatsApp intent if the Supabase POST request fails or times out.
- **SEO Elements:** Dynamic city-specific metadata injection (e.g., "Find verified Sehri spots in Chennai") to capture localized organic search intent.

---

## 9. Success Metrics & KPIs
1. **Acquisition:** Number of Unique Visitors during Ramadan.
2. **Engagement:** 
   - Feature adoption of the "Map View" and "Near Me" toggles.
   - Average session duration.
3. **Conversion (Community):** Number of user-submitted spots via the `/submit` form.
4. **Retention:** Number of returning users (tracked via local storage signatures or analytics cohorts).

---

## 10. Future Roadmap (Post-MVP)
- **Verified Verified Status (v2):** A two-tier verification system where users can upload photos of the menu/masjid to earn "Gold Trust" badges.
- **City Lead Program (v2):** Appoint local community moderators to manage specific city clusters directly.
- **Advanced Social Integration (v2):** Personal Iftar/Suhoor maps that users can share with their private circles via dynamic Open Graph cards.
- **Crowdsourced Real-Time Data (v3):** "Is Nombu Kanji still being served?" — One-tap user polls with 15-minute expiration.
