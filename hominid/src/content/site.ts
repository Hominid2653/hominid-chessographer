import type { SiteContent } from '@/content/types'

const image = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

export const site: SiteContent = {
  name: 'Hominid Photography',
  shortName: 'Hominid',
  description: 'Portraits, weddings, and corporate events.',
  nav: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#about' },
    { label: 'Enquire', href: '/#contact' },
  ],
  hero: {
    eyebrow: 'Hominid Photography',
    title: [{ text: 'People,' }, { text: 'quietly', italic: true }, { text: 'seen.' }],
    summary:
      'Portraits, weddings, and corporate events, photographed with patience and a light touch.',
    image: image('photo-1524504388940-b1c1722653e1', 2400),
    alt: 'Portrait of a woman standing in soft daylight',
    position: 'center 22%',
  },
  statement: {
    kicker: '01 — Practice',
    title: [{ text: 'As it' }, { text: 'happened.', italic: true }],
    body: 'Hominid Photography stays close to the person and the room. The pictures are calm, specific, and faithful to the day itself.',
  },
  work: {
    kicker: '02 — Pictures',
    title: 'Selected work',
    filters: ['All', 'Portraits', 'Weddings', 'Corporate'],
    items: [
      {
        id: 'close-study',
        title: 'Close study',
        category: 'Portraits',
        image: image('photo-1531746020798-e6953c6e8e04', 1800),
        alt: 'Close portrait of a woman looking toward the camera',
        position: 'center 18%',
      },
      {
        id: 'procession',
        title: 'Procession',
        category: 'Weddings',
        image: image('photo-1519741497674-611481863552', 1600),
        alt: 'A couple walking together outdoors on their wedding day',
        position: 'center 30%',
      },
      {
        id: 'assembly',
        title: 'Assembly',
        category: 'Corporate',
        image: image('photo-1540575467063-178a50c2df87', 1600),
        alt: 'An audience gathered for a conference',
        position: 'center',
      },
      {
        id: 'studio',
        title: 'Studio',
        category: 'Portraits',
        image: image('photo-1544005313-94ddf0286df2', 1400),
        alt: 'Portrait of a woman against a muted background',
        position: 'center 15%',
      },
      {
        id: 'evening',
        title: 'Evening',
        category: 'Weddings',
        image: image('photo-1520854221256-17451cc331bf', 1600),
        alt: 'A wedding celebration in warm evening light',
        position: 'center 40%',
      },
      {
        id: 'sitting',
        title: 'Sitting',
        category: 'Portraits',
        image: image('photo-1507003211169-0a1dd7228f2d', 1400),
        alt: 'Portrait of a man in soft light',
        position: 'center 18%',
      },
    ],
  },
  about: {
    kicker: '03 — Studio',
    title: [{ text: 'A practice' }, { text: 'of attention.', italic: true }],
    body: 'Sittings, weddings, and corporate events are approached the same way: enough time, careful light, and no interference with the moment. The result is a record you can return to.',
    image: image('photo-1465495976277-4387d4b0b4c6', 1800),
    alt: 'A couple photographed outdoors in natural light',
    position: 'center 30%',
  },
  services: {
    kicker: '04 — Services',
    title: [{ text: 'What we' }, { text: 'photograph.', italic: true }],
    items: [
      {
        name: 'Portraits',
        description:
          'Individuals, families, and editorial sittings. In the studio or on location, with time to settle.',
      },
      {
        name: 'Weddings',
        description:
          'Ceremony, portraits, and the hours around them. Quiet coverage that stays with the people, not the schedule.',
      },
      {
        name: 'Corporate events',
        description:
          'Conferences, gatherings, and portraits of teams. Pictures that feel composed without looking staged.',
      },
    ],
  },
  enquire: {
    kicker: '05 — Contact',
    title: [{ text: 'Begin with' }, { text: 'a note.', italic: true }],
    body: 'Tell us about the portrait, the wedding, or the event. A short description is enough to start.',
    interests: ['Portraits', 'Weddings', 'Corporate events'],
  },
}
