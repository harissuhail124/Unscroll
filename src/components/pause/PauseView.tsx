import React, { useState } from 'react';
import { Mood } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { GeometricAccent } from '../common/GeometricAccent';
import { NextPrayerBadge } from './NextPrayerBadge';
import { BreathingCircle } from './BreathingCircle';
import { TasbihCounter } from './TasbihCounter';
import { WindDownChecklist } from './WindDownChecklist';

interface PauseViewProps {
  onNavigateToSwap: (mood: Mood) => void;
}

const MOOD_CHOICES: { mood: Mood; subtitle: string }[] = [
  { mood: 'Bored', subtitle: 'Need a mental spark or stimulation' },
  { mood: 'Stressed', subtitle: 'Seeking relief or distraction from pressure' },
  { mood: 'Lonely', subtitle: 'Looking for connection or presence' },
  { mood: 'Missing out', subtitle: 'FOMO: checking what others are doing' },
  { mood: 'Just habit', subtitle: 'Opened phone without thinking' }
];

export const PauseView: React.FC<PauseViewProps> = ({ onNavigateToSwap }) => {
  const { settings } = useSettings();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [pauseMode, setPauseMode] = useState<'breath' | 'tasbih'>('breath');
  const [isPauseActive, setIsPauseActive] = useState(false);
  const [isPauseCompleted, setIsPauseCompleted] = useState(false);
  const [scrolledAnywayMessage, setScrolledAnywayMessage] = useState(false);

  const handleSelectMood = (mood: Mood) => {
    setSelectedMood(mood);
    setIsPauseActive(true);
    setIsPauseCompleted(false);
    setScrolledAnywayMessage(false);
  };

  const handlePauseComplete = () => {
    setIsPauseActive(false);
    setIsPauseCompleted(true);
  };

  const handleResetPause = () => {
    setSelectedMood(null);
    setIsPauseActive(false);
    setIsPauseCompleted(false);
    setScrolledAnywayMessage(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Live Prayer Badge on Pause Screen (Section 2.1 & 3) */}
      <NextPrayerBadge />

      {/* Main Pause Habit Interrupter Card */}
      {!isPauseActive && !isPauseCompleted && (
        <section className="card">
          <GeometricAccent variant="watermark" opacity={0.06} />
          
          <div style={{ marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--accent-emerald-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Before you scroll
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>
              What is pulling you to your phone?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Recognizing the impulse is the first step to owning your time.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MOOD_CHOICES.map(({ mood, subtitle }) => (
              <button
                key={mood}
                onClick={() => handleSelectMood(mood)}
                className="btn btn-secondary"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px 14px',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {mood}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  {subtitle}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active Pause Screen: 30s Calm Breath or 33-Count Tasbih */}
      {isPauseActive && selectedMood && (
        <div>
          {/* Pause Choice Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '0 4px'
            }}
          >
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Feeling: <strong>{selectedMood}</strong>
            </span>

            {settings.faithFeatures && (
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  padding: '2px'
                }}
              >
                <button
                  onClick={() => setPauseMode('breath')}
                  className={`btn ${pauseMode === 'breath' ? 'btn-primary' : 'btn-subtle'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', minHeight: '28px' }}
                >
                  Breath
                </button>
                <button
                  onClick={() => setPauseMode('tasbih')}
                  className={`btn ${pauseMode === 'tasbih' ? 'btn-primary' : 'btn-subtle'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', minHeight: '28px' }}
                >
                  Tasbih
                </button>
              </div>
            )}
          </div>

          {pauseMode === 'breath' ? (
            <BreathingCircle
              onComplete={handlePauseComplete}
              onCancel={handleResetPause}
            />
          ) : (
            <TasbihCounter
              onComplete={handlePauseComplete}
              onCancel={handleResetPause}
            />
          )}
        </div>
      )}

      {/* Post-Pause Screen: "Swap it" or "I'll scroll anyway" */}
      {isPauseCompleted && selectedMood && (
        <section className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <GeometricAccent variant="watermark" opacity={0.06} />

          <GeometricAccent variant="medallion" size={32} opacity={0.9} />
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 6px' }}>
            Pause completed
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            You gave yourself a moment of clarity. What would you like to do now?
          </p>

          {!scrolledAnywayMessage ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onNavigateToSwap(selectedMood)}
                className="btn btn-primary"
                style={{ padding: '14px', fontSize: '0.95rem' }}
              >
                Swap it (Find a 5-minute alternative)
              </button>

              <button
                onClick={() => setScrolledAnywayMessage(true)}
                className="btn btn-secondary"
                style={{ padding: '12px', fontSize: '0.88rem' }}
              >
                I'll scroll anyway
              </button>

              <button
                onClick={handleResetPause}
                className="btn-subtle"
                style={{ fontSize: '0.8rem', padding: '6px' }}
              >
                Back to Pause check-in
              </button>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: 'var(--accent-teal-subtle)',
                border: '1px solid var(--accent-teal)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '4px' }}>
                No shame, no guilt.
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                Taking a deliberate pause before scrolling is already a big step. Be gentle with yourself, and remember you can put the phone down whenever you feel ready.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onNavigateToSwap(selectedMood)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
                >
                  Changed mind: Swap it
                </button>
                <button
                  onClick={handleResetPause}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Bedtime Wind-Down Checklist */}
      <WindDownChecklist />
    </div>
  );
};
