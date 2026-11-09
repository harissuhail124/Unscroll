import * as adhan from 'adhan';
import { UserSettings } from '../types';

export interface NextPrayerInfo {
  currentPrayerName: string;
  nextPrayerName: string;
  nextPrayerTime: Date;
  timeRemainingFormatted: string;
  allPrayers: {
    name: string;
    time: Date;
    timeFormatted: string;
    isNext: boolean;
  }[];
}

/**
 * Format a Date object to "5:23 AM" style string
 */
export function formatPrayerTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

/**
 * Format duration between now and target date into "1h 25m" or "42m"
 */
export function formatRemainingTime(ms: number): string {
  if (ms <= 0) return 'now';
  const totalMinutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Calculate accurate prayer times on-device using Karachi calculation parameters
 */
export function getPrayerTimes(settings: UserSettings, date: Date = new Date()): NextPrayerInfo | null {
  try {
    const coordinates = new adhan.Coordinates(settings.latitude, settings.longitude);
    const params = adhan.CalculationMethod.Karachi();

    if (settings.asrMethod === 'Hanafi') {
      params.madhab = adhan.Madhab.Hanafi;
    } else {
      params.madhab = adhan.Madhab.Shafi;
    }

    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    const nextPrayerKey = prayerTimes.nextPrayer();
    const currentPrayerKey = prayerTimes.currentPrayer();

    // Map adhan names to clean labels
    const prayerMap: Record<string, string> = {
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      none: 'Fajr'
    };

    let nextName = prayerMap[nextPrayerKey] || 'Fajr';
    let nextTime = prayerTimes.timeForPrayer(nextPrayerKey) || prayerTimes.fajr;

    // If all prayers for today have passed, next prayer is tomorrow's Fajr
    if (nextPrayerKey === 'none' || !nextTime || nextTime.getTime() < date.getTime()) {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowTimes = new adhan.PrayerTimes(coordinates, tomorrow, params);
      nextName = 'Fajr';
      nextTime = tomorrowTimes.fajr;
    }

    const diffMs = nextTime.getTime() - date.getTime();
    const remaining = formatRemainingTime(diffMs);

    const prayerList = [
      { name: 'Fajr', time: prayerTimes.fajr, timeFormatted: formatPrayerTime(prayerTimes.fajr), isNext: nextName === 'Fajr' },
      { name: 'Dhuhr', time: prayerTimes.dhuhr, timeFormatted: formatPrayerTime(prayerTimes.dhuhr), isNext: nextName === 'Dhuhr' },
      { name: 'Asr', time: prayerTimes.asr, timeFormatted: formatPrayerTime(prayerTimes.asr), isNext: nextName === 'Asr' },
      { name: 'Maghrib', time: prayerTimes.maghrib, timeFormatted: formatPrayerTime(prayerTimes.maghrib), isNext: nextName === 'Maghrib' },
      { name: 'Isha', time: prayerTimes.isha, timeFormatted: formatPrayerTime(prayerTimes.isha), isNext: nextName === 'Isha' }
    ];

    return {
      currentPrayerName: prayerMap[currentPrayerKey] || 'None',
      nextPrayerName: nextName,
      nextPrayerTime: nextTime,
      timeRemainingFormatted: remaining,
      allPrayers: prayerList
    };
  } catch (e) {
    console.warn('Error calculating prayer times', e);
    return null;
  }
}
