import { About } from '@/features/home/about'
import { Enquire } from '@/features/home/enquire'
import { FeatureBand } from '@/features/home/feature-band'
import { Hero } from '@/features/home/hero'
import { PortfolioTeaser } from '@/features/home/portfolio-teaser'
import { Services } from '@/features/home/services'
import { Statement } from '@/features/home/statement'

export function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <PortfolioTeaser />
      <FeatureBand />
      <About />
      <Services />
      <Enquire />
    </>
  )
}
