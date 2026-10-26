import { tools } from '../data/content'

export default function Marquee() {
  const items = [...tools, ...tools]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink-2 py-6" role="presentation">
      <div className="marquee" aria-hidden="true">
        {items.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="mx-8 flex items-center gap-8 font-serif text-3xl whitespace-nowrap text-bone/80 italic md:text-4xl"
          >
            {tool}
            <span className="text-base text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
