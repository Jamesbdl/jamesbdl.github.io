import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 text-xs text-silver md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="font-mono tracking-[0.2em] uppercase">{profile.role}</p>
        <a href="#top" className="font-mono tracking-[0.25em] uppercase transition-colors hover:text-gold">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
