export interface OfflineChallenge {
  id: string;
  title: string;
  description: string;
  recommendedDuration: string;
}

export const OFFLINE_CHALLENGES: OfflineChallenge[] = [
  {
    id: 'challenge-1',
    title: 'The Screen-Free Chai Talk',
    description: 'Share a meal or a cup of chai with a roommate, classmate, or family member with all phones zipped away inside bags.',
    recommendedDuration: '30 mins'
  },
  {
    id: 'challenge-2',
    title: 'Silent Campus Stroll',
    description: 'Take a 15-minute campus or neighborhood walk with empty hands—no earbuds, no podcasts, no screen. Notice trees, sky, and architecture.',
    recommendedDuration: '15 mins'
  },
  {
    id: 'challenge-3',
    title: 'Physical Library Immersion',
    description: 'Find a quiet desk in the university library. Leave your phone in your locker or backpack, and read 10 full printed pages uninterrupted.',
    recommendedDuration: '45 mins'
  },
  {
    id: 'challenge-4',
    title: 'Analog Evening Reset',
    description: 'Turn off your phone 45 minutes before going to sleep. Spend the time journaling, sketching, reading, or resting.',
    recommendedDuration: '45 mins'
  }
];
