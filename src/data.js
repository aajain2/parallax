export const sessions = [
  {
    id: 1,
    label: 'Session 1',
    isNew: true,
    timestamp: '2:14 PM',
    date: 'Mar 8',
    duration: '31 min 51 sec',
    people: [
      { initial: 'M', name: 'Marcus', color: '#6C63C9' },
      { initial: 'P', name: 'Priya', color: '#C4A882' },
    ],
    overlapScore: 58,
    overlapDegree: 0.6,
    mutualRecognizance: 0.79,
    recognizanceLabel: 'deep recognition',
    timeline: {
      you: {
        feltTime: '30 min',
        segments: [0.3, 0.5, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5],
      },
      friend1: {
        feltTime: '24 min',
        segments: [0.4, 0.3, 0.6, 0.8, 0.5, 0.9, 0.4, 0.3],
      },
      friend2: {
        feltTime: '15 min',
        segments: [0.2, 0.4, 0.3, 0.5, 0.6, 0.3, 0.2, 0.4],
      },
    },
    pointsOfInterest: [0.15, 0.45, 0.78],
    resonanceArc: {
      you: [0.3, 0.5, 0.4, 0.7, 0.8, 0.6, 0.5, 0.65, 0.7, 0.72],
      friend1: [0.5, 0.4, 0.6, 0.5, 0.7, 0.8, 0.7, 0.6, 0.68, 0.71],
    },
    yourMetrics: { authorship: 44, hrvTrend: 'up', suppression: 'low' },
    friendMetrics: { authorship: 56, hrv: null, unsaid: 'moderate' },
    insights: [
      'The silence at minute 22 was your highest contact moment. You don\'t always need to fill it.',
      'Marcus carried more emotional weight into this conversation than his words suggested.',
      'Priya mirrored your breathing pattern during the last 8 minutes. Unconscious sync is rare in group settings.',
    ],
  },
  {
    id: 2,
    label: 'Session 2',
    isNew: false,
    timestamp: '10:30 AM',
    date: 'Mar 8',
    duration: '18 min 22 sec',
    people: [
      { initial: 'S', name: 'Sara', color: '#7B9BB5' },
    ],
    overlapScore: 42,
    overlapDegree: 0.4,
    mutualRecognizance: 0.54,
    recognizanceLabel: 'surface contact',
    timeline: {
      you: {
        feltTime: '16 min',
        segments: [0.4, 0.3, 0.5, 0.6, 0.3, 0.4],
      },
      friend1: {
        feltTime: '20 min',
        segments: [0.3, 0.5, 0.4, 0.3, 0.6, 0.5],
      },
    },
    pointsOfInterest: [0.3, 0.7],
    resonanceArc: {
      you: [0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.4, 0.5],
      friend1: [0.3, 0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.45],
    },
    yourMetrics: { authorship: 61, hrvTrend: 'stable', suppression: 'moderate' },
    friendMetrics: { authorship: 39, hrv: null, unsaid: 'low' },
    insights: [
      'You dominated the conversational space more than usual. Sara may have felt unheard.',
      'Your HRV dropped sharply at minute 7 when the topic shifted to deadlines. Your body noticed before you did.',
      'Sara\'s voice pitch rose 12% in the second half. She may have been seeking validation you didn\'t provide.',
    ],
  },
];

export const friends = [
  { id: 1, initial: 'M', name: 'Marcus', convos: 10, tag: 'close friend', resonance: 0.67, lastSession: 'Mar 8' },
  { id: 2, initial: 'P', name: 'Priya', convos: 7, tag: 'colleague', resonance: 0.58, lastSession: 'Mar 8' },
  { id: 3, initial: 'S', name: 'Sara', convos: 5, tag: 'friend', resonance: 0.51, lastSession: 'Mar 8' },
  { id: 4, initial: 'J', name: 'Jay', convos: 3, tag: 'acquaintance', resonance: 0.44, lastSession: 'Mar 5' },
  { id: 5, initial: 'L', name: 'Luna', convos: 2, tag: 'new', resonance: 0.39, lastSession: 'Feb 28' },
];

export const scoreTrend = [
  { date: '3/1', score: 52 },
  { date: '3/6', score: 61 },
  { date: '3/12', score: 48 },
  { date: '3/18', score: 58 },
  { date: '3/24', score: 65 },
  { date: '4/2', score: 55 },
  { date: '4/14', score: 71 },
  { date: '5/1', score: 68 },
];

export const friendInsight = 'Marcus tends to be more quiet when you initiate topics about work. Consider letting him lead next time.';

export const constellationDots = [
  { x: 15, y: 30, bright: true },
  { x: 42, y: 18, bright: false },
  { x: 68, y: 55, bright: true },
  { x: 25, y: 72, bright: false },
  { x: 85, y: 35, bright: true },
  { x: 55, y: 80, bright: false },
  { x: 35, y: 48, bright: true },
  { x: 78, y: 70, bright: false },
  { x: 12, y: 58, bright: false },
  { x: 92, y: 22, bright: true },
  { x: 48, y: 42, bright: false },
  { x: 72, y: 88, bright: true },
];

export const userProfile = {
  name: 'Aayush',
  overallResonance: 71,
  percentile: 'Top 12% of users',
  hrvBaseline: '62ms',
  avgFeltTime: '23 min',
  avgRealTime: '31 min',
  authorshipAvg: '52%',
  authorshipLabel: 'Balanced',
  sessionsThisMonth: 14,
  signature: 'In the presence of others, your nervous system leads. You regulate the room before you know you\'re doing it.',
};

export const momentData = {
  person: 'Marcus',
  timeIntoSession: '4:23',
  insight: 'Marcus may have seen you as passive-aggressive here.',
  metrics: [
    { label: 'BOTH ACTIVATED', icon: 'dual-ring' },
    { label: 'DIVERGENCE \u2191', icon: 'arrow-up' },
    { label: 'UNSAID: HIGH', icon: 'dot-filled' },
  ],
};
