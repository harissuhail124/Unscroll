import { describe, it, expect } from 'vitest';
import { getPrayerTimes, formatRemainingTime, formatPrayerTime } from '../services/prayerTimes';
import { UserSettings } from '../types';

describe('On-Device Prayer Times Calculation', () => {
  const baseSettings: UserSettings = {
    faithFeatures: true,
    theme: 'light',
    calculationMethod: 'Karachi',
    asrMethod: 'Hanafi',
    city: 'Karachi',
    latitude: 24.8607,
    longitude: 67.0011,
    notificationsEnabled: false,
    campusCounselorContact: '',
    hasSeenFirstRun: true
  };

  it('calculates 5 daily prayers on-device without network calls', () => {
    const fixedDate = new Date(2026, 10, 10, 12, 0, 0); // Nov 10, 2026 at 12:00 PM
    const result = getPrayerTimes(baseSettings, fixedDate);

    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.allPrayers).toHaveLength(5);
    const prayerNames = result.allPrayers.map((p) => p.name);
    expect(prayerNames).toEqual(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']);
    expect(result.nextPrayerName).toBeDefined();
    expect(result.timeRemainingFormatted).toBeDefined();
  });

  it('adjusts Asr prayer time when toggling between Hanafi and Standard juristic methods', () => {
    const fixedDate = new Date(2026, 10, 10, 12, 0, 0);
    const hanafiResult = getPrayerTimes({ ...baseSettings, asrMethod: 'Hanafi' }, fixedDate);
    const standardResult = getPrayerTimes({ ...baseSettings, asrMethod: 'Standard' }, fixedDate);

    expect(hanafiResult).not.toBeNull();
    expect(standardResult).not.toBeNull();

    if (!hanafiResult || !standardResult) return;

    const hanafiAsr = hanafiResult.allPrayers.find((p) => p.name === 'Asr')?.time.getTime();
    const standardAsr = standardResult.allPrayers.find((p) => p.name === 'Asr')?.time.getTime();

    expect(hanafiAsr).toBeDefined();
    expect(standardAsr).toBeDefined();
    // Hanafi Asr (shadow = 2x) occurs later in the afternoon than Standard Shafi'i Asr (shadow = 1x)
    expect(hanafiAsr!).toBeGreaterThan(standardAsr!);
  });

  it('formats remaining duration cleanly into readable string', () => {
    expect(formatRemainingTime(1000 * 60 * 45)).toBe('45m');
    expect(formatRemainingTime(1000 * 60 * 95)).toBe('1h 35m');
    expect(formatRemainingTime(-500)).toBe('now');
  });

  it('formats prayer dates to 12-hour local time', () => {
    const testDate = new Date(2026, 10, 10, 5, 23, 0);
    const formatted = formatPrayerTime(testDate);
    expect(formatted).toMatch(/5:23\s*AM/i);
  });
});
