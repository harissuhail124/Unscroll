import React from 'react';
import { CheckIn, CheckInRating } from '../../types';

interface CheckInBarChartProps {
  checkIns: CheckIn[];
}

export const CheckInBarChart: React.FC<CheckInBarChartProps> = ({ checkIns }) => {
  const recent14 = checkIns.slice(0, 14);
  const total = recent14.length;

  if (total === 0) {
    return (
      <div
        className="card"
        style={{
          padding: '16px',
          textAlign: 'center',
          backgroundColor: 'var(--bg-card-subtle)',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}
      >
        No check-ins recorded yet. Tap a feeling on the Drain Meter above after your next session.
      </div>
    );
  }

  const counts: Record<CheckInRating, number> = {
    Fine: recent14.filter((c) => c.rating === 'Fine').length,
    Drained: recent14.filter((c) => c.rating === 'Drained').length,
    Sleepy: recent14.filter((c) => c.rating === 'Sleepy').length,
    Worse: recent14.filter((c) => c.rating === 'Worse').length
  };

  const colors: Record<CheckInRating, string> = {
    Fine: 'var(--accent-emerald)',
    Drained: 'var(--accent-gold)',
    Sleepy: '#6366f1',
    Worse: '#e11d48'
  };

  return (
    <section className="card" style={{ padding: '18px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
          Last {total} Check-in Summary
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {total} of 14 sessions
        </span>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
        See your pattern over time without judgment.
      </p>

      {/* Stacked Proportional Bar */}
      <div
        style={{
          width: '100%',
          height: '14px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '14px'
        }}
        aria-label={`Proportions: ${counts.Fine} Fine, ${counts.Drained} Drained, ${counts.Sleepy} Sleepy, ${counts.Worse} Worse`}
      >
        {(['Fine', 'Drained', 'Sleepy', 'Worse'] as CheckInRating[]).map((rating) => {
          const widthPct = (counts[rating] / total) * 100;
          if (widthPct === 0) return null;
          return (
            <div
              key={rating}
              style={{
                width: `${widthPct}%`,
                height: '100%',
                backgroundColor: colors[rating],
                transition: 'width 0.4s ease'
              }}
              title={`${rating}: ${counts[rating]} (${Math.round(widthPct)}%)`}
            />
          );
        })}
      </div>

      {/* Breakdown Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
        {(['Fine', 'Drained', 'Sleepy', 'Worse'] as CheckInRating[]).map((rating) => {
          const pct = Math.round((counts[rating] / total) * 100);
          return (
            <div
              key={rating}
              style={{
                padding: '6px 4px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: colors[rating] }}>
                {rating}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {counts[rating]}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                {pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Chronological dots (newest on left) */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          Recent timeline (newest on left):
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {recent14.map((item) => (
            <div
              key={item.id}
              style={{
                flexShrink: 0,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: colors[item.rating]
              }}
              title={`${item.rating} - ${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
