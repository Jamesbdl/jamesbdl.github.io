import { useEffect, useRef, type MouseEvent } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { jadeFlow, jadeTerminal, projects } from '../data/content'
import { asset } from '../lib/asset'
import { Eyebrow, ParallaxImage, Reveal, SplitHeading } from './Reveal'

function JadeFeature() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || reducedMotion()) return
    const nodes = el.querySelectorAll('[data-node]')
    const lines = el.querySelectorAll('[data-tline]')
    gsap.set(nodes, { opacity: 0, y: 24 })
    gsap.set(lines, { opacity: 0, x: -8 })
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
    tl.to(nodes, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out' }).to(
      lines,
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.32, ease: 'none' },
      '-=0.4',
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={root}
      className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-12"
    >
      <div className="bg-ink p-8 md:p-12 lg:col-span-7">
        <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">Flagship · BBVA Asset Management</p>
        <h3 className="mt-4 font-serif text-5xl leading-none text-bone md:text-7xl">JADE OS</h3>
        <p className="mt-6 max-w-xl leading-relaxed text-silver">
          A centralized operations platform engineered with Python and automated validation algorithms, running 37
          process automations across the investment and risk desks. It is an internal bank platform, so the
          details stay confidential.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {['Python', 'Native ML', 'Validation algorithms', '37 automations'].map((t) => (
            <li key={t} className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-silver">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center bg-ink-2 p-8 md:p-12 lg:col-span-5">
        <div className="w-full rounded-sm border border-white/10 bg-ink p-6 font-mono text-[12px] leading-7 text-silver md:text-[13px]">
          <div className="mb-4 flex gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
          </div>
          {jadeTerminal.map((line, i) => (
            <p
              key={line}
              data-tline
              className={`break-words ${i === 0 ? 'text-gold' : ''} ${i === jadeTerminal.length - 1 ? 'caret' : ''}`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-ink p-8 md:p-12 lg:col-span-12">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-silver uppercase">How the platform flows</p>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-3">
          {jadeFlow.flatMap((step, i) => {
            const node = (
              <li key={step.n} data-node className="rounded-sm border border-white/10 bg-white/[0.02] p-5 lg:p-4">
                <span className="font-mono text-[10px] text-gold">{step.n}</span>
                <p className="mt-2 font-serif text-2xl leading-tight text-bone lg:text-xl xl:text-2xl">{step.title}</p>
                <p className="mt-1 text-xs leading-snug text-silver">{step.text}</p>
              </li>
            )
            if (i === jadeFlow.length - 1) return [node]
            return [
              node,
              <li key={`c-${step.n}`} aria-hidden="true" className="list-none sm:hidden lg:block">
                <div className="pipe-track hidden w-8 lg:block">
                  <span className="pipe-dot" />
                </div>
                <span className="block text-center text-gold lg:hidden">↓</span>
              </li>,
            ]
          })}
        </ol>
      </div>
    </div>
  )
}

function spot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Projects() {
  return (
    <section id="work" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow n="03" label="Selected work" />
            <SplitHeading
              text="Systems that make operations faster, safer and auditable."
              className="font-serif text-5xl leading-[1.02] text-bone md:text-7xl"
            />
          </div>
          <Reveal className="hidden md:col-span-4 md:block">
            <ParallaxImage
              src={asset('img/projects.webp')}
              alt="James Delgado in cinematic profile with a cross earring, black and white portrait"
              className="aspect-[4/5] w-full max-w-[260px] rounded-sm border border-white/10 md:ml-auto"
            />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <JadeFeature />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.08} y={30}>
              <article
                onMouseMove={spot}
                data-cursor
                className="spot flex h-full flex-col rounded-sm border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-gold/50"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">{p.org}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-bone">{p.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-silver">{p.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
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
    </section>
  )
}
