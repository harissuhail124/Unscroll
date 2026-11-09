# Safety by Design Documentation (SAFETY_BY_DESIGN.md)

Unscroll was architected from the first line of code according to strict digital ethics, youth mental health guidelines, and safety-by-design principles. This document outlines how Unscroll implements the four non-negotiable safety requirements specified in Section 5.

---

## 1. Zero Tracking, Zero Surveillance, 100% On-Device Privacy

### Requirement:
> No accounts, no login, no analytics, no tracking, no third-party scripts, no network calls for core features. All data stays in localStorage or IndexedDB on the device. No identifiable mental-health data is ever sent anywhere. No admin dashboard. No monitoring of individuals by staff or parents.

### How Unscroll Meets This:
* **No Authentication & No Accounts**: Users do not enter an email, phone number, username, or password. There is no user identity system.
* **100% Local Persistence (`SafeStorage`)**: All user state—check-in logs, personal wins/Shukr items, daily quest ticks, bedtime wind-down checks, and campus counselor details—is written strictly to browser `localStorage` with an automatic in-memory fallback.
* **Zero Network Calls for Core Functionality**:
  * Prayer times are computed on the client processor using `adhan` with local mathematical equations.
  * Geolocation (if allowed) is processed by the browser's native API; coordinates remain on the device and are never sent to any geocoding backend.
  * All Qur'anic verses (22 verified ayat) and authentic adhkar are bundled directly inside the local application build (`ayat.json`, `adhkar.json`).
* **Zero Analytics & Third-Party SDKs**: No Google Analytics, no Facebook Pixel, no Sentry, and no ad networks are included in `index.html` or `package.json`.
* **Zero Surveillance**: There is no admin panel, telemetry endpoint, or parental/institutional dashboard. Students cannot be monitored or audited by university staff, teachers, or parents.

---

## 2. Compassionate, Zero-Shame Experience & Forgiving Progression

### Requirement:
> No shaming language anywhere. No "you wasted X hours" messages. No red warnings about screen time. Missed days are never punished.

### How Unscroll Meets This:
* **No Guilt Messages or Red Alarms**: Unscroll never displays messages like *"You wasted 4 hours"* or *"Screen time limit exceeded!"*.
* **Compassionate Pause Exit ("I'll scroll anyway")**: If a student chooses to continue scrolling after a pause, the app responds with warmth and understanding:
  > *"No shame, no guilt. Taking a deliberate pause before scrolling is already a big step. Be gentle with yourself, and remember you can put the phone down whenever you feel ready."*
* **Forgiving 7-Day Active Days Tracker**:
  * Instead of a fragile streak that resets to day 0 if a student misses a day, Unscroll uses a rolling 7-day sliding window: *"Active days in the last 7: X of 7"*.
  * If a student is inactive for days and returns, they are welcomed with encouragement: *"Welcome back! Ready for a fresh start today? One small step is all it takes."*
  * Missed days are unshaded and never highlighted with red error states or penalty banners.

---

## 3. Zero Proof-of-Work & No Media Intrusions

### Requirement:
> No photo uploads or proof-of-work pictures.

### How Unscroll Meets This:
* **No File/Camera Input Handlers**: There are no `<input type="file">`, camera permissions, or photo upload mechanisms anywhere in the application.
* **Autonomous Student Trust**: Daily quests (e.g., *Move 10 minutes*, *Talk to someone face to face*, *Read one page*) are checked off honor-system style. Students use Unscroll for their own well-being, not to prove their productivity to an algorithm.
* **Distraction-Free Visuals**: The UI contains zero AI-generated images, zero stock photos, and zero emojis, preventing visual overstimulation.

---

## 4. Universal Help Hub, Transparency & Non-Clinical Disclaimer

### Requirement:
> A Help Hub reachable in one tap from every screen (small persistent link in the header or settings). "Clear my data" button that deletes everything on the device. First-run screen in plain language. If a user writes something in "My wins" that suggests distress, do nothing clever. Just keep the Help Hub visible. Footer note: "Unscroll is not a counselor or a medical service."

### How Unscroll Meets This:
* **1-Tap Persistent Help Hub**: A dedicated "Help Hub" button is pinned in the persistent top header across all views (`Pause`, `Swap`, `Reflect`, `Reach`, `Settings`). Tapping it instantly opens supportive guidance and campus counselor contact details.
* **Campus Counselor Stored Locally**: A text input allows students to save their campus counselor's name or room number on their phone, pre-filled with the exact placeholder `[Add campus counselor contact]`. No helplines or phone numbers are fabricated.
* **Plain-Language First-Run Onboarding (`FirstRunModal`)**: Displays on the very first launch, clearly explaining:
  1. What Unscroll does (mindful digital well-being companion).
  2. That all data stays 100% on the device.
  3. The explicit disclaimer: *"Unscroll is not a counselor or a medical service."*
* **Distress Input Handling**: If a student writes words of despair or distress in "My wins / Shukr", Unscroll *does nothing clever*—it performs no invasive keyword profiling, triggers no alarming popups, and dispatches no alerts. Instead, it respects user privacy while keeping the persistent Help Hub link visibly accessible at the top of the screen at all times.
* **Complete Data Deletion ("Clear my data")**: Located in Settings with a confirmation safeguard. Tapping "Yes, delete all" triggers `SafeStorage.clearAll()` which purges all local storage keys and resets the application to a pristine state.
* **Ubiquitous Non-Medical Disclaimer**: Displayed in the First-Run Modal, the Help Hub, the Settings view, and the Reach tab footer:
  > *"Unscroll is not a counselor or a medical service."*
