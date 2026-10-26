import { aboutParagraphs, languages, pillars } from '../data/content'
import { asset } from '../lib/asset'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'
import StoryVideo from './StoryVideo'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink">
      <div className="relative h-[62svh] md:absolute md:inset-0 md:h-auto">
        <div className="absolute inset-0 md:sticky md:inset-auto md:top-0 md:h-[100svh]">
          <StoryVideo
            src={asset('video/about.mp4')}
            className="absolute inset-0 h-full w-full object-cover"
            position="22% center"
          />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-ink to-transparent md:hidden" />
          <div className="absolute inset-y-0 right-0 z-[1] hidden w-[70%] bg-gradient-to-l from-ink via-ink/90 to-transparent md:block" />
        </div>
        <div className="absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[2] hidden h-32 bg-gradient-to-t from-ink to-transparent md:block" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl px-6 pb-24 md:min-h-[110svh] md:items-center md:justify-end md:px-16 md:py-40">
        <div className="md:w-[52%]">
          <Eyebrow n="01" label="About" />
          <SplitHeading
            text="Operator by training. Builder by instinct."
            className="font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-silver md:text-lg">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} y={24}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} y={24} className="bg-ink/90 p-6 backdrop-blur-sm">
                <h3 className="font-serif text-2xl text-gold italic">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {languages.map((l) => (
              <div key={l.label} className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-bone">{l.level}</span>
                <span className="text-xs leading-snug text-silver">
                  {l.label}
                  <br />
                  <span className="text-silver/60">{l.org}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
