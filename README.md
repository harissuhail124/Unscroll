# Unscroll (Digital Well-being PWA)

**Unscroll** is a mobile-first, installable Progressive Web App (PWA) designed for university and college students (boys, ages 16–22, Pakistan) who lose time, mental focus, and energy to habitual doom-scrolling.

Developed as a **Design Thinking Course Project on Digital Well-being**, Unscroll tackles the root psychological causes of doom-scrolling—boredom, stress, loneliness, FOMO, and unconscious loop triggers—rather than relying on punitive screen-time locks.

---

## 🚀 Live Demo & Deployment

* **Live Demo URL**: [https://unscroll-wellbeing.netlify.app](https://unscroll-wellbeing.netlify.app) *(or deploy to your preferred static host following the instructions below)*
* **Repository**: Complete local codebase in workspace root.

### One-Click Deployment Instructions:
Because Unscroll is an offline-first PWA using client-side hash routing (`#pause`, `#swap`, `#reflect`, `#reach`, `#settings`), it can be deployed to any static host with zero backend configuration:

#### Option A: Netlify
1. Run `npm run build`.
2. Drag and drop the generated `dist/` directory into [Netlify Drop](https://app.netlify.com/drop).
3. Your PWA is instantly live with free HTTPS and offline service worker support.

#### Option B: Vercel
1. Run `npx vercel` in the project root.
2. Accept the default settings (Framework: Vite; Output Directory: `dist`).

#### Option C: GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings > Pages** and set source to GitHub Actions or `gh-pages` branch.

---

## 💻 Local Development & Build

### Prerequisites
* **Node.js**: v18+ (tested on Node v24.13.0)
* **npm**: v9+ (tested on npm 11.6+)

### Setup Instructions
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open in browser (mobile viewport 360px recommended)
# http://localhost:3000
```

### Running Automated Tests
```bash
# Run unit tests (streak calculations, check-in metrics, on-device prayer times)
npm test
```

### Production Build & PWA Generation
```bash
# Compiles TypeScript and generates offline service worker in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Core Capabilities (The Four Parts)

1. **Pause (Breaks the habit loop, protects sleep)**:
   - "Before you scroll" root-cause inquiry (*Bored, Stressed, Lonely, Missing out, Just habit*).
   - 30-second calm breathing circle with CSS animation (respects `prefers-reduced-motion`).
   - Optional 33-count tasbih (*SubhanAllah, Alhamdulillah, Allahu Akbar*) with tap counter and haptic feedback.
   - Compassionate post-pause choice: "Swap it" (navigates to Swap with mood) or "I'll scroll anyway" (kind, zero-shame message).
   - Night wind-down checklist: phone charging away from bed, tomorrow's task, slow breathing, plus evening adhkar & istighfar.
   - Live "Next prayer in..." badge computed on-device with Karachi parameters.

2. **Swap (Purposeful replacements for doom-scrolling)**:
   - Mood-based Swap Deck: 1 small 5-minute action at a time with "Another idea" button (at least 5 verified ideas per mood).
   - Daily forgiving quests: Move 10m, Learn 10m, Talk to someone in person (plus prayer on time, read Qur'an page, adhkar).
   - Forgiving streak: Shows active days in the last 7 (never resets to 0, never uses guilt language).

3. **Reflect (Self-awareness, less comparison)**:
   - Drain Meter: Tap *Fine, Drained, Sleepy, Worse* after putting the phone down.
   - 14 Check-In Summary: Proportional stacked bar and metrics of the last 14 sessions.
   - Reality check reminders: 9 rotating cards dismantling toxic social comparison (*"Posts are highlights, not whole lives"*).
   - Private wins / Shukr log: Private on-device diary acknowledging daily progress.

4. **Reach (Connection and real help)**:
   - Reach out templates: 1-tap copy-to-clipboard messages for friends, study, and prayer.
   - Weekly offline challenge: Checkable screen-free challenges.
   - Help Hub: Direct guidance to speak with a trusted friend or campus counselor when feeling low or unsafe; stored local counselor contact field (`[Add campus counselor contact]`).
   - Persistent non-medical disclaimer: *"Unscroll is not a counselor or a medical service."*

---

## 🕌 Verified Islamic Content (Deen Features)

* **Faith Features Switch**: ON by default for this build, can be toggled off cleanly in Settings so the app remains completely accessible to anyone.
* **On-Device Prayer Calculation**: Uses the open-source `adhan` library with the **Karachi (University of Islamic Sciences)** method. Supports Hanafi (Pakistan standard) and Standard (Shafi'i/Maliki/Hanbali) Asr juristic options. Zero location data leaves the device.
* **Verified Qur'anic Verses**: 22 curated short ayat (including **Qur'an 13:28**) bundled offline from Tanzil.net and Quran.com with Uthmani Arabic script, English translations, and exact surah/ayah citations.
* **Authentic Adhkar**: Morning, evening, and bedtime adhkar with verified Hadith collection names, numbers, and grades (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' at-Tirmidhi).
* **Local Classical Typography**: Arabic text rendered with the bundled **Amiri** Naskh font (`@fontsource/amiri`) with full RTL support.
* **Full Audit Log**: Complete text references cataloged in [`CONTENT_REVIEW.md`](./CONTENT_REVIEW.md).

---

## 🛡️ Safety & Privacy by Design

* **No Accounts, No Logins, No Passwords**: Starts instantly.
* **No Telemetry, No Analytics, No Third-Party Tracking**: Zero external network calls.
* **Zero Guilt, Zero Shame**: No red timers counting "wasted hours", no punitive alarms, no broken streaks.
* **No Photo Uploads**: Honor-system quests with zero proof-of-work pictures required.
* **1-Tap Help Hub**: Accessible from the top header on every screen.
* **"Clear my data"**: 1-tap complete local storage wipe in Settings.
* **Full Audit**: Documented in [`SAFETY_BY_DESIGN.md`](./SAFETY_BY_DESIGN.md).

---

## 🚫 Out of Scope & Future Work (Section 8)

As defined in the project scope, the following capabilities are explicitly out of scope for this web application:
1. **Blocking Other Native Apps**: A browser application cannot natively intercept or kill third-party mobile apps (e.g. TikTok, Instagram, YouTube) due to mobile OS sandboxing (Android/iOS). *This is stated as future work for a native Kotlin/Swift sidecar or Android Accessibility Service companion.*
2. **User Accounts & Cloud Sync**: Intentionally excluded to maintain 100% on-device student privacy and zero data leakage.
3. **Friend Groups, Social Feeds & Leaderboards**: Excluded to prevent creating another toxic comparison loop.
4. **Backend Databases & Central Telemetry**: Excluded to ensure zero institutional surveillance.
5. **AI Chatbots**: Excluded in favor of immediate, actionable somatic pauses and human-to-human connection.
6. **Server Push Notifications**: Replaced with optional, privacy-preserving local browser notifications.

---

## 📚 Project Documentation Directory

- [`USER_GUIDE.md`](./USER_GUIDE.md): One-page student guide on installation and tab walkthrough.
- [`FEATURE_EVIDENCE.md`](./FEATURE_EVIDENCE.md): Matrix mapping features to survey figures (n=17) and root causes.
- [`SAFETY_BY_DESIGN.md`](./SAFETY_BY_DESIGN.md): Detailed compliance with the four safety & privacy rules.
- [`CONTENT_REVIEW.md`](./CONTENT_REVIEW.md): Complete audit catalog of all 22 ayat, adhkar, quiz questions, and Hadith grades.
- [`DECISIONS.md`](./DECISIONS.md): Architectural decisions log.
- [`TESTING.md`](./TESTING.md): Vitest automated test report and manual verification checklist.
