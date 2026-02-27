# Sehri Finder - User Flow Documentation

## 1. High-Level Overview
**Product Purpose**: Sehri Finder is a specialized web application designed to help users locate, filter, and share venues offering Sehri (pre-dawn meal during Ramadan). It acts as a global, community-driven directory across **19+ cities** in India, UK, USA, Canada, and Malaysia.

**Target Users**:
1. **Consumers (Seekers)**: Individuals (students, travelers, locals) looking for reliable Sehri spots near them.
2. **Contributors (Community Members)**: Users who submit local Sehri spots via the in-app form or WhatsApp.
3. **Administrators (Curators)**: The team responsible for multi-city verification and E-E-A-T signals.

---

## 2. User Personas & Goals
The system is designed to serve several distinct subgroups, categorized by their specific needs and the tags used for indexing:

- **Persona 1: The Devout Student / Hostel Resident**
  - *Goal:* Find free, local masjid-based Sehri spots near their accommodation.
  - *Context:* Often non-natives living in PGs or hostels without cooking facilities.
  - *Needs:* Filtering by "Free (Sadaqah)" and venue types like "Masjid".
- **Persona 2: The Hospital Caretaker / Patient**
  - *Goal:* Locate spots that deliver to or are within walking distance of major hospitals.
  - *Context:* Stations at hospitals (e.g., Jayadeva, Omandur) unable to leave their wards for long.
  - *Needs:* Identification of "HospitalSupport" spots and dedicated NGO distributions.
- **Persona 3: The Working Professional / Expat**
  - *Goal:* Find reliable, high-quality restaurant Sehri or subscription plans.
  - *Needs:* Filtering by "Restaurant" or "Paid", viewing menus and contact details for booking.
- **Persona 4: The Local Volunteer (Contributor)**
  - *Goal:* Amplify a neighborhood association's free meal distribution.
  - *Needs:* Quick, mobile-friendly submission process to get data into the public directory.
- **Persona 5: The System Admin (Curator)**
  - *Goal:* Moderate submissions to ensure high data fidelity and prevent local misinformation.
  - *Needs:* Verification tools, edit-on-the-fly capabilities, and secure dashboard access.

---

## 3. Entry Points into the System
1. **Landing Page (`/`):** The primary marketing entry point. Introduces the value proposition and prompts city selection.
2. **Deep Links to Cities (`/find/:city`):** Users sharing links to specific city directories (e.g., `/find/chennai`).
3. **Direct App Access (`/find`):** Returning users navigating directly to the main application interface.
4. **Direct Submission Link (`/submit`):** Shared via social media to encourage community contributions.
5. **Admin Portal (`/admin`):** Accessed directly via URL or via an easter egg keyboard shortcut (`Shift + A`).

---

## 4. Detailed Step-by-Step Flows

### Flow A: The Consumer Flow (Finding a Spot)
**Description:** A user searches for, filters, and saves a spot for Sehri.

1. **User Action**: Explores the Landing Page and clicks "Enter App" or selects a city.
   - *System Response*: Routes user to `/find/:city`. The app utilizes **Static Site Generation (SSG)** to provide immediate SEO-rich content. The client-side hydration then takes over, fetching real-time data from Supabase.
2. **User Action**: Toggles to Map View or navigates via the 2D Globe.
   - *System Response*: 
     - If Map View: Renders `MapView` with `MarkerClusterGroup` for clustering points.
     - If Globe View: Renders a cinematic 2D globe with country-specific highlights.
3. **User Action**: Opens Filter Bar and selects "Free (Sadaqah)" or clicks "Near Me".
   - *System Response*: 
     - Standard Filters: Instantly applies filters to the Context-managed spot array.
     - Near Me: Requests HTML5 Geolocation, calculates distances via the Haversine formula, and sorts by proximity.
4. **User Action:** Clicks the "Save" (Heart) icon on a specific card.
   - *System Response:* Adds the spot ID to `savedSpotIds` in LocalStorage, updates tab counter.
   - *Data Change:* LocalStorage `sehri_saved_spots` updated.
5. **User Action:** Clicks "Get Directions".
   - *System Response:* Opens a new tab to Google Maps with the venue's coordinates/link.

### Flow B: The Contributor Flow (Submitting a Spot)
**Description:** A user submits a new venue for approval.

1. **User Action:** Clicks "Submit a Spot" from Header or Bottom Nav.
   - *System Response:* Routes to `/submit` and displays the `SubmitSpot` form.
2. **User Action:** Fills out mandatory fields (Name, City, Area, Venue Type, Food Type, Timing).
   - *System Response:* Validates input on the client side.
3. **User Action:** Clicks "Submit Spot".
   - *System Response:* 
     1. Inserts a new record into the `pending_spots` Supabase table with status `pending`.
     2. Generates a pre-filled WhatsApp message.
     3. Redirects the user's browser to WhatsApp Web/App.
   - *Data Change:* New row in `pending_spots`.
   - *Postcondition:* Form resets, user returns to previous page.

### Flow C: The Administrator Flow (Review & Approve)
**Description:** An admin logs in and approves a submitted spot.

1. **User Action:** Presses `Shift + A` on any page or navigates to `/admin`.
   - *System Response:* Shows `AdminLoginPage`.
2. **User Action:** Enters secure password.
   - *System Response:* Validates credentials, sets auth state, routes to `/admin/dashboard`.
3. **User Action:** Views list of `pending_spots`. Clicks on a submission to review.
   - *System Response:* Opens approval modal with editable fields.
4. **User Action:** Modifies formatting if needed, then clicks "Approve".
   - *System Response:* 
     1. Updates Supabase record status to `approved`.
     2. (Optionally) moves data to the main public spots table or updates a unified view.
   - *Data Change:* Status change in database. Spot becomes visible to consumers.

---

## 5. Happy Path Scenarios
- **Seeking Food:** User lands on `/` -> Selects 'Chennai' -> Sees 10 spots -> Filters by 'Masjid' -> Finds 3 spots -> Gets directions to the closest one.
- **Contributing:** User is at their local masjid -> Opens `/submit` on their phone -> Fills out details -> Clicks Submit -> Confirmation sent via WhatsApp -> Admin approves 1 hour later.

---

## 6. Alternate Flows & Edge Cases
- **Empty State (No Results):** If a user applies filters that yield 0 results, the `EmptyState` component is shown with a prompt to "Clear Filters" or "Submit a Spot".
- **Network Failure on Submit:** If the Supabase insert fails, the `catch` block ensures the WhatsApp fallback still triggers, ensuring no data loss for the business process.
- **Unsupported City URL:** If a user visits `/find/newyork`, the app detects it's unsupported and either defaults to the primary city or shows a graceful empty state.
- **Location Permission Denied:** If the user clicks "Near Me" but denies browser location access, a toast notification politely informs them to enable permissions.

---

## 7. Decision Points & Branching Logic
- **Routing Branch:** Does the user have `sessionStorage('hasShownSplash')`? 
  - Yes -> Render `Routes` immediately.
  - No -> Render `SplashScreen` -> on complete -> set storage -> Render `Routes`.
- **View Toggle Branch:** List View vs. Map View. Both rely on the same `filteredData` array but render completely different DOM structures.

---

## 8. Dependencies on External Services
1. **Supabase:** Used as the backend database (PostgreSQL) for storing app data and pending submissions.
2. **Vercel Analytics & Speed Insights:** Integrated for tracking usage metrics and performance.
3. **WhatsApp API:** Used as a notification/fallback mechanism for spot submissions.
4. **Google Maps / URL Intents:** Relied upon for external navigation handoffs.

---

## 9. Security & Authorization Considerations
- **Admin Access:** Currently protected by an application-level login (likely a shared password or simple JWT check). This should ideally move to Supabase Auth (RLS policies) for robust security.
- **Rate Limiting:** Submission forms and admin login endpoints are vulnerable to brute force/spam. Vercel KV rate limiting or Cloudflare protections should be considered.
- **Data Sanitization:** All user inputs in the submission form must be sanitized before rendering on the admin dashboard to prevent XSS.

---

## 10. Performance Considerations
- **Map View Weight:** Map libraries (like Leaflet/Mapbox) are heavy. Dynamic importing/lazy loading is recommended to keep the initial TTI (Time to Interactive) low on mobile devices.
- **Splash Screen Overhead:** The splash screen masks underlying data fetching.
- **Listing Images:** If listing cards include images in the future, they must be rigorously optimized (WebP, Next/Vercel image optimization) to prevent layout shifts and slow loads on 3G networks.

---

## 11. Opportunities for Improvement
- **E-E-A-T Badges (v2)**: Reward users who provide "Live Status" updates with specialized badges.
- **Social Maps (v2)**: User-created collections of "My Favorite Sehri Spots" shareable via OG Image cards.
- **Multi-lingual AI (v3)**: Use Edge Functions to auto-translate descriptions into Arabic, Urdu, and local dialects.

---

## 12. Diagrams (Mermaid)

### Primary Consumer Navigation Flow
```mermaid
graph TD
    A[Landing Page /] -->|Select City| B[App Page /find/:city]
    B -->|Fetch & Transform Data| B2[Load Context State]
    B2 --> C{Toggle View}
    C -->|List| D[Listing Grid View]
    C -->|Map| E[Map View w/ Marker Clusters]
    D --> F{Apply Filters?}
    E --> F
    F -->|Standard Filters| G[Filter by Area/Type]
    F -->|Near Me| G2[Get Geolocation & Haversine Sort]
    G --> H{Results?}
    G2 --> H
    H -->|Yes| I[View Spot Cards]
    H -->|No| J[Show Empty State]
    I --> K[Save Spot to LocalStorage]
    I --> L[Open Google Maps]
```

### Submission & Admin Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Supabase
    participant WhatsApp
    participant Admin

    User->>Frontend: Fills & Submits Spot Form
    Frontend->>Supabase: POST /pending_spots
    alt Success
        Supabase-->>Frontend: 200 OK
    else Failure
        Supabase-->>Frontend: Error
        Frontend->>Frontend: Fallback Mode Active
    end
    Frontend->>WhatsApp: Open Pre-filled Text URL
    Frontend-->>User: Redirect to App Page
    
    Admin->>Frontend: Login (Shift+A)
    Frontend->>Supabase: Fetch pending_spots
    Supabase-->>Frontend: Returns Data
    Admin->>Frontend: Edit & Approve Spot
    Frontend->>Supabase: UPDATE status='approved'
```
