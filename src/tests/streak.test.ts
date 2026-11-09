import { describe, it, expect } from 'vitest';
import { getForgivingStreak, toLocalDateString } from '../services/streak';

describe('Forgiving Streak Service', () => {
  it('formats dates as YYYY-MM-DD correctly', () => {
    const fixedDate = new Date(2026, 10, 10); // Nov 10, 2026
    const str = toLocalDateString(fixedDate);
    expect(str).toBe('2026-11-10');
  });

  it('calculates 0 of 7 active days when no activity is logged', () => {
    const fixedDate = new Date(2026, 10, 10);
    const result = getForgivingStreak(fixedDate, []);
    expect(result.activeCount).toBe(0);
    expect(result.totalDays).toBe(7);
    expect(result.days).toHaveLength(7);
    expect(result.encouragingMessage).toContain('Welcome back');
    // Ensure zero shame / guilt language
    expect(result.encouragingMessage.toLowerCase()).not.toContain('broken');
    expect(result.encouragingMessage.toLowerCase()).not.toContain('lost');
    expect(result.encouragingMessage.toLowerCase()).not.toContain('failed');
  });

  it('calculates active days within the rolling 7-day window without resetting to zero', () => {
    const fixedDate = new Date(2026, 10, 10);
    // Active on today, 2 days ago, and 4 days ago
    const activeDates = ['2026-11-10', '2026-11-08', '2026-11-06'];
    const result = getForgivingStreak(fixedDate, activeDates);
    expect(result.activeCount).toBe(3);
    expect(result.encouragingMessage).toContain('3 of 7 days active');
  });

  it('ignores activity older than 7 days without penalizing current progress', () => {
    const fixedDate = new Date(2026, 10, 10);
    // 2026-10-01 is 40 days ago, 2026-11-10 is today
    const activeDates = ['2026-10-01', '2026-11-10'];
    const result = getForgivingStreak(fixedDate, activeDates);
    expect(result.activeCount).toBe(1);
    expect(result.encouragingMessage).toContain('Active today');
  });

  it('recognizes 7 of 7 full active days with celebration copy', () => {
    const fixedDate = new Date(2026, 10, 10);
    const all7Days = [
      '2026-11-10',
      '2026-11-09',
      '2026-11-08',
      '2026-11-07',
      '2026-11-06',
      '2026-11-05',
      '2026-11-04'
    ];
    const result = getForgivingStreak(fixedDate, all7Days);
    expect(result.activeCount).toBe(7);
    expect(result.encouragingMessage).toContain('7 of 7 days active');
  });
});
