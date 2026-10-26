import { useState } from 'react'
import { profile } from '../data/content'
import { asset } from '../lib/asset'
import Button from './Button'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'
import StoryVideo from './StoryVideo'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      <div className="relative h-[62svh] md:absolute md:inset-0 md:h-auto">
        <div className="absolute inset-0 md:sticky md:inset-auto md:top-0 md:h-[100svh]">
          <StoryVideo
            src={asset('video/contact.mp4')}
            className="absolute inset-0 h-full w-full object-cover"
            position="62% center"
          />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-ink to-transparent md:hidden" />
          <div className="absolute inset-y-0 left-0 z-[1] hidden w-[62%] bg-gradient-to-r from-ink via-ink/90 to-transparent md:block" />
        </div>
        <div className="absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl px-6 pb-24 md:min-h-[100svh] md:items-center md:px-16 md:py-40">
        <div className="md:w-[48%]">
          <Eyebrow n="08" label="Contact" />
          <SplitHeading
            text="Let's talk operations, automation and what comes next."
            className="font-serif text-5xl leading-[1.02] text-bone md:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md leading-relaxed text-silver">
              Open to conversations about FinTech, financial operations and AI-driven automation in asset management.
              Based in {profile.location}.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <Button href={`mailto:${profile.email}`}>Email me</Button>
            <Button href={profile.linkedin} variant="ghost" external>
              LinkedIn ↗
            </Button>
            <Button href={`mailto:${profile.email}?subject=CV%20request`} variant="ghost">
              Request my CV
            </Button>
          </Reveal>

          <Reveal delay={0.3} className="mt-8">
            <button
              type="button"
              onClick={copy}
              className="font-mono text-[12px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-gold"
              aria-live="polite"
            >
              {copied ? '✓ Copied to clipboard' : `${profile.email} · copy`}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
