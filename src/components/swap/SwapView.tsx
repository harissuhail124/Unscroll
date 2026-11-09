import React, { useState } from 'react';
import { Mood } from '../../types';
import { SwapDeck } from './SwapDeck';
import { DailyQuests } from './DailyQuests';
import { ForgivingStreak } from './ForgivingStreak';
import { getForgivingStreak } from '../../services/streak';

interface SwapViewProps {
  initialMood: Mood;
}

export const SwapView: React.FC<SwapViewProps> = ({ initialMood }) => {
  const [streakInfo, setStreakInfo] = useState(() => getForgivingStreak());

  const handleRefreshStreak = () => {
    setStreakInfo(getForgivingStreak());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Forgiving Streak Banner */}
      <ForgivingStreak streakInfo={streakInfo} />

      {/* Mood-Based Swap Deck */}
      <SwapDeck initialMood={initialMood} onActivityRecorded={handleRefreshStreak} />

      {/* Daily Quests */}
      <DailyQuests onActivityRecorded={handleRefreshStreak} />
    </div>
  );
};
