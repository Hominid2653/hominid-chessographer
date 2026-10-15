export type DisplayLine = {
  text: string
  italic?: boolean
}

export type NavLink = {
  label: string
  href: string
}

export type WorkItem = {
  id: string
  title: string
  category: string
  image: string
  alt: string
  position?: string
}

export type SiteContent = {
  name: string
  shortName: string
  description: string
  nav: NavLink[]
  hero: {
    eyebrow: string
    title: DisplayLine[]
    summary: string
    image: string
    alt: string
    position?: string
  }
  statement: {
    kicker: string
    title: DisplayLine[]
    body: string
  }
  work: {
    kicker: string
    title: string
    filters: string[]
    items: WorkItem[]
  }
  about: {
    kicker: string
    title: DisplayLine[]
    body: string
    image: string
    alt: string
    position?: string
  }
  services: {
    kicker: string
    title: DisplayLine[]
    items: { name: string; description: string }[]
  }
  enquire: {
    kicker: string
    title: DisplayLine[]
    body: string
    interests: string[]
  }
  feature?: {
    href: string
    kicker: string
    title: string
    summary: string
    image: string
    alt: string
    position?: string
  }
}
