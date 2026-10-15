import { useEditMode, usePreviewNav, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { SmartLink } from '@/components/layout/smart-link'
import { EditableImage } from '@/components/media/editable-image'
import { SectionLabel } from '@/components/type/section-label'

export function FeatureBand() {
  const feature = useSite().feature
  const editing = Boolean(useEditMode())
  const preview = usePreviewNav()

  if (!feature) return null

  const image = (
    <EditableImage
      slot={{ kind: 'feature' }}
      src={feature.image}
      alt={feature.alt}
      style={{ objectPosition: feature.position ?? 'center' }}
      className="aspect-[3/2] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover/photo:scale-[1.03] md:aspect-[16/9]"
    />
  )

  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel>{feature.kicker}</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              {feature.title}
            </h2>
          </div>
          <SmartLink
            to={feature.href}
            className="shrink-0 pb-1 text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-50"
          >
            View albums
          </SmartLink>
        </div>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          {feature.summary}
        </p>
        {editing ? (
          <div className="mt-8 overflow-hidden bg-muted">{image}</div>
        ) : preview ? (
          <button
            type="button"
            aria-label={feature.title}
            onClick={() => preview.go(feature.href)}
            className="group mt-8 block w-full cursor-pointer overflow-hidden bg-muted text-left"
          >
            {image}
          </button>
        ) : (
          <SmartLink
            to={feature.href}
            ariaLabel={feature.title}
            className="group mt-8 block overflow-hidden bg-muted"
          >
            {image}
          </SmartLink>
        )}
      </Container>
    </section>
  )
}
