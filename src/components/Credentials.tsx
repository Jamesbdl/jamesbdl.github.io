import { education, profile } from '../data/content'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'

export default function Credentials() {
  return (
    <section id="credentials" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="06" label="Credentials" />
        <SplitHeading
          text="Education, certifications and what is next."
          className="max-w-4xl font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {education.map((e, i) => {
            const pending = e.status === 'In progress'
            return (
              <Reveal key={e.title} delay={(i % 3) * 0.08} y={30}>
                <article
                  data-cursor
                  className={`flex h-full flex-col rounded-sm border p-7 transition-colors duration-300 hover:border-gold/60 ${
                    pending ? 'border-gold/40 bg-gold/[0.04]' : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase">
                    {pending && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" aria-hidden="true" />}
                    <span className={pending ? 'text-gold' : 'text-silver'}>{e.status}</span>
                  </p>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-bone">{e.title}</h3>
                  <p className="mt-3 text-sm text-silver">{e.org}</p>
                  <p className="mt-auto pt-6 text-xs text-silver/70">{e.note}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-14 rounded-sm border border-white/10 p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">Currently</p>
          <p className="mt-3 font-serif text-3xl leading-snug text-bone md:text-4xl">{profile.current}</p>
          <p className="mt-3 text-silver">Working toward the PMP and CFA Level I credentials.</p>
        </Reveal>
      </div>
    </section>
  )
}
