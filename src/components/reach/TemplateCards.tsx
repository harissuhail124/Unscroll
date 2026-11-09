import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { REACH_TEMPLATES, ReachTemplate } from '../../data/reachTemplates';

export const TemplateCards: React.FC = () => {
  const { settings } = useSettings();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templatesToDisplay = REACH_TEMPLATES.filter(
    (t) => settings.faithFeatures || !t.isFaith
  );

  const handleCopy = async (template: ReachTemplate) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(template.message);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = template.message;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (e) {
      console.warn('Failed to copy to clipboard', e);
    }
  };

  return (
    <section className="card" style={{ padding: '18px 16px' }}>
      <div style={{ marginBottom: '14px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Real-world connection
        </span>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0' }}>
          Reach Out Templates
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Copy and send to a friend or classmate when feeling isolated.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {templatesToDisplay.map((t) => {
          const isCopied = copiedId === t.id;
          return (
            <div
              key={t.id}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: t.isFaith ? 'var(--accent-emerald-text)' : 'var(--accent-teal)',
                    backgroundColor: t.isFaith ? 'var(--accent-emerald-subtle)' : 'var(--accent-teal-subtle)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {t.tag}
                </span>
                <button
                  onClick={() => handleCopy(t)}
                  className={`btn ${isCopied ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', minHeight: '28px' }}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.45
                }}
              >
                "{t.message}"
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
