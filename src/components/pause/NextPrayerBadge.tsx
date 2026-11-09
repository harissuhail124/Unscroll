import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { getPrayerTimes, NextPrayerInfo } from '../../services/prayerTimes';
import { GeometricAccent } from '../common/GeometricAccent';

export const NextPrayerBadge: React.FC = () => {
  const { settings } = useSettings();
  const [prayerInfo, setPrayerInfo] = useState<NextPrayerInfo | null>(() => getPrayerTimes(settings));

  useEffect(() => {
    const update = () => {
      setPrayerInfo(getPrayerTimes(settings));
    };

    update();
    const interval = setInterval(update, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [settings]);

  if (!settings.faithFeatures || !prayerInfo) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--accent-emerald-subtle)',
        border: '1px solid var(--accent-emerald)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GeometricAccent variant="medallion" size={24} opacity={0.8} />
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald-text)', fontWeight: 600 }}>
            Next prayer in {prayerInfo.timeRemainingFormatted}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {prayerInfo.nextPrayerName} ({formatTime(prayerInfo.nextPrayerTime)})
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'block'
          }}
        >
          {settings.city}
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          Karachi ({settings.asrMethod})
        </span>
      </div>
    </div>
  );
};

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}
