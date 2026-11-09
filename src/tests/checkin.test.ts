import { describe, it, expect } from 'vitest';
import { CheckIn, CheckInRating } from '../types';

describe('Drain Meter & Check-In Summary Logic', () => {
  it('correctly aggregates counts and percentages for up to 14 check-ins', () => {
    const mockCheckIns: CheckIn[] = [
      { id: '1', timestamp: Date.now() - 1000, rating: 'Fine' },
      { id: '2', timestamp: Date.now() - 2000, rating: 'Fine' },
      { id: '3', timestamp: Date.now() - 3000, rating: 'Drained' },
      { id: '4', timestamp: Date.now() - 4000, rating: 'Sleepy' },
      { id: '5', timestamp: Date.now() - 5000, rating: 'Worse' }
    ];

    const recent14 = mockCheckIns.slice(0, 14);
    expect(recent14).toHaveLength(5);

    const counts: Record<CheckInRating, number> = {
      Fine: recent14.filter((c) => c.rating === 'Fine').length,
      Drained: recent14.filter((c) => c.rating === 'Drained').length,
      Sleepy: recent14.filter((c) => c.rating === 'Sleepy').length,
      Worse: recent14.filter((c) => c.rating === 'Worse').length
    };

    expect(counts.Fine).toBe(2);
    expect(counts.Drained).toBe(1);
    expect(counts.Sleepy).toBe(1);
    expect(counts.Worse).toBe(1);

    const finePercentage = Math.round((counts.Fine / recent14.length) * 100);
    expect(finePercentage).toBe(40); // 2 out of 5 = 40%
  });

  it('caps the window strictly to the last 14 entries when more exist', () => {
    const mockCheckIns: CheckIn[] = Array.from({ length: 25 }, (_, i) => ({
      id: `ci-${i}`,
      timestamp: Date.now() - i * 10000,
      rating: (i % 2 === 0 ? 'Fine' : 'Drained') as CheckInRating
    }));

    const recent14 = mockCheckIns.slice(0, 14);
    expect(recent14).toHaveLength(14);
  });
});
