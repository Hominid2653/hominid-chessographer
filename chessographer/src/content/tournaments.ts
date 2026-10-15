const image = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

export type TournamentPhoto = {
  id: string
  image: string
  alt: string
  position?: string
}

export type Tournament = {
  id: string
  title: string
  date: string
  place: string
  summary: string
  albumUrl: string
  photos: TournamentPhoto[]
}

export const tournamentsPage = {
  image: image('photo-1529699211952-734e80c4d42b', 2400),
  alt: 'Two players seated across a chessboard',
  position: 'center',
  summary: 'A few frames from each event. The full album lives in Google Photos.',
}

// Replace albumUrl with each event's Google Photos share link.
export const tournaments: Tournament[] = [
  {
    id: 'city-open',
    title: 'City Open',
    date: 'March 2026',
    place: 'Main hall',
    summary: 'Boards, clocks, and the quiet between rounds.',
    albumUrl: 'https://photos.google.com/',
    photos: [
      {
        id: 'city-open-board',
        image: image('photo-1528819622765-d6bcf132f793', 1200),
        alt: 'Overhead view of a chessboard in play',
      },
      {
        id: 'city-open-player',
        image: image('photo-1580541832626-2a7131ee809f', 1200),
        alt: 'A player leaning over a chessboard',
        position: 'center 30%',
      },
      {
        id: 'city-open-pieces',
        image: image('photo-1611195974226-a6a9be9dd763', 1200),
        alt: 'A close view of chess pieces',
      },
    ],
  },
  {
    id: 'club-championship',
    title: 'Club Championship',
    date: 'June 2026',
    place: 'Club room',
    summary: 'The long games, and the room around them.',
    albumUrl: 'https://photos.google.com/',
    photos: [
      {
        id: 'club-players',
        image: image('photo-1529699211952-734e80c4d42b', 1200),
        alt: 'Two players seated across a chessboard',
      },
      {
        id: 'club-wood',
        image: image('photo-1560174038-da43ac74f01b', 1200),
        alt: 'Chess pieces arranged across a wooden board',
      },
    ],
  },
]
