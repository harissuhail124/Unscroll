import React from 'react';
import { GeometricAccent } from './GeometricAccent';

interface FirstRunModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirstRunModal: React.FC<FirstRunModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-run-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
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
          maxWidth: '420px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--accent-emerald)',
          position: 'relative'
        }}
      >
        <GeometricAccent variant="watermark" opacity={0.06} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <GeometricAccent variant="medallion" size={28} opacity={0.9} />
          <h2 id="first-run-title" style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
            Welcome to Unscroll
          </h2>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '14px', lineHeight: 1.55 }}>
          Unscroll is a gentle, forgiving digital well-being companion created for university students in Pakistan to pause habitual doom-scrolling and reclaim daily focus.
        </p>

        <div
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '16px',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            borderLeft: '4px solid var(--accent-emerald)'
          }}
        >
          <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>
            100% Private & On-Device
          </strong>
          <span style={{ color: 'var(--text-secondary)' }}>
            There are no user accounts, no logins, no analytics, and no tracking scripts. Everything you record—check-ins, personal wins, and settings—stays strictly on your device.
          </span>
        </div>

        <div
          style={{
            backgroundColor: 'var(--accent-teal-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '18px',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            borderLeft: '4px solid var(--accent-teal)'
          }}
        >
          <strong style={{ display: 'block', color: 'var(--accent-teal)', marginBottom: '4px' }}>
            Important Note on Support
          </strong>
          <span style={{ color: 'var(--text-secondary)' }}>
            Unscroll is a personal habit and reflection tool. <em>Unscroll is not a counselor or a medical service.</em> If you ever feel overwhelmed, low, or unsafe, please reach out to a trusted friend, family member, or campus counselor.
          </span>
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.95rem', padding: '14px' }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
