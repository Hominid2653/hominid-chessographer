import { type FormEvent, useState } from 'react'

import { Container } from '@/components/layout/container'
import { Reveal } from '@/components/motion/reveal'
import { DisplayLines } from '@/components/type/display-lines'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function Enquire() {
  const { enquire } = site
  const [sent, setSent] = useState(false)
  const [formKey, setFormKey] = useState(0)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-foreground text-background">
      <Container className="grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.22em] text-background/55 uppercase">
            {enquire.kicker}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            <DisplayLines lines={enquire.title} />
          </h2>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-background/70">
            {enquire.body}
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div>
              <p className="font-serif text-5xl tracking-[-0.03em] italic">Thank you.</p>
              <button
                type="button"
                className="mt-10 cursor-pointer text-[11px] tracking-[0.18em] uppercase"
                onClick={() => {
                  setSent(false)
                  setFormKey((value) => value + 1)
                }}
              >
                Write another note
              </button>
            </div>
          ) : (
            <form key={formKey} className="grid gap-8" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 w-full border-b border-background/30 bg-transparent py-3 text-base outline-none focus:border-background"
                />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full border-b border-background/30 bg-transparent py-3 text-base outline-none focus:border-background"
                />
              </label>
              <fieldset>
                <legend className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Occasion
                </legend>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {enquire.interests.map((interest, index) => (
                    <label key={interest} className="cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={interest}
                        defaultChecked={index === 0}
                        required
                        className="peer sr-only"
                      />
                      <span
                        className={cn(
                          'inline-flex min-h-11 items-center border-b border-transparent text-[11px] tracking-[0.16em] uppercase',
                          'text-background/50 peer-checked:border-background peer-checked:text-background',
                          'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-background',
                        )}
                      >
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Note
                </span>
                <textarea
                  name="note"
                  required
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-background/30 bg-transparent py-3 text-base outline-none focus:border-background"
                />
              </label>
              <div>
                <Button type="submit" variant="inverse">
                  Send note
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
