import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/motion'

type Props = {
  src: string
  fallback: string
  alt: string
  className?: string
  position?: string
  /** Loop only the first N seconds of the clip. */
  maxSeconds?: number
}

/**
 * Shows the photo first. A short muted clip fades in on top once it has loaded and
 * only plays while the frame is on screen. If the clip is missing, the photo stays.
 */
export default function LoopVideo({ src, fallback, alt, className = '', position = '50% 30%', maxSeconds }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el || reducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '700px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    const el = wrap.current
    if (!v || !el || !near) return
    const onData = () => setReady(true)
    const onTime = () => {
      if (maxSeconds && v.currentTime >= maxSeconds) v.currentTime = 0
    }
    v.addEventListener('loadeddata', onData)
    v.addEventListener('timeupdate', onTime)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void v.play().catch(() => undefined)
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      v.removeEventListener('loadeddata', onData)
      v.removeEventListener('timeupdate', onTime)
      io.disconnect()
    }
  }, [near, maxSeconds])

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-ink ${className}`}>
      <img
        src={fallback}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <video
        ref={video}
        src={near ? src : undefined}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition: position }}
      />
    </div>
  )
}
