import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  external?: boolean
  label?: string
}

export default function Button({ href, children, variant = 'solid', external = false, label }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  const base =
    'inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300'
  const styles =
    variant === 'solid'
      ? 'bg-bone text-ink hover:bg-gold'
      : 'border border-white/25 text-bone hover:border-gold hover:text-gold'

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  )
}
