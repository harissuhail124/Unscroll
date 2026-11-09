import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { GeometricAccent } from './GeometricAccent';

interface HelpHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpHubModal: React.FC<HelpHubModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [counselorInput, setCounselorInput] = useState(settings.campusCounselorContact);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ campusCounselorContact: counselorInput.trim() });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="helphub-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '22px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
      >
        <GeometricAccent variant="watermark" opacity={0.05} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GeometricAccent variant="medallion" size={24} opacity={0.9} />
            <h2 id="helphub-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              Help Hub
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-subtle"
            style={{ padding: '4px 10px', fontSize: '0.85rem', cursor: 'pointer' }}
            aria-label="Close Help Hub"
          >
            Close
          </button>
        </div>

        {/* Core supportive guidance */}
        <div
          style={{
            backgroundColor: 'var(--accent-teal-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '16px',
            borderLeft: '4px solid var(--accent-teal)'
          }}
        >
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '6px' }}>
            You do not have to carry this alone
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            If you are feeling low, overwhelmed, exhausted, or unsafe, please reach out to a trusted friend, family member, teacher, or your campus student support counselor. Real human connection is always here for you.
          </p>
        </div>

        {/* Counselor contact field */}
        <div style={{ marginBottom: '18px' }}>
          <label
            htmlFor="counselor-field"
            style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}
          >
            Campus Counselor or Advisor Details
          </label>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Save your campus counseling office, counselor name, or room number here. This is stored only on your phone.
          </p>
          <form onSubmit={handleSaveContact}>
            <input
              id="counselor-field"
              type="text"
              value={counselorInput}
              onChange={(e) => setCounselorInput(e.target.value)}
              placeholder="[Add campus counselor contact]"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                marginBottom: '10px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="submit"
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Save Contact
              </button>
              {isSaved && (
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Saved locally
                </span>
              )}
            </div>
          </form>
        </div>

        <GeometricAccent variant="divider" size={28} opacity={0.2} />

        {/* Required Footer Note */}
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '8px',
            fontStyle: 'italic'
          }}
        >
          Unscroll is not a counselor or a medical service.
        </p>
      </div>
    </div>
  );
};
