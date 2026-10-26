import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Wraps every word of `el` in a masked span so it can slide up on reveal. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? '').trim()
  el.setAttribute('aria-label', text)
  el.textContent = ''
  const inners: HTMLElement[] = []
  const words = text.split(/\s+/).filter(Boolean)
  words.forEach((word, i) => {
    const mask = document.createElement('span')
    mask.className = 'word-mask'
    mask.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'word-inner'
    inner.textContent = word
    mask.appendChild(inner)
    el.appendChild(mask)
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
    inners.push(inner)
  })
  return inners
}
