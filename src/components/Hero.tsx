import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, splitWords } from '../lib/motion'
import { asset } from '../lib/asset'
import { profile } from '../data/content'
import Button from './Button'

type Props = { ready: boolean; onVideoReady: () => void }

export default function Hero({ ready, onVideoReady }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const text = useRef<HTMLDivElement>(null)
  const first = useRef<HTMLSpanElement>(null)
  const last = useRef<HTMLSpanElement>(null)
  const words = useRef<HTMLElement[]>([])
  const shown = useRef(false)
  const introPlayed = useRef(false)
  const [ended, setEnded] = useState(false)

  useLayoutEffect(() => {
    const parts = [first.current, last.current].filter((p): p is HTMLSpanElement => p !== null)
    words.current = parts.flatMap((p) => splitWords(p))
    gsap.set(words.current, { yPercent: 115 })
    gsap.set(text.current?.querySelectorAll('[data-fade]') ?? [], { opacity: 0, y: 24 })
  }, [])

  const reveal = useCallback(() => {
    if (shown.current) return
    shown.current = true
    if (introPlayed.current) {
      gsap.to(text.current, { opacity: 1, duration: 0.8 })
      return
    }
    introPlayed.current = true
    const fades = text.current?.querySelectorAll('[data-fade]') ?? []
    gsap
      .timeline()
      .to(words.current, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.08 })
      .to(fades, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, '-=0.7')
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    const canPlay = () => onVideoReady()
    const onTime = () => {
      if (v.currentTime >= 4.6) reveal()
    }
    const onEnd = () => {
      reveal()
      setEnded(true)
    }
    v.addEventListener('canplay', canPlay)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnd)
    v.addEventListener('error', reveal)
    if (v.readyState >= 3) canPlay()
    return () => {
      v.removeEventListener('canplay', canPlay)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnd)
      v.removeEventListener('error', reveal)
    }
  }, [onVideoReady, reveal])

  useEffect(() => {
    if (!ready) return
    const v = video.current
    if (!v) return
    if (reducedMotion()) {
      const toEnd = () => {
        v.currentTime = Math.max(0, v.duration - 0.05)
        reveal()
        setEnded(true)
      }
      if (v.readyState >= 1) toEnd()
      else v.addEventListener('loadedmetadata', toEnd, { once: true })
      return
    }
    v.play().catch(reveal)
    const fallback = window.setTimeout(reveal, 6500)
    return () => window.clearTimeout(fallback)
  }, [ready, reveal])

  const replay = () => {
    const v = video.current
    if (!v) return
    setEnded(false)
    shown.current = false
    gsap.to(text.current, { opacity: 0, duration: 0.4 })
    v.currentTime = 0
    void v.play()
  }

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink md:h-[100svh] md:min-h-[640px]"
    >
      <div className="relative h-[58svh] md:absolute md:inset-0 md:h-full">
        <video
          ref={video}
          src={asset('video/hero.mp4')}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover [object-position:78%_center] md:[object-position:center]"
        />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-ink to-transparent md:hidden" />
        <div className="absolute inset-y-0 left-0 z-[1] hidden w-[64%] bg-gradient-to-r from-ink via-ink/75 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 z-[1] hidden h-40 bg-gradient-to-t from-ink to-transparent md:block" />
      </div>

      <div className="relative z-10 -mt-24 px-6 pb-24 md:mt-0 md:flex md:h-full md:items-center md:px-16 md:pb-0">
        <div ref={text} className="max-w-2xl">
          <p data-fade className="mb-6 font-mono text-[11px] tracking-[0.34em] text-gold uppercase">
            {profile.role}
          </p>
          <h1
            aria-label={profile.name}
            className="font-serif text-[clamp(3.2rem,9vw,8.2rem)] leading-[0.92] font-medium text-bone"
          >
            <span ref={first} className="block">
              {profile.first}
            </span>
            <span ref={last} className="block text-bone/90 italic">
              {profile.last}
            </span>
          </h1>
          <p data-fade className="mt-7 max-w-lg text-base leading-relaxed text-silver md:text-lg">
            {profile.tagline}
          </p>
          <div data-fade className="mt-9 flex flex-wrap gap-4">
            <Button href="#work">Explore my work</Button>
            <Button href="#about" variant="ghost">
              About me
            </Button>
          </div>
          <p data-fade className="mt-10 font-mono text-[11px] tracking-[0.22em] text-silver/70 uppercase">
            BBVA Asset Management · COO Office · {profile.location}
          </p>
        </div>
      </div>

      {ended && (
        <button
          type="button"
          onClick={replay}
          className="absolute right-6 bottom-8 z-10 font-mono text-[11px] tracking-[0.25em] text-silver uppercase transition-colors hover:text-gold md:right-12"
        >
          ↺ Replay intro
        </button>
      )}
      <div className="scroll-cue absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.4em] text-silver uppercase md:block">
        Scroll
      </div>
    </section>
  )
}
