import { useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { EditableImage } from '@/components/media/editable-image'
import { DisplayLines } from '@/components/type/display-lines'

export function Hero() {
  const { hero } = useSite()

  return (
    <section>
      <div className="relative h-svh min-h-[28rem] overflow-hidden bg-muted">
        <EditableImage
          slot={{ kind: 'hero' }}
          src={hero.image}
          alt={hero.alt}
          fetchPriority="high"
          style={{ objectPosition: hero.position ?? 'center' }}
          className="size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
      <Container className="pt-12 pb-4 md:pt-16">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.25rem,7.2vw,7rem)] leading-[0.9] tracking-[-0.03em]">
          <DisplayLines lines={hero.title} />
        </h1>
        <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          {hero.summary}
        </p>
      </Container>
    </section>
  )
}
