import { useSite } from '@/app/media-hooks'
import { SiteNav } from '@/components/layout/site-nav'
import { SmartLink } from '@/components/layout/smart-link'
import { HeroCarousel } from '@/components/media/hero-carousel'

export function Hero() {
  const { hero, work } = useSite()
  const headline = [
    hero.title[0]?.text ?? '',
    hero.title
      .slice(1)
      .map((line) => line.text)
      .join(' '),
  ].filter(Boolean)

  return (
    <section className="flex h-svh flex-col overflow-hidden bg-background text-foreground">
      <SiteNav className="shrink-0 px-4 py-5 md:px-10 md:py-6" />
      <div className="hero-enter shrink-0 px-5 pt-[clamp(1.25rem,3.5vh,2.75rem)] md:px-10">
        <h1 className="max-w-[14ch] font-serif text-[clamp(2.15rem,min(4.8vw,8vh),5.75rem)] leading-[1.02] tracking-[-0.02em] uppercase">
          {headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <SmartLink
          to="/portfolio"
          className="mt-[clamp(1.25rem,2.4vh,1.75rem)] inline-flex w-fit bg-frame px-8 py-3.5 text-[11px] tracking-[0.2em] text-white uppercase"
        >
          Portfolio
        </SmartLink>
      </div>
      <HeroCarousel items={work.items} />
    </section>
  )
}
