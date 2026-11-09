import React, { useState } from 'react';
import { PrayerTimesCard } from './PrayerTimesCard';
import { AyahOfTheDay } from './AyahOfTheDay';
import { AdhkarList } from './AdhkarList';
import { DeenQuiz } from './DeenQuiz';
import { TasbihCounter } from '../pause/TasbihCounter';
import { GeometricAccent } from '../common/GeometricAccent';

interface FaithHubViewProps {
  onBack?: () => void;
}

export const FaithHubView: React.FC<FaithHubViewProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'tasbih' | 'adhkar' | 'quiz'>('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GeometricAccent variant="medallion" size={24} opacity={0.85} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Deen & Reflection Hub
          </h2>
        </div>
        {onBack && (
          <button onClick={onBack} className="btn-subtle" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
            Back
          </button>
        )}
      </div>

      {/* Navigation Pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        <button
          onClick={() => setActiveSection('overview')}
          className={`btn ${activeSection === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '32px', whiteSpace: 'nowrap' }}
        >
          Ayah & Prayers
        </button>
        <button
          onClick={() => setActiveSection('tasbih')}
          className={`btn ${activeSection === 'tasbih' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '32px', whiteSpace: 'nowrap' }}
        >
          Tasbih Counter
        </button>
        <button
          onClick={() => setActiveSection('adhkar')}
          className={`btn ${activeSection === 'adhkar' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '32px', whiteSpace: 'nowrap' }}
        >
          Daily Adhkar
        </button>
        <button
          onClick={() => setActiveSection('quiz')}
          className={`btn ${activeSection === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '32px', whiteSpace: 'nowrap' }}
        >
          Deen Quiz
        </button>
      </div>

      {activeSection === 'overview' && (
        <>
          <PrayerTimesCard />
          <AyahOfTheDay />
        </>
      )}

      {activeSection === 'tasbih' && (
        <TasbihCounter standalone={true} />
      )}

      {activeSection === 'adhkar' && (
        <AdhkarList />
      )}

      {activeSection === 'quiz' && (
        <DeenQuiz />
      )}
    </div>
  );
};
