import React, { useState } from 'react';
import ADHKAR_DATA from '../../data/adhkar.json';
import { GeometricAccent } from '../common/GeometricAccent';

export const AdhkarList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'morning' | 'evening' | 'sleep'>('morning');

  const filtered = ADHKAR_DATA.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <section className="card" style={{ padding: '20px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.04} />

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GeometricAccent variant="medallion" size={22} opacity={0.85} />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-teal)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Sunnah Adhkar
          </span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0' }}>
          Daily Remembrances
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Short authentic prayers for morning, evening, and bedtime.
        </p>
      </div>

      {/* Category selector */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px'
        }}
      >
        {(['morning', 'evening', 'sleep'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '32px', textTransform: 'capitalize' }}
          >
            {cat === 'sleep' ? 'Before Sleep' : `${cat} Adhkar`}
          </button>
        ))}
      </div>

      {/* Cards list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {item.title}
              </h3>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: 'var(--accent-emerald-text)',
                  backgroundColor: 'var(--accent-emerald-subtle)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {item.hadithGrade}
              </span>
            </div>

            <div
              className="arabic-text"
              style={{
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
                marginBottom: '10px'
              }}
            >
              {item.arabicText}
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-teal)', marginBottom: '4px' }}>
              {item.transliteration}
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '10px' }}>
              "{item.translation}"
            </p>

            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '6px'
              }}
            >
              Source: {item.hadithCollection} #{item.hadithNumber} • {item.hadithGrade}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
