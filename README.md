# Sehri Finder 🌙 | Open Source Ramadan Utility

![Sehri Finder Banner](https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1200&auto=format&fit=crop)

> **A premium, community-driven initiative to verify and map Sehri (pre-dawn meal) locations for the Ummah.**  
> *Built with React 19, TypeScript, and Love.*

---

## 📖 About the Project

**Sehri Finder** was born from a simple problem: *"Where can I eat at 3:30 AM?"*
During Ramadan, finding reliable, open establishments for Sehri is a challenge. WhatsApp forwards are often outdated, and Google Maps doesn't filter by "Open for Sehri".

This project aims to solve that by building a **verified, crowd-sourced digital compass** for Ramadan. We focus on **Trust** (Verified Badges), **Accessibility** (PWA/Offline), and **Beauty** (Islamic Art Direction).

**We are open source and welcome contributors from all backgrounds to help expand this map to more cities!** 🌍

---

## 🛠 Product Requirements (PRD)

### Core Features
1.  **Verified Listings**: Distinguish between "Confirmed Open" and "Unverified" spots.
2.  **Smart Search**: Context-aware search engine.
    *   Input: *"Rice"* → Result: *Restaurants*.
    *   Input: *"Namaz"* → Result: *Masjids*.
3.  **Interactive Geolocation**:
    *   **Near Me**: Sort spots by distance using the Haversine formula.
    *   **Navigation**: Deep linking to Google Maps/Uber.
4.  **Premium Aesthetics**:
    *   Dark Mode by default (CartoDB Dark Matter tiles).
    *   Custom Iconography: Emerald (Free) vs Gold (Paid).
    *   Animations: Framer Motion spring transitions.

### User Personas
*   **The Traveler**: Needs a Masjid for Tahajjud + a nearby place to eat.
*   **The Bachelor**: Looking for free/foundation-sponsored meals.
*   **The Family**: Needs a restaurant with a "Family Section" (Women Friendly).

---

## ⚙️ Technical Architecture

This project uses a modern, lightweight stack optimized for performance and developer experience.

### Tech Stack
*   **Runtime**: React 19 (Functional Components + Hooks).
*   **Language**: TypeScript (Strict Mode).
*   **Build Tool**: Vite 6 (ESBuild).
*   **Styling**: 
    *   Tailwind CSS v4 (using the new `@theme` directive).
    *   Framer Motion (for complex UI transitions).
*   **Maps**: React-Leaflet v5 + OpenStreetMap + MarkerCluster.
*   **State Management**: React Context API (for global Theme/Language) + Local State.

### Directory Structure
```
src/
├── components/      # Reusable UI bricks (Cards, Badges, MapView)
├── context/         # Global state (LanguageProvider)
├── data/            # Static JSON/TS data files for cities (The "Database")
├── hooks/           # Custom hooks (useSpotFilter, useGeolocation)
├── services/        # API integration layer (Supabase - Planned)
└── utils/           # Helpers (Distance calc, LocalStorage wrappers)
```

### Key Technical Decisions
*   **Why no Redux?** The app state is mostly derived from filters/search. `useMemo` and `Context` are sufficient and keep the bundle small (<250kb).
*   **Why Tailwind v4?** For the performance gains and the new CSS-variable based theming engine.

---

## 💻 Developer Guide

Ready to contribute? Follow these steps to set up your local environment.

### 1. Prerequisites
*   Node.js v18+
*   npm or pnpm

### 2. Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/sehri-finder.git

# Navigate to directory
cd sehri-finder

# Install dependencies
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Open `http://localhost:5173` to see the app.

### 4. Building for Production
```bash
npm run build
# The 'dist' folder is now ready for deployment (Vercel/Netlify)
```

---

## 🤝 How to Contribute

We love pull requests! Here are a few ways you can help:

### 🏙️ Add a New City
1.  Duplicate `src/data/chennai.ts`.
2.  Rename it to `your-city.ts`.
3.  Add 5-10 verified spots.
4.  Import and add it to `services/spotService.ts`.
5.  Submit a PR!

### 🐛 Fix Bugs & Polish UI
*   Check the [Issues](https://github.com/yourusername/sehri-finder/issues) tab.
*   Improve accessibility (ARIA labels).
*   Enhance the mobile responsiveness.

### 📝 Guidelines
*   **Commits**: Use semantic commit messages (e.g., `feat: add mumbai data`, `fix: map zoom issue`).
*   **Code Style**: We use ESLint and Prettier. Run `npm run lint` before pushing.

---

## 🗺️ Roadmap

- [x] **Phase 1**: MVP with Static Data (Chennai/Hyderabad).
- [x] **Phase 2**: Premium UI Overhaul & Parallax Headers.
- [ ] **Phase 3**: Supabase Backend for Real-time User Submissions.
- [ ] **Phase 4**: "Iftar Mode" Toggle.

---

## 📄 License

This project is licensed under the **MIT License** - free to use, modify, and distribute for the benefit of the community.

*> "The best of people are those that bring most benefit to the rest of mankind."*
