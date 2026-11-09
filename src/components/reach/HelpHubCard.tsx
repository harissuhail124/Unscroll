import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';

export const HelpHubCard: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [counselorInput, setCounselorInput] = useState(settings.campusCounselorContact);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ campusCounselorContact: counselorInput.trim() });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <section className="card" style={{ padding: '18px 16px', borderLeft: '4px solid var(--accent-teal)' }}>
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
          Support & Safety
        </span>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 0' }}>
          Help Hub
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
          If you are feeling low, overwhelmed, or unsafe, please tell a trusted friend, family member, or your campus counselor. You do not have to struggle in silence.
        </p>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label
          htmlFor="reach-counselor-contact"
          style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary)' }}
        >
          Campus Counselor Contact / Room:
        </label>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            id="reach-counselor-contact"
            type="text"
            value={counselorInput}
            onChange={(e) => setCounselorInput(e.target.value)}
            placeholder="[Add campus counselor contact]"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              Save to Phone
            </button>
            {isSaved && (
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                Saved privately on device
              </span>
            )}
          </div>
        </form>
      </div>

      <footer style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '12px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0, fontStyle: 'italic' }}>
          Unscroll is not a counselor or a medical service.
        </p>
      </footer>
    </section>
  );
};
