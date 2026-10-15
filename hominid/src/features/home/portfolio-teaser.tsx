import { useEditMode, usePreviewNav, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { Reveal } from '@/components/motion/reveal'
import { SmartLink } from '@/components/layout/smart-link'
import { EditableImage } from '@/components/media/editable-image'
import { SectionLabel } from '@/components/type/section-label'

export function PortfolioTeaser() {
  const lead = useSite().work.items[0]
  const editing = Boolean(useEditMode())
  const preview = usePreviewNav()

  if (!lead) return null

  const image = (
    <EditableImage
      slot={{ kind: 'work', id: lead.id }}
      src={lead.image}
      alt={lead.alt}
      style={{ objectPosition: lead.position ?? 'center' }}
      className="aspect-[3/2] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover/photo:scale-[1.04] md:aspect-[16/9]"
    />
  )

  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              Selected pictures
            </h2>
          </div>
          <SmartLink
            to="/portfolio"
            className="shrink-0 pb-1 text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-50"
          >
            View portfolio
          </SmartLink>
        </Reveal>
        {editing ? (
          <Reveal className="mt-8 overflow-hidden bg-muted">
            <div className="reveal-media">{image}</div>
          </Reveal>
        ) : preview ? (
          <Reveal className="mt-8">
            <button
              type="button"
              aria-label="View the portfolio"
              onClick={() => preview.go('/portfolio')}
              className="group block w-full cursor-pointer overflow-hidden bg-muted text-left"
            >
              <span className="reveal-media block">{image}</span>
            </button>
          </Reveal>
        ) : (
          <Reveal className="mt-8">
            <SmartLink
              to="/portfolio"
              ariaLabel="View the portfolio"
              className="group block overflow-hidden bg-muted"
            >
              <span className="reveal-media block">{image}</span>
            </SmartLink>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
