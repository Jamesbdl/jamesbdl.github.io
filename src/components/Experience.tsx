import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { experience } from '../data/content'
import { asset } from '../lib/asset'
import LoopVideo from './LoopVideo'
import { Eyebrow, Reveal, SplitHeading } from './Reveal'

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrap.current || !line.current || reducedMotion()) return
    const tween = gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top 60%', end: 'bottom 70%', scrub: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="experience" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Eyebrow n="05" label="Experience" />
            <SplitHeading
              text="Six years, one thread: control at scale."
              className="font-serif text-5xl leading-[1.02] text-bone md:text-6xl"
            />
            <Reveal className="mt-10 hidden md:block">
              <LoopVideo
                src={asset('video/experience.mp4')}
                fallback={asset('img/experience.webp')}
                alt="James Delgado with hands joined in a steeple, rings and ascot visible, black and white portrait"
                className="aspect-[4/5] w-full rounded-sm border border-white/10"
              />
              <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-silver uppercase">
                Fig. 04 — Calm under pressure
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={wrap} className="relative md:col-span-8">
          <div className="absolute top-0 left-0 h-full w-px bg-white/10" aria-hidden="true" />
          <div ref={line} className="absolute top-0 left-0 h-full w-px origin-top bg-gold" aria-hidden="true" />

          <ol className="space-y-20 pl-8 md:pl-14">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[37px] h-3 w-3 rounded-full border border-gold bg-ink md:-left-[61px]"
                />
                <Reveal>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">{job.period}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight text-bone md:text-5xl">{job.company}</h3>
                  <p className="mt-2 text-silver italic">{job.role}</p>
                  <ul className="mt-6 space-y-4">
                    {job.bullets.map((b) => (
                      <li key={b.lead} className="flex gap-4 text-sm leading-relaxed text-silver md:text-base">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-gold/70" aria-hidden="true" />
                        <span>
                          <strong className="font-medium text-bone">{b.lead}</strong> — {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
