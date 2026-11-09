import React from 'react';
import { TemplateCards } from './TemplateCards';
import { OfflineChallengeCard } from './OfflineChallengeCard';
import { HelpHubCard } from './HelpHubCard';

export const ReachView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Reach Out Templates */}
      <TemplateCards />

      {/* Weekly Offline Challenge */}
      <OfflineChallengeCard />

      {/* Help Hub Card */}
      <HelpHubCard />
    </div>
  );
};
