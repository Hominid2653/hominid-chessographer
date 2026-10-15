import { useEditMode, usePreviewNav, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
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
      className="aspect-[3/2] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover/photo:scale-[1.03] md:aspect-[16/9]"
    />
  )

  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
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
        </div>
        {editing ? (
          <div className="mt-8 overflow-hidden bg-muted">{image}</div>
        ) : preview ? (
          <button
            type="button"
            aria-label="View the portfolio"
            onClick={() => preview.go('/portfolio')}
            className="group mt-8 block w-full cursor-pointer overflow-hidden bg-muted text-left"
          >
            {image}
          </button>
        ) : (
          <SmartLink
            to="/portfolio"
            ariaLabel="View the portfolio"
            className="group mt-8 block overflow-hidden bg-muted"
          >
            {image}
          </SmartLink>
        )}
      </Container>
    </section>
  )
}
