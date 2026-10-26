import { skillGroups } from '../data/content'
import { asset } from '../lib/asset'
import { Eyebrow, ParallaxImage, Reveal, SplitHeading } from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <ParallaxImage
                src={asset('img/skills.webp')}
                alt="James Delgado adjusting his jacket, wrist watch and skull rings visible, black and white portrait"
                className="aspect-[4/5] w-full rounded-sm border border-white/10"
              />
              <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-silver uppercase">
                Fig. 02 — Precision in the details
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7">
          <Eyebrow n="02" label="Skills" />
          <SplitHeading
            text="A toolkit built around the trade lifecycle."
            className="font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
          />
          <p className="mt-6 max-w-xl text-silver">
            From pre-settlement validation to the dashboards leadership reads, these are the tools and frameworks I
            work with — grouped by what they are used for, not by a made-up proficiency score.
          </p>

          <div className="mt-14 space-y-12">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.05}>
                <h3 className="flex items-center gap-4 font-serif text-3xl text-bone italic">
                  <span className="font-mono text-xs not-italic text-gold">0{gi + 1}</span>
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-cursor
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-silver transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-sm border border-gold/30 bg-gold/[0.04] p-7">
            <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">AI-augmented engineering</p>
            <p className="mt-3 leading-relaxed text-bone/90">
              Power user of Claude Code, Antigravity and OpenAI Codex. At BBVA Asset Management these tools helped
              accelerate module development by 50% while keeping the controls — validation, auditability and
              accountability — firmly in human hands.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
