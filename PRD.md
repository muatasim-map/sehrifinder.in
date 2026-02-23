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
The initial MVP focuses on four major Indian metropolitan areas with significant Ramadan observances:
- Chennai (Primary Launch Market)
- Bengaluru
- Mumbai
- Hyderabad

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

---

## 6. Technical Architecture & Tech Stack

### 6.1 Frontend
- **Framework:** React 18+ via Vite.
- **Routing:** React Router DOM (v6).
- **Styling:** Tailwind CSS with custom thematic config (Islamic geometric patterns, modern gradients, glassmorphism).
- **Animations:** Framer Motion for layout transitions, micro-interactions, and the cinematic splash screen.
- **Mapping:** Leaflet & React-Leaflet with Marker Clustering.

### 6.2 Backend & Data
- **Database:** Supabase (PostgreSQL) holding relational data for `spots` and `pending_spots`.
- **State Management:** React Context API (`SehriContext`) for global state (City, Filters, Saved Spots) to prevent prop-drilling.
- **Data Transformation:** A dedicated transformer utility (`transformRawSpot`) acts as an anti-corruption layer between the database schema and the frontend UI models.

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
- **User Accounts (v2):** Implement Supabase Auth for consumers to sync saved spots across devices.
- **Real-Time Statuses (v2):** Allow users on the ground to tap "Food Finished" or "Overcrowded" to update the UI dynamically for others.
- **Automated Moderation (v3):** Introduce Edge Functions to auto-reject spam submissions before they reach the admin queue.
- **Multi-lingual Support (v3):** Add Hindi, Tamil, and Urdu localizations.
