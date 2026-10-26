import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/motion'

type Props = { src: string; className?: string; position?: string; threshold?: number }

/** Loads lazily, plays once when scrolled into view and freezes on the last frame. */
export default function StoryVideo({ src, className = '', position = '50% 50%', threshold = 0.4 }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const played = useRef(false)
  const [near, setNear] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '900px 0px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || !near) return
    const reduce = reducedMotion()
    const toEnd = () => {
      v.currentTime = Math.max(0, v.duration - 0.05)
    }
    const onMeta = () => {
      if (reduce) toEnd()
    }
    const onData = () => setShown(true)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('loadeddata', onData)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce && !played.current) {
          played.current = true
          v.play().catch(toEnd)
        }
      },
      { threshold },
    )
    io.observe(v)
    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('loadeddata', onData)
      io.disconnect()
    }
  }, [near, threshold])

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-1000 ${shown ? 'opacity-100' : 'opacity-0'}`}
      src={near ? src : undefined}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ objectPosition: position }}
    />
  )
}
