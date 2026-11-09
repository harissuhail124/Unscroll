export interface ReachTemplate {
  id: string;
  category: 'social' | 'study' | 'faith';
  message: string;
  tag: string;
  isFaith?: boolean;
}

export const REACH_TEMPLATES: ReachTemplate[] = [
  {
    id: 'reach-1',
    category: 'social',
    tag: 'Quick Catchup',
    message: 'Free for a walk or tea today?'
  },
  {
    id: 'reach-2',
    category: 'social',
    tag: 'Campus Lunch',
    message: 'Hey, haven\'t caught up in a bit! Let\'s grab lunch or chai on campus today?'
  },
  {
    id: 'reach-3',
    category: 'study',
    tag: 'Deep Focus',
    message: 'Want to study together at the library this evening? Phones in bags, 1 hour deep focus.'
  },
  {
    id: 'reach-4',
    category: 'social',
    tag: 'Gentle Check-in',
    message: 'Hey bro, just checking in on you. How are your classes and prep going this week?'
  },
  {
    id: 'reach-5',
    category: 'social',
    tag: 'Mental Break',
    message: 'Taking a 15-minute screen break. Want to take a quick stroll around the grounds?'
  },
  // Faith-specific templates (Section 2.4)
  {
    id: 'reach-faith-1',
    category: 'faith',
    tag: 'Prayer in Jama\'ah',
    message: 'Salam! Want to pray together at the campus masjid today?',
    isFaith: true
  },
  {
    id: 'reach-faith-2',
    category: 'faith',
    tag: 'Screen-Free Study',
    message: 'Want to study together this week, phones away?',
    isFaith: true
  },
  {
    id: 'reach-faith-3',
    category: 'faith',
    tag: 'Warm Salam',
    message: 'Salam brother, hope you\'re having a blessed day. Free for a quick cup of chai?',
    isFaith: true
  }
];
