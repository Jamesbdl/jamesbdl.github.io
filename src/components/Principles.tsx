import { principles } from '../data/content'
import { asset } from '../lib/asset'
import { Eyebrow, ParallaxImage, Reveal, SplitHeading } from './Reveal'

export default function Principles() {
  return (
    <section id="principles" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="05" label="How I operate" />
        <SplitHeading
          text="Five principles behind every system I build."
          className="max-w-4xl font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
        />

        <Reveal className="mt-14">
          <ParallaxImage
            src={asset('img/closeup.webp')}
            alt="Close-up of James Delgado's eyes and a skull ring resting on his chin, black and white"
            className="aspect-[16/9] w-full rounded-sm border border-white/10 md:aspect-[21/8]"
          />
        </Reveal>

        <ol className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {principles.map((p, i) => (
            <li key={p.title}>
              <Reveal>
                <div
                  data-cursor
                  className="group grid gap-4 py-10 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:items-baseline md:gap-8 md:px-4"
                >
                  <span className="font-mono text-xs text-gold md:col-span-1">0{i + 1}</span>
                  <h3 className="font-serif text-3xl leading-tight text-bone transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                    {p.title}
                  </h3>
                  <div className="md:col-span-6">
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
    </section>
  )
}
