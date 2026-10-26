import { principles } from '../data/content'
import { asset } from '../lib/asset'
import LoopVideo from './LoopVideo'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'

export default function Principles() {
  return (
    <section id="principles" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="06" label="How I operate" />
        <SplitHeading
          text="Five principles behind every system I build."
          className="max-w-4xl font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <LoopVideo
                  src={asset('video/principles.mp4')}
                  fallback={asset('img/principles.jpg')}
                  alt="James Delgado with arms crossed and a steady gaze, black and white portrait"
                  className="aspect-[4/5] w-full rounded-sm border border-white/10"
                />
                <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-silver uppercase">
                  Fig. 06 — Decisions, not drama
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10 md:col-span-8">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Reveal>
                  <div
                    data-cursor
                    className="group py-9 transition-colors duration-500 hover:bg-white/[0.02] md:px-4"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                      <h3 className="font-serif text-3xl leading-tight text-bone transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                        {p.title}
                      </h3>
                    </div>
                    <div className="mt-4 md:pl-10">
                      <p className="leading-relaxed text-silver">{p.text}</p>
                      <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-gold/80 uppercase">
                        ↳ {p.proof}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
