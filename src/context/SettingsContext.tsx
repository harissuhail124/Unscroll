import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSettings, CityPreset } from '../types';
import { SafeStorage, STORAGE_KEYS } from '../services/storage';

export const PAKISTAN_CITIES: CityPreset[] = [
  { name: 'Karachi', latitude: 24.8607, longitude: 67.0011 },
  { name: 'Lahore', latitude: 31.5204, longitude: 74.3587 },
  { name: 'Islamabad', latitude: 33.6844, longitude: 73.0479 },
  { name: 'Rawalpindi', latitude: 33.5651, longitude: 73.0169 },
  { name: 'Peshawar', latitude: 34.0151, longitude: 71.5249 },
  { name: 'Quetta', latitude: 30.1798, longitude: 66.9750 },
  { name: 'Multan', latitude: 30.1575, longitude: 71.5249 },
  { name: 'Faisalabad', latitude: 31.4504, longitude: 73.1350 }
];

export const DEFAULT_SETTINGS: UserSettings = {
  faithFeatures: true, // ON by default as specified in requirements
  theme: 'system',
  calculationMethod: 'Karachi', // Karachi (University of Islamic Sciences)
  asrMethod: 'Hanafi',
  city: 'Karachi',
  latitude: 24.8607,
  longitude: 67.0011,
  notificationsEnabled: false,
  campusCounselorContact: '',
  hasSeenFirstRun: false
};

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  clearAllData: () => void;
  requestGeolocation: () => Promise<boolean>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = SafeStorage.getItem<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    const hasSeenQuery = typeof window !== 'undefined' && window.location.search.includes('seen=1');
    if (hasSeenQuery && !saved.hasSeenFirstRun) {
      return { ...saved, hasSeenFirstRun: true };
    }
    return saved;
  });

  // Apply theme to document
  useEffect(() => {
    const applyTheme = () => {
      let activeTheme = settings.theme;
      if (activeTheme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', activeTheme);
    };

    applyTheme();

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.theme]);

  // Persist settings changes
  const updateSettings = (partial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      SafeStorage.setItem(STORAGE_KEYS.SETTINGS, updated);
      return updated;
    });
  };

  const clearAllData = () => {
    SafeStorage.clearAll();
    setSettings({ ...DEFAULT_SETTINGS, hasSeenFirstRun: true });
    window.location.reload();
  };

  const requestGeolocation = async (): Promise<boolean> => {
    if (!('geolocation' in navigator)) {
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateSettings({
            city: 'Custom Location (GPS)',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          resolve(true);
        },
        (err) => {
          console.warn('Geolocation denied or unavailable', err);
          resolve(false);
        },
        { timeout: 10000 }
      );
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, clearAllData, requestGeolocation }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
