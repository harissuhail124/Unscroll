import React, { useState } from 'react';
import { GeometricAccent } from '../common/GeometricAccent';

interface TasbihCounterProps {
  onComplete?: () => void;
  onCancel?: () => void;
  standalone?: boolean;
}

interface DhikrStage {
  arabic: string;
  transliteration: string;
  meaning: string;
  target: number;
}

const STAGES: DhikrStage[] = [
  {
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaning: 'Glory be to Allah',
    target: 33
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    meaning: 'All praise is due to Allah',
    target: 33
  },
  {
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaning: 'Allah is the Greatest',
    target: 33
  }
];

export const TasbihCounter: React.FC<TasbihCounterProps> = ({
  onComplete,
  onCancel,
  standalone = false
}) => {
  const [mode, setMode] = useState<'33-cycle' | 'free'>('33-cycle');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentStage = STAGES[currentStageIdx];

  const handleTap = () => {
    // Subtle haptic feedback if supported on mobile device
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore
      }
    }

    if (mode === 'free') {
      setFreeCount((prev) => prev + 1);
      return;
    }

    const nextCount = count + 1;
    if (nextCount < currentStage.target) {
      setCount(nextCount);
    } else {
      // Completed this 33-count stage
      if (currentStageIdx < STAGES.length - 1) {
        setCurrentStageIdx((prev) => prev + 1);
        setCount(0);
      } else {
        // Completed all 3 stages (33x3 = 99)
        setCount(33);
        setIsFinished(true);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setCurrentStageIdx(0);
    setFreeCount(0);
    setIsFinished(false);
  };

  return (
    <div className="card" style={{ textAlign: 'center', padding: '22px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.06} />

      {/* Mode toggle */}
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-full)',
          padding: '3px',
          marginBottom: '16px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <button
          onClick={() => { setMode('33-cycle'); handleReset(); }}
          className={`btn ${mode === '33-cycle' ? 'btn-primary' : 'btn-subtle'}`}
          style={{ padding: '6px 14px', fontSize: '0.78rem', minHeight: '32px' }}
        >
          33-Count Tasbih
        </button>
        <button
          onClick={() => { setMode('free'); handleReset(); }}
          className={`btn ${mode === 'free' ? 'btn-primary' : 'btn-subtle'}`}
          style={{ padding: '6px 14px', fontSize: '0.78rem', minHeight: '32px' }}
        >
          Free Counter
        </button>
      </div>

      {mode === '33-cycle' ? (
        <div>
          {/* Stage indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            {STAGES.map((s, idx) => (
              <span
                key={s.transliteration}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor:
                    idx === currentStageIdx
                      ? 'var(--accent-emerald)'
                      : idx < currentStageIdx
                      ? 'var(--accent-teal-subtle)'
                      : 'var(--bg-card-subtle)',
                  color:
                    idx === currentStageIdx
                      ? '#ffffff'
                      : idx < currentStageIdx
                      ? 'var(--accent-teal)'
                      : 'var(--text-muted)'
                }}
              >
                {s.transliteration} ({idx < currentStageIdx ? '33' : idx === currentStageIdx ? count : '0'}/33)
              </span>
            ))}
          </div>

          {/* Arabic Display */}
          <div
            className="arabic-text"
            style={{
              fontSize: '1.9rem',
              fontWeight: 700,
              color: 'var(--accent-emerald-text)',
              marginBottom: '2px',
              minHeight: '52px'
            }}
          >
            {currentStage.arabic}
          </div>

          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {currentStage.transliteration}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            {currentStage.meaning}
          </div>

          {/* Large Tap Target Button */}
          {!isFinished ? (
            <button
              onClick={handleTap}
              aria-label={`Count dhikr ${currentStage.transliteration}. Current count: ${count} of 33`}
              style={{
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald-subtle)',
                border: '4px solid var(--accent-emerald)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                touchAction: 'manipulation'
              }}
            >
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald-text)', lineHeight: 1 }}>
                {count}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                of 33 • Tap
              </span>
            </button>
          ) : (
            <div
              style={{
                backgroundColor: 'var(--accent-emerald-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                marginBottom: '18px',
                border: '1px solid var(--accent-emerald)'
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald-text)', marginBottom: '6px' }}>
                Completed 99 Dhikr
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                May Allah grant calm, clarity, and blessings in your time.
              </p>
              {onComplete && (
                <button
                  onClick={onComplete}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                >
                  Continue to Pause Choices
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Free Counter Mode */
        <div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Open Remembrance (Dhikr)
          </div>
          <button
            onClick={handleTap}
            aria-label={`Count free dhikr. Current count: ${freeCount}`}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-teal-subtle)',
              border: '4px solid var(--accent-teal)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              touchAction: 'manipulation'
            }}
          >
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-teal)', lineHeight: 1 }}>
              {freeCount}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Tap to count
            </span>
          </button>
        </div>
      )}

      {/* Control Actions */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          Reset
        </button>
        {!standalone && onCancel && (
          <button
            onClick={onCancel}
            className="btn btn-subtle"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            Cancel
          </button>
        )}
        {!standalone && onComplete && !isFinished && (
          <button
            onClick={onComplete}
            className="btn btn-subtle"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            Finish Early
          </button>
        )}
      </div>
    </div>
  );
};
