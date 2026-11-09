import { SafeStorage, STORAGE_KEYS } from './storage';

export interface DayActivity {
  dateStr: string;
  dayLabel: string; // e.g. "Mon", "Tue"
  isActive: boolean;
  isToday: boolean;
}

export interface ForgivingStreakInfo {
  activeCount: number; // 0 to 7
  totalDays: 7;
  days: DayActivity[];
  encouragingMessage: string;
}

/**
 * Returns YYYY-MM-DD for a given date in local time
 */
export function toLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Record today as an active day in storage
 */
export function recordActiveToday(): void {
  const today = toLocalDateString();
  const current = SafeStorage.getItem<string[]>(STORAGE_KEYS.ACTIVE_DAYS, []);
  if (!current.includes(today)) {
    const updated = [...current, today];
    SafeStorage.setItem(STORAGE_KEYS.ACTIVE_DAYS, updated);
  }
}

/**
 * Compute the forgiving 7-day active days window.
 * Strictly avoids guilt language and never resets to zero.
 */
export function getForgivingStreak(
  referenceDate: Date = new Date(),
  customActiveDays?: string[]
): ForgivingStreakInfo {
  const activeDays = customActiveDays || SafeStorage.getItem<string[]>(STORAGE_KEYS.ACTIVE_DAYS, []);
  const days: DayActivity[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    const isActive = activeDays.includes(dateStr);
    const isToday = i === 0;

    days.push({
      dateStr,
      dayLabel: dayNames[d.getDay()],
      isActive,
      isToday
    });
  }

  const activeCount = days.filter((d) => d.isActive).length;

  let encouragingMessage = 'Welcome back! Ready for a fresh start today? One small step is all it takes.';
  if (activeCount >= 6) {
    encouragingMessage = `${activeCount} of 7 days active. Truly inspiring focus and discipline!`;
  } else if (activeCount >= 4) {
    encouragingMessage = `${activeCount} of 7 days active. Great momentum—you are building lasting habits.`;
  } else if (activeCount >= 2) {
    encouragingMessage = `${activeCount} of 7 days active. Every purposeful pause frees up your mind and energy.`;
  } else if (activeCount === 1) {
    encouragingMessage = 'Active today! Taking a moment to pause is what counts most.';
  }

  return {
    activeCount,
    totalDays: 7,
    days,
    encouragingMessage
  };
}
