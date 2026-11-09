export type TabKey = 'pause' | 'swap' | 'reflect' | 'reach';

export type Mood = 'Bored' | 'Stressed' | 'Lonely' | 'Missing out' | 'Just habit';

export type CheckInRating = 'Fine' | 'Drained' | 'Sleepy' | 'Worse';

export interface CheckIn {
  id: string;
  timestamp: number;
  rating: CheckInRating;
}

export interface WinItem {
  id: string;
  timestamp: number;
  text: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  isFaith?: boolean;
}

export type ThemeMode = 'system' | 'light' | 'dark';
export type AsrJuristicMethod = 'Standard' | 'Hanafi';

export interface CityPreset {
  name: string;
  latitude: number;
  longitude: number;
}

export interface UserSettings {
  faithFeatures: boolean;
  theme: ThemeMode;
  calculationMethod: 'Karachi';
  asrMethod: AsrJuristicMethod;
  city: string;
  latitude: number;
  longitude: number;
  notificationsEnabled: boolean;
  campusCounselorContact: string;
  hasSeenFirstRun: boolean;
}

export interface WindDownState {
  phoneAway: boolean;
  tomorrowTask: string;
  slowBreathing: boolean;
  eveningAdhkar: boolean;
  istighfar: boolean;
  dateStr: string; // YYYY-MM-DD
}

export interface TasbihState {
  count: number;
  cycle: number; // 0: SubhanAllah, 1: Alhamdulillah, 2: Allahu Akbar
  freeCount: number;
}
