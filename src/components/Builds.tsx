import { builds } from '../data/content'
import { asset } from '../lib/asset'
import LoopVideo from './LoopVideo'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'

export default function Builds() {
  return (
    <section id="builds" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow n="04" label="Builds" />
          <SplitHeading
            text="Personal builds where the same ideas get stress-tested."
            className="font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl leading-relaxed text-silver">
              Two projects of my own. The repositories are private for now, so instead of screenshots here is what each
              one is and the thinking behind it.
            </p>
          </Reveal>

          <div className="mt-14 space-y-8">
            {builds.map((b) => (
              <Reveal key={b.title} y={30}>
                <article
                  data-cursor
                  className="rounded-sm border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-gold/50 md:p-9"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs text-gold">{b.n}</span>
                    <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-silver uppercase">
                      {b.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-4xl leading-tight text-bone md:text-5xl">{b.title}</h3>
                  <p className="mt-2 text-gold italic">{b.tagline}</p>
                  <p className="mt-5 leading-relaxed text-silver">{b.text}</p>
                  <ul className="mt-6 space-y-3">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-4 text-sm leading-relaxed text-silver md:text-base">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-gold/70" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-silver">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <LoopVideo
                src={asset('video/builds.mp4')}
                fallback={asset('img/builds.jpg')}
                alt="James Delgado with a ringed hand resting at his chin in thought, black and white portrait"
                className="aspect-[4/5] w-full rounded-sm border border-white/10"
              />
              <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-silver uppercase">
                Fig. 04 — Thinking in systems
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
