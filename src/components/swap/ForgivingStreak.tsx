import React from 'react';
import { ForgivingStreakInfo } from '../../services/streak';

interface ForgivingStreakProps {
  streakInfo: ForgivingStreakInfo;
}

export const ForgivingStreak: React.FC<ForgivingStreakProps> = ({ streakInfo }) => {
  return (
    <section className="card" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-emerald-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Forgiving progress
          </span>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0 0' }}>
            Active days in the last 7: {streakInfo.activeCount} of 7
          </h3>
        </div>
        <span
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--accent-emerald-text)'
          }}
        >
          {streakInfo.activeCount}/7
        </span>
      </div>

      {/* 7-Day Pill Visualizer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          margin: '12px 0 10px'
        }}
      >
        {streakInfo.days.map((day) => (
          <div
            key={day.dateStr}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '6px 2px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: day.isActive ? 'var(--accent-emerald)' : 'var(--bg-card-subtle)',
              color: day.isActive ? '#ffffff' : 'var(--text-muted)',
              border: day.isToday ? '2px solid var(--accent-gold)' : '1px solid transparent',
              transition: 'background-color 0.2s ease'
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>
              {day.dayLabel}
            </span>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: day.isActive ? '#ffffff' : 'var(--border-subtle)',
                marginTop: '4px'
              }}
            />
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
        {streakInfo.encouragingMessage}
      </p>
    </section>
  );
};
