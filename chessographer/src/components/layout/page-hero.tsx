import { Container } from '@/components/layout/container'
import { EditableImage } from '@/components/media/editable-image'
import type { ImageSlot } from '@/content/media'

type PageHeroProps = {
  slot: ImageSlot
  image: string
  alt: string
  position?: string
  eyebrow: string
  title: string
  summary?: string
}

export function PageHero({
  slot,
  image,
  alt,
  position = 'center',
  eyebrow,
  title,
  summary,
}: PageHeroProps) {
  return (
    <section className="relative h-svh min-h-[28rem] overflow-hidden bg-muted">
      <EditableImage
        slot={slot}
        src={image}
        alt={alt}
        fetchPriority="high"
        style={{ objectPosition: position }}
        className="size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent">
        <Container className="pt-28 pb-12 md:pb-16">
          <p className="text-[11px] tracking-[0.22em] text-white/75 uppercase">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-white">
            {title}
          </h1>
          {summary ? (
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">{summary}</p>
          ) : null}
        </Container>
      </div>
    </section>
  )
}
