import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, reducedMotion, splitWords } from '../lib/motion'

type RevealProps = { children: ReactNode; className?: string; delay?: number; y?: number }

export function Reveal({ children, className = '', delay = 0, y = 40 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const tween = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

type SplitProps = { text: string; className?: string; tag?: 'h1' | 'h2' | 'h3'; delay?: number }

export function SplitHeading({ text, className = '', tag = 'h2', delay = 0 }: SplitProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const words = splitWords(el)
    if (reducedMotion()) return
    gsap.set(words, { yPercent: 115 })
    const tween = gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.06,
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text, delay])

  const Tag = tag as 'h2'
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}

export function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <Reveal>
      <p className="mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
        <span>{n}</span>
        <span className="h-px w-10 bg-gold/60" />
        <span>{label}</span>
      </p>
    </Reveal>
  )
}

type ParallaxProps = { src: string; alt: string; className?: string }

export function ParallaxImage({ src, alt, className = '' }: ParallaxProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!wrap.current || !img.current || reducedMotion()) return
    const tween = gsap.fromTo(
      img.current,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover"
      />
    </div>
  )
}
