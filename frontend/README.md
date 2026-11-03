# James Gasang — Developer & UI/UX Engineer Portfolio

A modern, high-performance personal portfolio web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🚀 Features

- **Global Layout & Theme:**
  - Persistent & collapsible left sidemenu for desktop POV, and slide-out mobile drawer for mobile POV.
  - Dark / Light mode toggle with persistent `localStorage` synchronization and zero flicker on page reload.
  - Hardware-accelerated dynamic floating ambient blobs powered by Framer Motion.
  - Interactive custom desktop cursor with fluid spring physics, clickable element scaling, and automatic suppression on touch devices.
  - Sleek custom scrollbars and continuous auto-scrolling tickers with pause-on-hover.
  - URL hash and `localStorage` section persistence with native browser Back/Forward navigation (`popstate` / `hashchange`).

- **Left Sidemenu Component:**
  - **Profile Avatar with Dual State:** Displays a Ghibli-themed illustrated picture by default; hovering smoothly crossfades to reveal James's real photo.
  - **Name & Verification:** James Gasang with Facebook-style blue verification badge.
  - **Handle & Analytics:** `@jdev • [Total Visits Counter]` with session-based visitor incrementation.
  - **Social Links & Theme Toggle:** Direct links to Facebook, LinkedIn, GitHub, and dark/light mode toggle.
  - **Persistent Navigation:** Home, About me, Projects, Tech stacks, Book a Call, Contact.

- **Home Section:**
  - Top banner with "DAILY DRIVERS: Tools I work with" auto-scrolling ticker.
  - Bento Grid layout featuring an Identity Showcase Card and a Featured Project KPI card.
  - **Auto-Scrolling Reel:** Hovering over the Featured Project KPI card triggers a continuous, smooth vertical scrolling loop through application interface mockups.
  - Quick KPI stats, credentials teaser, and service offerings.

- **About Me Section:**
  - Comprehensive bio with dynamically calculated age (24 years old / born June 27, 2002), 4th-year BS IT status, and academic honors.
  - **Progressive Certificate Showcase:** Renders in a grid of 3 items per view/tap, with a "Show More" button revealing 3 more certificates progressively.
  - Interactive certificate verification modal with issuer credentials and validated skills.

- **Projects Section:**
  - KPI project cards organized in a 4-per-row grid (`xl:grid-cols-4`).
  - **Sliding Preview Loop:** Hovering over any project card automatically cycles through sliding preview images in a smooth loop.
  - Filter tabs by category and live search by project name or technology.
  - Direct live demo and GitHub repository links.

- **Tech Stacks Section:**
  - Four distinct categories: **Frontend**, **Backend**, **Tools**, and **Others**.
  - Marquee animation rows:
    - Frontend scrolls continuously to the **left**.
    - Backend scrolls continuously to the **right**.
    - Tools scroll continuously to the **left**.
    - Others scroll continuously to the **right**.
  - Hovering pauses the marquee; clicking any technology opens an inspector card with proficiency, years of experience, and technical details.

- **Book a Call Section:**
  - Calendly-style booking interface with meeting scopes (15m, 30m, 45m), date strip picker, slot selector, timezone detection, attendee form, and animated confirmation with confetti.

- **Contact Section & Privacy Protection:**
  - Secure encrypted contact form with bot honeypot protection.
  - **Privacy Guarantee:** The personal email address (`gasang143x@gmail.com`) is **never exposed or visible to the user** in client-side code or network payloads. It is handled through a secure backend proxy (`api/contact.ts`) via server-side environment variables (`process.env.RECIPIENT_EMAIL`).

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
