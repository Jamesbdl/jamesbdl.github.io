import { useEffect, useRef, useState } from 'react'
import { nav } from '../data/content'

export default function Nav({ visible }: { visible: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 160)
      last = y
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/90 to-transparent transition-all duration-500 ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" className="font-serif text-2xl tracking-[0.28em] text-bone" aria-label="Back to top">
            JD<span className="text-gold">.</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-[12px] tracking-[0.18em] uppercase transition-colors hover:text-gold ${
                  active === id ? 'text-gold' : 'text-silver'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={`h-px w-6 bg-bone transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-bone transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
        <div ref={bar} className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-ink/97 px-10 transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {nav.map(({ label, id }, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            className="font-serif text-4xl text-bone transition-colors hover:text-gold"
            style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
          >
            <span className="mr-4 font-mono text-xs text-gold">0{i + 1}</span>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
