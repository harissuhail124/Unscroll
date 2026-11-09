import React, { useState } from 'react';
import AYAT_DATA from '../../data/ayat.json';
import { GeometricAccent } from '../common/GeometricAccent';

export const AyahOfTheDay: React.FC = () => {
  // Compute daily index from current day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  const [currentIndex, setCurrentIndex] = useState(dayOfYear % AYAT_DATA.length);

  const currentAyah = AYAT_DATA[currentIndex % AYAT_DATA.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % AYAT_DATA.length);
  };

  return (
    <section className="card" style={{ padding: '20px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.05} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GeometricAccent variant="medallion" size={22} opacity={0.85} />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-emerald-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Ayah of the day
          </span>
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--accent-gold)',
            backgroundColor: 'var(--accent-gold-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            textTransform: 'capitalize'
          }}
        >
          {currentAyah.theme}
        </span>
      </div>

      {/* Arabic text with local Amiri font */}
      <div
        className="arabic-text"
        style={{
          fontSize: '1.45rem',
          color: 'var(--text-primary)',
          marginBottom: '14px',
          padding: '4px 0'
        }}
      >
        {currentAyah.arabicText}
      </div>

      {/* English translation */}
      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          fontStyle: 'italic',
          marginBottom: '12px'
        }}
      >
        "{currentAyah.translation}"
      </p>

      {/* Citation and Source */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '10px',
          marginTop: '6px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {currentAyah.reference} ({currentAyah.surahNameArabic})
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            Source: {currentAyah.source}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="btn-subtle"
          style={{ fontSize: '0.78rem', padding: '4px 8px', cursor: 'pointer' }}
        >
          Another Ayah
        </button>
      </div>
    </section>
  );
};
