import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { stats } from '../data/content'
import { Reveal } from './Reveal'

type CounterProps = { to: number; prefix: string; suffix: string }

function Counter({ to, prefix, suffix }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }
    const o = { v: 0 }
    const tween = gsap.to(o, {
      v: to,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(o.v)}${suffix}`
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [to, prefix, suffix])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Impact in numbers" className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={30} className="bg-ink p-8 md:p-10">
            <p className="font-serif text-6xl leading-none text-bone md:text-7xl">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-5 text-sm leading-relaxed text-silver">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
