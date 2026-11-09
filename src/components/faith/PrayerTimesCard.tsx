import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { getPrayerTimes } from '../../services/prayerTimes';
import { GeometricAccent } from '../common/GeometricAccent';

export const PrayerTimesCard: React.FC = () => {
  const { settings } = useSettings();
  const prayerInfo = getPrayerTimes(settings);

  if (!prayerInfo) return null;

  return (
    <section className="card" style={{ padding: '18px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.04} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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
            Karachi Method ({settings.asrMethod})
          </span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '2px 0 0' }}>
            Daily Prayer Times
          </h3>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {settings.city}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
        {prayerInfo.allPrayers.map((prayer) => (
          <div
            key={prayer.name}
            style={{
              padding: '8px 4px',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              backgroundColor: prayer.isNext ? 'var(--accent-emerald)' : 'var(--bg-card-subtle)',
              color: prayer.isNext ? '#ffffff' : 'var(--text-primary)',
              border: prayer.isNext ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 700, opacity: prayer.isNext ? 0.9 : 0.7 }}>
              {prayer.name}
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, marginTop: '2px' }}>
              {prayer.timeFormatted}
            </div>
            {prayer.isNext && (
              <div style={{ fontSize: '0.62rem', fontWeight: 600, marginTop: '2px', opacity: 0.9 }}>
                Next
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
