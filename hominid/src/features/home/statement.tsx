import { Container } from '@/components/layout/container'
import { Reveal } from '@/components/motion/reveal'
import { DisplayLines } from '@/components/type/display-lines'
import { SectionLabel } from '@/components/type/section-label'
import { site } from '@/content/site'

export function Statement() {
  const { statement } = site

  return (
    <section className="py-24 md:py-36">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12">
        <SectionLabel>{statement.kicker}</SectionLabel>
        <div className="lg:col-span-9 lg:col-start-4">
          <h2 className="font-serif text-[clamp(2.6rem,5.6vw,4.75rem)] leading-[0.95] tracking-[-0.03em]">
            <DisplayLines lines={statement.title} />
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {statement.body}
          </p>
        </div>
        </Reveal>
      </Container>
    </section>
  )
}
