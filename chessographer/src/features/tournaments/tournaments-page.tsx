import { useState } from 'react'

import { useEditMode, useMedia, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { EditableImage } from '@/components/media/editable-image'
import { PhotoViewer } from '@/components/media/photo-viewer'

type ActivePhoto = {
  image: string
  alt: string
  title: string
  caption: string
}

export function TournamentsPage() {
  const site = useSite()
  const { tournaments, tournamentsHero } = useMedia()
  const editing = Boolean(useEditMode())
  const [active, setActive] = useState<ActivePhoto | null>(null)

  if (!tournaments || !tournamentsHero) return null

  return (
    <>
      <PageHero
        slot={{ kind: 'tournaments-hero' }}
        image={tournamentsHero.image}
        alt={tournamentsHero.alt}
        position={tournamentsHero.position}
        eyebrow={site.name}
        title="Tournaments"
        summary={tournamentsHero.summary}
      />
      <section className="py-8 md:py-12">
        <Container>
          <ul>
            {tournaments.map((tournament) => (
              <li key={tournament.id} className="border-t border-border py-14 md:py-20">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                      {tournament.date}
                      <span aria-hidden="true"> — </span>
                      {tournament.place}
                    </p>
                    <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
                      {tournament.title}
                    </h2>
                    <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                      {tournament.summary}
                    </p>
                    <a
                      href={tournament.albumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex min-h-11 items-center text-[11px] tracking-[0.18em] uppercase underline decoration-1 underline-offset-8 transition-opacity hover:opacity-50"
                    >
                      Google Photos
                    </a>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8">
                    {tournament.photos.map((photo) => {
                      const image = (
                        <EditableImage
                          slot={{
                            kind: 'tournament-photo',
                            tournamentId: tournament.id,
                            photoId: photo.id,
                          }}
                          src={photo.image}
                          alt={photo.alt}
                          loading="lazy"
                          style={{ objectPosition: photo.position ?? 'center' }}
                          className="aspect-square w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover/photo:scale-[1.04]"
                        />
                      )
                      return (
                        <li key={photo.id}>
                          {editing ? (
                            <div className="overflow-hidden bg-muted">{image}</div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setActive({
                                  image: photo.image,
                                  alt: photo.alt,
                                  title: tournament.title,
                                  caption: tournament.date,
                                })
                              }
                              aria-label={`View a photograph from ${tournament.title}`}
                              className="group block w-full cursor-pointer overflow-hidden bg-muted outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                            >
                              {image}
                            </button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <PhotoViewer
        photo={
          active
            ? {
                image: active.image,
                alt: active.alt,
                title: active.title,
                caption: active.caption,
              }
            : null
        }
        onClose={() => setActive(null)}
      />
    </>
  )
}
