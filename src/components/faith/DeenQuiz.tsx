import React, { useState } from 'react';
import QUIZ_DATA from '../../data/quiz.json';
import { GeometricAccent } from '../common/GeometricAccent';

export const DeenQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_DATA[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <section className="card" style={{ padding: '24px 16px', textAlign: 'center' }}>
        <GeometricAccent variant="medallion" size={32} opacity={0.9} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '14px 0 6px' }}>
          Reflection Completed
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
          Thank you for taking a few quiet minutes to reflect on time, mindfulness, and the Deen. There are no scoreboards here—the only goal is to pause with purpose.
        </p>
        <button
          onClick={handleRestart}
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '0.85rem' }}
        >
          Review Questions Again
        </button>
      </section>
    );
  }

  return (
    <section className="card" style={{ padding: '20px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.04} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Mindfulness in Deen
          </span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 0' }}>
            Reflective Quiz
          </h2>
        </div>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {currentIdx + 1} of {QUIZ_DATA.length}
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: 'var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '16px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%`,
            height: '100%',
            backgroundColor: 'var(--accent-gold)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.45 }}>
        {currentQ.question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {currentQ.options.map((opt, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const isCorrect = optIdx === currentQ.correctIndex;
          const hasAnswered = selectedOption !== null;

          let btnBg = 'var(--bg-card-subtle)';
          let borderColor = 'var(--border-subtle)';
          let textColor = 'var(--text-primary)';

          if (hasAnswered) {
            if (isCorrect) {
              btnBg = 'var(--accent-emerald-subtle)';
              borderColor = 'var(--accent-emerald)';
              textColor = 'var(--accent-emerald-text)';
            } else if (isSelected) {
              btnBg = 'rgba(225, 29, 72, 0.1)';
              borderColor = '#e11d48';
              textColor = '#e11d48';
            }
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleSelectOption(optIdx)}
              disabled={hasAnswered}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '10px 12px',
                fontSize: '0.85rem',
                backgroundColor: btnBg,
                borderColor: borderColor,
                color: textColor,
                cursor: hasAnswered ? 'default' : 'pointer'
              }}
            >
              <span style={{ fontWeight: 700, marginRight: '8px', flexShrink: 0 }}>
                {String.fromCharCode(65 + optIdx)}.
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation when answered */}
      {selectedOption !== null && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-emerald-subtle)',
            borderLeft: '4px solid var(--accent-emerald)',
            marginBottom: '16px'
          }}
        >
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-emerald-text)', marginBottom: '2px' }}>
            Reflection & Explanation:
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
            {currentQ.explanation}
          </p>
        </div>
      )}

      {selectedOption !== null && (
        <button
          onClick={handleNext}
          className="btn btn-primary"
          style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
        >
          {currentIdx < QUIZ_DATA.length - 1 ? 'Next Question' : 'Finish Reflection'}
        </button>
      )}
    </section>
  );
};
