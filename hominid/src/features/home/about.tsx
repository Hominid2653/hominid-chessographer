import { useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { Reveal } from '@/components/motion/reveal'
import { EditableImage } from '@/components/media/editable-image'
import { DisplayLines } from '@/components/type/display-lines'
import { SectionLabel } from '@/components/type/section-label'

export function About() {
  const { about } = useSite()

  return (
    <section id="about" className="scroll-mt-20 pb-24 md:pb-36">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-5">
          <SectionLabel>{about.kicker}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.03em]">
            <DisplayLines lines={about.title} />
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {about.body}
          </p>
        </Reveal>
        <Reveal delay={120} className="order-1 overflow-hidden bg-muted lg:order-2 lg:col-span-7">
          <div className="reveal-media">
          <EditableImage
            slot={{ kind: 'about' }}
            src={about.image}
            alt={about.alt}
            loading="lazy"
            style={{ objectPosition: about.position ?? 'center' }}
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
          />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
