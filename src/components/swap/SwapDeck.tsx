import React, { useState } from 'react';
import { Mood } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { SWAP_IDEAS_BY_MOOD, SwapIdea } from '../../data/swapIdeas';
import { GeometricAccent } from '../common/GeometricAccent';
import { recordActiveToday } from '../../services/streak';

interface SwapDeckProps {
  initialMood: Mood;
  onActivityRecorded: () => void;
}

const ALL_MOODS: Mood[] = ['Bored', 'Stressed', 'Lonely', 'Missing out', 'Just habit'];

export const SwapDeck: React.FC<SwapDeckProps> = ({ initialMood, onActivityRecorded }) => {
  const { settings } = useSettings();
  const [activeMood, setActiveMood] = useState<Mood>(initialMood);
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [completedNotice, setCompletedNotice] = useState(false);

  // Filter ideas by faith feature setting
  const ideasForMood: SwapIdea[] = (SWAP_IDEAS_BY_MOOD[activeMood] || []).filter(
    (idea) => settings.faithFeatures || !idea.isFaith
  );

  const currentIdea = ideasForMood[ideaIndex % ideasForMood.length];

  const handleNextIdea = () => {
    setIdeaIndex((prev) => (prev + 1) % ideasForMood.length);
    setCompletedNotice(false);
  };

  const handleSelectMood = (m: Mood) => {
    setActiveMood(m);
    setIdeaIndex(0);
    setCompletedNotice(false);
  };

  const handleMarkDone = () => {
    recordActiveToday();
    onActivityRecorded();
    setCompletedNotice(true);
    setTimeout(() => setCompletedNotice(false), 3500);
  };

  return (
    <section className="card" style={{ padding: '20px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.05} />

      <div style={{ marginBottom: '14px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-emerald-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Mood-based swap deck
        </span>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0' }}>
          5-Minute Replacements
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          One small, purposeful action tailored to your current pull.
        </p>
      </div>

      {/* Mood Filter Pill Bar */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px',
          scrollbarWidth: 'none'
        }}
      >
        {ALL_MOODS.map((m) => {
          const isSelected = m === activeMood;
          return (
            <button
              key={m}
              onClick={() => handleSelectMood(m)}
              className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                minHeight: '32px',
                whiteSpace: 'nowrap'
              }}
            >
              {m}
            </button>
          );
        })}
      </div>

      {/* Single Swap Card Display */}
      {currentIdea && (
        <div
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent-emerald-text)',
                backgroundColor: 'var(--accent-emerald-subtle)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {currentIdea.duration} • {currentIdea.category}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Idea {(ideaIndex % ideasForMood.length) + 1} of {ideasForMood.length}
            </span>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {currentIdea.title}
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
            {currentIdea.actionText}
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleMarkDone}
              className="btn btn-primary"
              style={{ flex: 1, padding: '9px 8px', fontSize: '0.82rem' }}
            >
              I did this!
            </button>
            <button
              onClick={handleNextIdea}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '9px 8px', fontSize: '0.82rem' }}
            >
              Another idea
            </button>
          </div>

          {completedNotice && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px',
                backgroundColor: 'var(--accent-emerald-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                color: 'var(--accent-emerald-text)',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Well done! You chose purpose over the scroll loop.
            </div>
          )}
        </div>
      )}
    </section>
  );
};
