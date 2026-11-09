# Architectural & Design Decisions (DECISIONS.md)

This log documents all technical, design, and product decisions made during the design and implementation of **Unscroll**, as well as the resolution of any ambiguous requirements.

---

### Decision 1: Disk Management and Local NPM Cache
- **Context**: The host machine's `C:` drive had under 100 MB free space, causing `npm install` to fail with `ENOSPC`.
- **Decision**: Redirected npm's cache directory via `.npmrc` to the `E:` drive (`E:\.npm-cache`), which provides over 137 GB of free space, and purged the orphaned cache on `C:`.
- **Rationale**: Keeps the application build self-contained, high-performance, and resilient against host disk constraints without modifying system-wide directories.

---

### Decision 2: Hash-Based Client Routing (`#pause`, `#swap`, `#reflect`, `#reach`, `#settings`)
- **Context**: The application must run as a standalone PWA across diverse static deployment targets (GitHub Pages, Netlify, Vercel, local file preview) with offline service-worker caching.
- **Decision**: Implemented native hash-based routing (`window.location.hash`) rather than browser history path routing.
- **Rationale**: Hash routing requires zero server rewrite configuration, functions identically when opened via direct file or offline PWA shells, and avoids 404 routing traps on static hosts.

---

### Decision 3: Zero-Emoji Policy and Visual Iconography
- **Context**: Section 4 strictly prohibits emojis, AI-generated images, stock photos, and illustrations, specifying text labels or a minimal set of open-source Lucide icons.
- **Decision**: Text is the primary label for all four bottom tabs (`Pause`, `Swap`, `Reflect`, `Reach`) and key interactive buttons. Lucide icons are used sparingly only as complementary accents (e.g., settings cog, close button, checkmark), always paired with accessible text labels or `aria-label` attributes.
- **Rationale**: Ensures a serene, mature, distraction-free interface tailored for focused well-being without visual noise.

---

### Decision 4: SafeStorage Layer with Memory Fallback
- **Context**: Users may open Unscroll in browser private/incognito mode or with third-party cookie/storage block policies that throw `SecurityError` or `QuotaExceededError` on `localStorage.setItem`.
- **Decision**: Built a `SafeStorage` wrapper that wraps all `localStorage` access in `try...catch` blocks and seamlessly falls back to an in-memory dictionary if persistent storage is unavailable.
- **Rationale**: Prevents unexpected app crashes, ensuring 100% functionality even under restricted browser sandbox policies.

---

### Decision 5: On-Device Prayer Calculation Defaults
- **Context**: University students in Pakistan (Karachi, Lahore, Islamabad, Peshawar, Quetta, etc.) follow specific juristic and calculation standards.
- **Decision**: Configured `adhan` to calculate prayer times entirely on the client device using the **Karachi (University of Islamic Sciences)** method by default. Provided an Asr juristic method toggle (Hanafi as common in Pakistan, with Standard Shafi'i/Hanbali/Maliki option).
- **Rationale**: Full compliance with Section 3, zero location data leaves the device, and calculation matches Pakistani university calendars.

---

### Decision 6: Forgiving 7-Day Active Days Counter
- **Context**: Conventional streaks reset to zero on missed days, which psychological research and student surveys show causes shame, guilt, and abandonment of digital well-being apps.
- **Decision**: Implemented an "Active days in the last 7" sliding window tracker.
- **Rationale**: A missed day never zeroes progress; students simply see "5 of 7 days active" with encouraging, kind feedback.

---

### Decision 7: Offline-Bundled Typography (Amiri & Plus Jakarta Sans)
- **Context**: The app must work 100% offline after the initial load, including correct Arabic Naskh rendering with proper RTL alignment.
- **Decision**: Bundled Google Fonts `@fontsource/plus-jakarta-sans` and `@fontsource/amiri` via npm rather than Google Fonts CDN links.
- **Rationale**: Zero external network requests during usage; guarantees immediate, consistent font rendering offline without layout shifts.

---

### Decision 8: Campus Counselor Placeholder
- **Context**: Mental health emergency helplines in Pakistan vary by institution and province, and Section 2.4/5 forbids inventing phone numbers.
- **Decision**: Used the exact placeholder text `[Add campus counselor contact]` for the local contact field. Stored locally on the user's phone with zero network transmission.
- **Rationale**: Strictly preserves student privacy, avoids deceptive or outdated contact information, and respects student autonomy.

---

### Decision 9: Local Bundled JSON for All Islamic Content
- **Context**: Relying on external Quran/Hadith APIs causes runtime failures if university Wi-Fi drops or if users are offline.
- **Decision**: Bundled all 22 verified Quranic verses, authenticated adhkar, and quiz questions directly in local JSON files (`ayat.json`, `adhkar.json`, `quiz.json`) cached by the PWA service worker.
- **Rationale**: Guarantees instant load times and 100% offline reliability without external network latency or privacy leakage.

---

### Decision 10: Non-Intrusive Distress Protocol
- **Context**: Section 5 explicitly instructs: *"If a user writes something in 'My wins' that suggests distress, do nothing clever. Just keep the Help Hub visible."*
- **Decision**: Refrained from adding regex keyword scanners, invasive modals, or automated alerting bots. Kept the 1-tap Help Hub link persistently visible in the top header and within the Reach tab.
- **Rationale**: Preserves user trust and avoids stigmatizing automated reactions while guaranteeing immediate access to real human help.

---

### Decision 11: Calendar-Week-Based Offline Challenge Rotation
- **Context**: Section 2.4 specifies a weekly offline challenge as a checkable card.
- **Decision**: Derived the active challenge index using the calendar week of the month, storing completion state per `YYYY-W{week}` in `SafeStorage`.
- **Rationale**: Automatic weekly rotation without requiring background cron timers or servers, ensuring a fresh challenge each week.

