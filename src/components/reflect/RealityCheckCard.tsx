import React, { useState } from 'react';
import { REALITY_CHECKS } from '../../data/realityChecks';
import { GeometricAccent } from '../common/GeometricAccent';

export const RealityCheckCard: React.FC = () => {
  const [index, setIndex] = useState(0);

  const current = REALITY_CHECKS[index % REALITY_CHECKS.length];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % REALITY_CHECKS.length);
  };

  return (
    <section className="card" style={{ padding: '18px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.05} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Perspective check
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {(index % REALITY_CHECKS.length) + 1} of {REALITY_CHECKS.length}
        </span>
      </div>

      <blockquote
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.45,
          margin: '4px 0 8px',
          fontStyle: 'italic'
        }}
      >
        "{current.quote}"
      </blockquote>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
        {current.context}
      </p>

      <button
        onClick={handleNext}
        className="btn btn-secondary"
        style={{ width: '100%', padding: '8px', fontSize: '0.82rem' }}
      >
        Next perspective
      </button>
    </section>
  );
};
