import { Mood } from '../types';

export interface SwapIdea {
  id: string;
  title: string;
  duration: string;
  actionText: string;
  category: 'quick-action' | 'movement' | 'learning' | 'social' | 'mindfulness' | 'faith';
  isFaith?: boolean;
}

export const SWAP_IDEAS_BY_MOOD: Record<Mood, SwapIdea[]> = {
  Bored: [
    {
      id: 'bored-1',
      title: 'Solve one chess puzzle',
      duration: '3 mins',
      actionText: 'Find the winning tactic on Lichess or visualize a board position.',
      category: 'learning'
    },
    {
      id: 'bored-2',
      title: 'Learn one thing with an AI tutor',
      duration: '5 mins',
      actionText: 'Ask an AI tutor: "Explain how neural networks or airplane lift works in simple words."',
      category: 'learning'
    },
    {
      id: 'bored-3',
      title: 'Read one page of a physical book',
      duration: '3 mins',
      actionText: 'Pick up any book or paper textbook on your desk. Read just a single page.',
      category: 'learning'
    },
    {
      id: 'bored-4',
      title: 'Speed-clear your study desk',
      duration: '4 mins',
      actionText: 'Put away empty cups, arrange notebooks, and reset your workspace.',
      category: 'quick-action'
    },
    {
      id: 'bored-5',
      title: 'Doodle or sketch an object near you',
      duration: '5 mins',
      actionText: 'Grab a pen and scrap paper. Sketch your water bottle, pen, or watch.',
      category: 'mindfulness'
    },
    {
      id: 'bored-faith-1',
      title: 'Read 5 verses with translation',
      duration: '4 mins',
      actionText: 'Open Surah Al-Mulk or Ar-Rahman and reflect on the depth of just 5 ayat.',
      category: 'faith',
      isFaith: true
    }
  ],
  Stressed: [
    {
      id: 'stressed-1',
      title: 'Stretch your neck and shoulders',
      duration: '4 mins',
      actionText: 'Roll shoulders back 10 times, tilt neck gently side-to-side, and release tension.',
      category: 'movement'
    },
    {
      id: 'stressed-2',
      title: 'Write 3 things on your mind',
      duration: '3 mins',
      actionText: 'Empty your mental RAM onto scrap paper. No filtering, just get the thoughts out.',
      category: 'mindfulness'
    },
    {
      id: 'stressed-3',
      title: 'Cool water face splash',
      duration: '2 mins',
      actionText: 'Go to the sink, wash your face with cool water, and drink a tall glass of water.',
      category: 'quick-action'
    },
    {
      id: 'stressed-4',
      title: '5-minute balcony or fresh air walk',
      duration: '5 mins',
      actionText: 'Step outside or to the window. Leave your phone inside. Notice 3 things you can see.',
      category: 'movement'
    },
    {
      id: 'stressed-5',
      title: 'Listen to 5 minutes of natural rain sounds',
      duration: '5 mins',
      actionText: 'Close your eyes, let your jaw unclench, and listen to rain or flowing stream audio.',
      category: 'mindfulness'
    },
    {
      id: 'stressed-faith-1',
      title: 'Make a heartfelt personal dua',
      duration: '3 mins',
      actionText: 'Raise your hands in your room and whisper everything troubling you to Allah.',
      category: 'faith',
      isFaith: true
    }
  ],
  Lonely: [
    {
      id: 'lonely-1',
      title: 'Message a friend for tea or a walk',
      duration: '2 mins',
      actionText: 'Text a friend: "Free for a quick chai or walk around campus today?"',
      category: 'social'
    },
    {
      id: 'lonely-2',
      title: 'Call parents or sibling to say Salam',
      duration: '5 mins',
      actionText: 'A quick 3-minute check-in call with your mother, father, or brother.',
      category: 'social'
    },
    {
      id: 'lonely-3',
      title: 'Say a warm word to a classmate',
      duration: '2 mins',
      actionText: 'Ask someone in your hostel corridor or class how their prep is going.',
      category: 'social'
    },
    {
      id: 'lonely-4',
      title: 'Write a quick thank-you note',
      duration: '3 mins',
      actionText: 'Send a genuine message thanking a friend or mentor for something small they did.',
      category: 'social'
    },
    {
      id: 'lonely-5',
      title: 'Step out to the campus canteen or common area',
      duration: '5 mins',
      actionText: 'Walk around where people are gathering. Keep your phone in your pocket.',
      category: 'social'
    },
    {
      id: 'lonely-faith-1',
      title: 'Offer two rakats of prayer with khushu',
      duration: '5 mins',
      actionText: 'Connect directly with Allah in prayer: "And He is with you wherever you are."',
      category: 'faith',
      isFaith: true
    }
  ],
  'Missing out': [
    {
      id: 'fomo-1',
      title: 'Remember: posts are highlights, not whole lives',
      duration: '2 mins',
      actionText: 'Social media shows the top 1% highlight reel. Nobody broadcasts struggles or boredom.',
      category: 'mindfulness'
    },
    {
      id: 'fomo-2',
      title: 'Review your personal wins or goals',
      duration: '3 mins',
      actionText: 'Look at your own projects and past semester achievements. Your path is your own.',
      category: 'learning'
    },
    {
      id: 'fomo-3',
      title: 'Read one page of inspiring writing',
      duration: '3 mins',
      actionText: 'Pick up an essay or biography. Focus on depth rather than social comparison.',
      category: 'learning'
    },
    {
      id: 'fomo-4',
      title: 'Look out at the sky for 2 minutes',
      duration: '2 mins',
      actionText: 'Put your hands in your pockets. Look up at the clouds or stars and breathe.',
      category: 'mindfulness'
    },
    {
      id: 'fomo-5',
      title: 'Write down 3 things you are grateful for',
      duration: '3 mins',
      actionText: 'Notice what you already have: health, food, intellect, shelter, and family.',
      category: 'mindfulness'
    },
    {
      id: 'fomo-faith-1',
      title: 'Reflect on Qur\'an 13:28',
      duration: '3 mins',
      actionText: '"Verily, in the remembrance of Allah do hearts find rest." True peace is within.',
      category: 'faith',
      isFaith: true
    }
  ],
  'Just habit': [
    {
      id: 'habit-1',
      title: 'Put phone across the room for 15 minutes',
      duration: '15 mins',
      actionText: 'Place your phone out of reach. Return to your homework or book.',
      category: 'quick-action'
    },
    {
      id: 'habit-2',
      title: '15 gentle bodyweight squats or wall pushups',
      duration: '3 mins',
      actionText: 'Get your blood pumping and shake off the sleepy, screen-locked trance.',
      category: 'movement'
    },
    {
      id: 'habit-3',
      title: 'Drink a glass of water slowly',
      duration: '2 mins',
      actionText: 'Fill a glass. Sip it sitting down and pay attention to how refreshing it feels.',
      category: 'quick-action'
    },
    {
      id: 'habit-4',
      title: 'Tidy your backpack or jacket pocket',
      duration: '3 mins',
      actionText: 'Discard old receipts, arrange pens, and prepare for tomorrow.',
      category: 'quick-action'
    },
    {
      id: 'habit-5',
      title: 'Take 5 deep grounding breaths',
      duration: '2 mins',
      actionText: 'Notice your feet on the floor. Remind yourself that you choose what to focus on.',
      category: 'mindfulness'
    },
    {
      id: 'habit-faith-1',
      title: 'Perform wudu with presence of mind',
      duration: '4 mins',
      actionText: 'Washing away tension with cool water refreshes mind, body, and spirit.',
      category: 'faith',
      isFaith: true
    }
  ]
};
