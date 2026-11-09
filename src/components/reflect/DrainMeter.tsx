import React, { useState } from 'react';
import { CheckInRating, CheckIn } from '../../types';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { recordActiveToday } from '../../services/streak';

interface DrainMeterProps {
  onCheckInAdded: () => void;
}

const RATINGS: { rating: CheckInRating; label: string; desc: string; color: string; bg: string }[] = [
  { rating: 'Fine', label: 'Fine', desc: 'Alert & normal', color: 'var(--accent-emerald)', bg: 'var(--accent-emerald-subtle)' },
  { rating: 'Drained', label: 'Drained', desc: 'Mental fatigue', color: 'var(--accent-gold)', bg: 'var(--accent-gold-subtle)' },
  { rating: 'Sleepy', label: 'Sleepy', desc: 'Heavy eyes & sluggish', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)' },
  { rating: 'Worse', label: 'Worse', desc: 'Regret, fomo or low', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.12)' }
];

export const DrainMeter: React.FC<DrainMeterProps> = ({ onCheckInAdded }) => {
  const [recentRating, setRecentRating] = useState<CheckInRating | null>(null);

  const handleSelectRating = (rating: CheckInRating) => {
    const newCheckIn: CheckIn = {
      id: `ci-${Date.now()}`,
      timestamp: Date.now(),
      rating
    };

    const currentList = SafeStorage.getItem<CheckIn[]>(STORAGE_KEYS.CHECK_INS, []);
    const updated = [newCheckIn, ...currentList].slice(0, 100); // keep last 100 max
    SafeStorage.setItem(STORAGE_KEYS.CHECK_INS, updated);

    recordActiveToday();
    onCheckInAdded();
    setRecentRating(rating);
    setTimeout(() => setRecentRating(null), 3000);
  };

  return (
    <section className="card" style={{ padding: '18px 16px' }}>
      <div style={{ marginBottom: '12px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Post-session self-awareness
        </span>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 0' }}>
          Drain Meter
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          How do you feel after putting your phone down? Tap one:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {RATINGS.map(({ rating, label, desc, color, bg }) => (
          <button
            key={rating}
            onClick={() => handleSelectRating(rating)}
            className="btn btn-secondary"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '12px',
              border: recentRating === rating ? `2px solid ${color}` : '1px solid var(--border-subtle)',
              backgroundColor: recentRating === rating ? bg : 'var(--bg-card-subtle)',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color }}>
              {label}
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {desc}
            </span>
          </button>
        ))}
      </div>

      {recentRating && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: 'var(--accent-emerald-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            color: 'var(--accent-emerald-text)',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          Check-in recorded. Tuning into your post-scroll state breaks the autopilot habit.
        </div>
      )}
    </section>
  );
};
