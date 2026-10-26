import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

type Props = { heroReady: boolean; onStart: () => void }

export default function Preloader({ heroReady, onStart }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const left = useRef(false)
  const [minDone, setMinDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const fast = reducedMotion()
    const progress = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => setMinDone(true) })
    tl.to(
      progress,
      {
        v: 100,
        duration: fast ? 0.2 : 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(progress.v)).padStart(3, '0')
        },
      },
      0,
    )
    tl.fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: fast ? 0.2 : 1.9, ease: 'power2.inOut' }, 0)
    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (!minDone) return
    const leave = () => {
      if (left.current) return
      left.current = true
      onStart()
      gsap.to(root.current, {
        yPercent: -100,
        duration: reducedMotion() ? 0.1 : 1.1,
        ease: 'power4.inOut',
        onComplete: () => setGone(true),
      })
    }
    if (heroReady) leave()
    const cap = window.setTimeout(leave, 4500)
    return () => window.clearTimeout(cap)
  }, [minDone, heroReady, onStart])

  if (gone) return null

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink">
      <div className="font-serif text-6xl tracking-[0.25em] text-bone">JD</div>
      <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
        <div ref={line} className="h-full origin-left bg-gold" />
      </div>
      <div className="mt-4 font-mono text-xs tracking-[0.3em] text-silver">
        <span ref={num}>000</span>
      </div>
    </div>
  )
}
