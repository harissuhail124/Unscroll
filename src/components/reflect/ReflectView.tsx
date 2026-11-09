import React, { useState } from 'react';
import { DrainMeter } from './DrainMeter';
import { CheckInBarChart } from './CheckInBarChart';
import { RealityCheckCard } from './RealityCheckCard';
import { WinsList } from './WinsList';
import { AyahOfTheDay } from '../faith/AyahOfTheDay';
import { FaithHubView } from '../faith/FaithHubView';
import { CheckIn } from '../../types';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { useSettings } from '../../context/SettingsContext';

export const ReflectView: React.FC = () => {
  const { settings } = useSettings();
  const [showFaithHub, setShowFaithHub] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(() => {
    return SafeStorage.getItem<CheckIn[]>(STORAGE_KEYS.CHECK_INS, []);
  });

  const handleRefreshCheckIns = () => {
    const updated = SafeStorage.getItem<CheckIn[]>(STORAGE_KEYS.CHECK_INS, []);
    setCheckIns(updated);
  };

  if (showFaithHub && settings.faithFeatures) {
    return <FaithHubView onBack={() => setShowFaithHub(false)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Ayah of the day (when Faith Features are ON) */}
      {settings.faithFeatures && (
        <>
          <AyahOfTheDay />
          <button
            onClick={() => setShowFaithHub(true)}
            className="btn btn-secondary"
            style={{ padding: '10px 14px', fontSize: '0.82rem', width: '100%', borderColor: 'var(--accent-emerald)' }}
          >
            Open Deen Hub (Prayer Times, Adhkar, Quiz, Tasbih)
          </button>
        </>
      )}

      {/* Drain Meter (Check-in input) */}
      <DrainMeter onCheckInAdded={handleRefreshCheckIns} />

      {/* 14-Check-in Summary Bar Chart */}
      <CheckInBarChart checkIns={checkIns} />

      {/* Reality Check Reminder */}
      <RealityCheckCard />

      {/* My Wins / Shukr Gratitude List */}
      <WinsList />
    </div>
  );
};
