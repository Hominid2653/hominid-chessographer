import { useSite } from '@/app/media-hooks'
import { PageHero } from '@/components/layout/page-hero'
import { PortfolioFolders } from '@/features/portfolio/portfolio-folders'

export function PortfolioPage() {
  const site = useSite()

  return (
    <>
      <PageHero
        slot={{ kind: 'hero' }}
        image={site.hero.image}
        alt={site.hero.alt}
        position={site.hero.position}
        eyebrow={site.name}
        title="Portfolio"
        summary={site.description}
      />
      <PortfolioFolders />
    </>
  )
}
