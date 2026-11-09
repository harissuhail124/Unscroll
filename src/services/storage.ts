/**
 * SafeStorage: Resilient client-side storage wrapper.
 * Provides full fallback to in-memory store if localStorage is blocked or fails.
 */

class SafeStorageService {
  private memoryFallback: Map<string, string> = new Map();
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkAvailability();
  }

  private checkAvailability(): boolean {
    try {
      const testKey = '__unscroll_test_storage__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public getItem<T>(key: string, defaultValue: T): T {
    try {
      let raw: string | null = null;
      if (this.isLocalStorageAvailable) {
        raw = window.localStorage.getItem(key);
      } else {
        raw = this.memoryFallback.get(key) || null;
      }

      if (raw === null) {
        return defaultValue;
      }
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`SafeStorage: error reading key "${key}", using default`, e);
      return defaultValue;
    }
  }

  public setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      if (this.isLocalStorageAvailable) {
        window.localStorage.setItem(key, serialized);
      }
      this.memoryFallback.set(key, serialized);
      return true;
    } catch (e) {
      console.warn(`SafeStorage: error writing key "${key}" to localStorage, using memory`, e);
      try {
        this.memoryFallback.set(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
  }

  public removeItem(key: string): boolean {
    try {
      if (this.isLocalStorageAvailable) {
        window.localStorage.removeItem(key);
      }
      this.memoryFallback.delete(key);
      return true;
    } catch (e) {
      console.warn(`SafeStorage: error removing key "${key}"`, e);
      return false;
    }
  }

  public clearAll(): boolean {
    try {
      if (this.isLocalStorageAvailable) {
        window.localStorage.clear();
      }
      this.memoryFallback.clear();
      return true;
    } catch (e) {
      console.warn('SafeStorage: error clearing storage', e);
      return false;
    }
  }
}

export const SafeStorage = new SafeStorageService();

// Standard storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'unscroll_settings',
  CHECK_INS: 'unscroll_checkins',
  WINS: 'unscroll_wins',
  QUEST_STATES: 'unscroll_quest_states',
  WIND_DOWN: 'unscroll_wind_down',
  TASBIH: 'unscroll_tasbih',
  ACTIVE_DAYS: 'unscroll_active_days',
  OFFLINE_CHALLENGE: 'unscroll_offline_challenge'
} as const;
