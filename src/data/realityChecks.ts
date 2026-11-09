export interface RealityCheck {
  id: string;
  quote: string;
  context: string;
}

export const REALITY_CHECKS: RealityCheck[] = [
  {
    id: 'rc-1',
    quote: 'Posts are highlights, not whole lives.',
    context: 'People share their best 10 seconds and hide their 23 hours and 59 minutes of ordinary struggles.'
  },
  {
    id: 'rc-2',
    quote: 'Nobody posts their exam panic, boredom, or self-doubt.',
    context: 'What you see on social feeds is heavily filtered. Don\'t compare your messy reality to curated reels.'
  },
  {
    id: 'rc-3',
    quote: 'Algorithms are designed to monetize your time, not care for your well-being.',
    context: 'Every autoplay and endless scroll is tuned to keep you hooked. Stepping away is taking control.'
  },
  {
    id: 'rc-4',
    quote: 'Comparing your behind-the-scenes to someone else\'s stage performance is unfair.',
    context: 'Focus on your own small daily progress. Your journey at university is uniquely yours.'
  },
  {
    id: 'rc-5',
    quote: 'Your self-worth has nothing to do with likes, follower counts, or notifications.',
    context: 'True self-respect comes from how you treat people, how you honor your values, and your quiet efforts.'
  },
  {
    id: 'rc-6',
    quote: 'FOMO disappears 5 minutes after you put your phone face-down.',
    context: 'The anxiety of "missing out" is an artificial illusion. You aren\'t missing out on real life.'
  },
  {
    id: 'rc-7',
    quote: 'Passive scrolling does not recharge your battery; it drains it faster.',
    context: 'True rest is a short walk, a conversation, closing your eyes, or breathing fresh air.'
  },
  {
    id: 'rc-8',
    quote: 'Real achievement is built through uninterrupted, quiet hours.',
    context: 'Great engineers, doctors, and thinkers built their skills by staying with problems, not by rapid multitasking.'
  },
  {
    id: 'rc-9',
    quote: 'The most memorable conversations of your youth happen with phones out of sight.',
    context: 'Presence with friends over tea or late-night hostel chats is where real memories are made.'
  }
];
