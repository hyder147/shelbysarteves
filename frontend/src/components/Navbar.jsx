import { useEffect, useRef, useState } from 'react'
import { FiInstagram } from 'react-icons/fi'
import './Navbar.css'

const LINKS = [
  { href: '#services', label: 'Platform' },
  { href: '#industries', label: 'Solutions' },
  { href: '#how', label: 'How it works' },
  { href: '#contact', label: 'Contact' },
]

function LogoMark() {
  return (
    <img
      className="navbar-mark"
      src="/logo.png"
      width="34"
      height="34"
      alt="Shelby's Arteves logo"
    />
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const linksRef = useRef(null)
  const linkRefs = useRef({})

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Slide a gradient pill under whichever link is active, measured against
  // the actual DOM so it always lines up regardless of font/zoom.
  useEffect(() => {
    function measure() {
      const container = linksRef.current
      const el = linkRefs.current[active]
      if (!container || !el) {
        setIndicator((v) => ({ ...v, opacity: 0 }))
        return
      }
      const cRect = container.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      setIndicator({ left: eRect.left - cRect.left, width: eRect.width, opacity: 1 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close the mobile panel automatically if the viewport grows back to desktop.
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 860) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="wrap navbar-row">
        <a href="#top" className="navbar-brand" onClick={() => setOpen(false)}>
          <LogoMark />
          Shelby's Arteves
        </a>

        <nav className="navbar-links" ref={linksRef}>
          <span
            className="navbar-indicator"
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.opacity }}
          />
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => { linkRefs.current[l.href] = el }}
              className={`navbar-link ${active === l.href ? 'navbar-link-active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="navbar-right">
          <a href="https://instagram.com/shelbysarteves" target="_blank" rel="noopener noreferrer" className="navbar-ig" aria-label="Shelby's Arteves on Instagram">
            <FiInstagram size={16} />
            <span>@shelbysarteves</span>
          </a>
          <a href="#contact" className="navbar-cta">
            <span>Book a demo</span>
          </a>
          <button
            className={`navbar-toggle ${open ? 'navbar-toggle-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navbar-panel ${open ? 'navbar-panel-open' : ''}`}>
        <div className="navbar-panel-backdrop" onClick={() => setOpen(false)} />
        <div className="navbar-panel-sheet">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="navbar-panel-link"
              style={{ transitionDelay: open ? `${90 + i * 55}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/shelbysarteves"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-panel-link navbar-panel-ig"
            style={{ transitionDelay: open ? `${90 + LINKS.length * 55}ms` : '0ms' }}
            onClick={() => setOpen(false)}
          >
            <FiInstagram size={17} />
            @shelbysarteves
          </a>
          <a
            href="#contact"
            className="navbar-cta navbar-panel-cta"
            style={{ transitionDelay: open ? `${90 + (LINKS.length + 1) * 55}ms` : '0ms' }}
            onClick={() => setOpen(false)}
          >
            <span>Book a demo</span>
          </a>
        </div>
      </div>
    </header>
  )
}
