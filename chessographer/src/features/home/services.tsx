import { Container } from '@/components/layout/container'
import { DisplayLines } from '@/components/type/display-lines'
import { SectionLabel } from '@/components/type/section-label'
import { site } from '@/content/site'

export function Services() {
  const { services } = site

  return (
    <section id="services" className="scroll-mt-20 pb-24 md:pb-36">
      <Container>
        <SectionLabel>{services.kicker}</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.03em]">
          <DisplayLines lines={services.title} />
        </h2>
        <ol className="mt-14 border-b border-border">
          {services.items.map((item, index) => (
            <li
              key={item.name}
              className="grid gap-3 border-t border-border py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
            >
              <span className="text-[11px] tracking-[0.18em] text-muted-foreground md:col-span-2 md:pt-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-4xl tracking-[-0.03em] md:col-span-4 md:text-5xl">
                {item.name}
              </h3>
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-6 md:pt-3">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
