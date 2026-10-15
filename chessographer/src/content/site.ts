import type { SiteContent } from '@/content/types'

const image = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

export const site: SiteContent = {
  name: 'Chessographer',
  shortName: 'Chessographer',
  description: 'Tournaments, club sessions, training, podcasts, and video.',
  nav: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Tournaments', href: '/tournaments' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#about' },
    { label: 'Enquire', href: '/#contact' },
  ],
  hero: {
    eyebrow: 'Chessographer',
    title: [{ text: 'The game,' }, { text: 'closely', italic: true }, { text: 'seen.' }],
    summary:
      'Tournaments, club sessions, training, podcasts, and video — a record of the game as it is played.',
    image: image('photo-1529699211952-734e80c4d42b', 2400),
    alt: 'Two players seated across a chessboard',
    position: 'center',
  },
  statement: {
    kicker: '01 — Practice',
    title: [{ text: 'The quiet' }, { text: 'at the board.', italic: true }],
    body: 'Chessographer follows tournaments and club nights, then stays for the training, the conversations, and the films made around them.',
  },
  work: {
    kicker: '02 — Pictures',
    title: 'Selected work',
    filters: ['All', 'Tournaments', 'Clubs', 'Training', 'Film'],
    items: [
      {
        id: 'match',
        title: 'Match',
        category: 'Tournaments',
        image: image('photo-1580541832626-2a7131ee809f', 1800),
        alt: 'A player leaning over a chessboard during a game',
        position: 'center 30%',
      },
      {
        id: 'board',
        title: 'Board',
        category: 'Clubs',
        image: image('photo-1528819622765-d6bcf132f793', 1600),
        alt: 'Overhead view of a chessboard in play',
        position: 'center',
      },
      {
        id: 'study',
        title: 'Study',
        category: 'Training',
        image: image('photo-1611195974226-a6a9be9dd763', 1600),
        alt: 'A close view of chess pieces on a board',
        position: 'center',
      },
      {
        id: 'session',
        title: 'Session',
        category: 'Film',
        image: image('photo-1478737270239-2f02b77fc618', 1600),
        alt: 'A studio microphone set for a recorded conversation',
        position: 'center',
      },
      {
        id: 'players',
        title: 'Players',
        category: 'Tournaments',
        image: image('photo-1529699211952-734e80c4d42b', 1800),
        alt: 'Two players seated across a chessboard',
        position: 'center',
      },
    ],
  },
  about: {
    kicker: '03 — Studio',
    title: [{ text: 'A record of' }, { text: 'the room.', italic: true }],
    body: 'The work covers the board and the people around it. Still photographs from tournaments and clubs, and sound and picture from training, podcasts, and video.',
    image: image('photo-1560174038-da43ac74f01b', 1800),
    alt: 'Chess pieces arranged across a wooden board',
    position: 'center',
  },
  services: {
    kicker: '04 — Services',
    title: [{ text: 'What we' }, { text: 'cover.', italic: true }],
    items: [
      {
        name: 'Tournaments',
        description:
          'Halls, boards, and the quiet between moves. Coverage that stays with the players rather than the crowd.',
      },
      {
        name: 'Club sessions',
        description:
          'Regular nights and casual games. The room, the clock, and the people who return each week.',
      },
      {
        name: 'Training',
        description:
          'Lessons and analysis. Pictures and recordings of the work that happens away from the event.',
      },
      {
        name: 'Podcasts & video',
        description:
          'Conversations and films made around the game, recorded with the same restraint as the stills.',
      },
    ],
  },
  enquire: {
    kicker: '05 — Contact',
    title: [{ text: 'Begin with' }, { text: 'a note.', italic: true }],
    body: 'Tell us about the tournament, the club night, or the recording. A short description is enough to start.',
    interests: ['Tournaments', 'Club sessions', 'Training', 'Podcasts & video'],
  },
  feature: {
    href: '/tournaments',
    kicker: 'Tournaments',
    title: 'Albums from the board',
    summary:
      'A few frames from each event, with the full set kept in Google Photos.',
    image: image('photo-1580541832626-2a7131ee809f', 1800),
    alt: 'A player leaning over a chessboard during a game',
    position: 'center 30%',
  },
}
