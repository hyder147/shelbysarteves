import { useEffect, useRef } from 'react'

const bars = Array.from({ length: 28 }, (_, i) => i)
const HEADLINE = "Every missed call is a job you didn't do.".split(' ')

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onMove(e) {
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      node.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    node.addEventListener('mousemove', onMove)
    return () => node.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-blobs" aria-hidden="true">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
      </div>

      <div className="wrap hero-grid">
        <div>
          <div className="kicker hero-in" style={{ animationDelay: '0.05s' }}>
            AI OPERATIONS FOR LOCAL SERVICE BUSINESSES
          </div>
          <h1 className="hero-headline">
            {HEADLINE.map((word, i) => (
              <span className="hero-word-wrap" key={i}>
                <span className="hero-word" style={{ animationDelay: `${0.18 + i * 0.055}s` }}>
                  {word}
                  {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-lede hero-in" style={{ animationDelay: '0.62s' }}>
            Shelby's Arteves builds AI coverage agents that answer your phone, follow up with
            customers, and clear the admin work that a small business never has time for.
          </p>
          <div className="hero-ctas hero-in" style={{ animationDelay: '0.72s' }}>
            <a href="#contact" className="btn btn-primary btn-magnetic">Get your missed call report</a>
            <a href="#services" className="btn btn-outline">See the platform</a>
          </div>
        </div>

        <div className="signal-panel hero-in" style={{ animationDelay: '0.5s' }}>
          <div className="radar-glow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="signal-head">
            <span>MAIN LINE, INBOUND SIGNAL</span>
            <span className="live"><span className="live-dot" />COVERED</span>
          </div>
          <div className="waveform">
            {bars.map((i) => (
              <span
                key={i}
                style={{
                  animationDelay: `${(i % 7) * 0.12}s`,
                  height: `${20 + ((i * 37) % 80)}%`,
                }}
              />
            ))}
          </div>
          <div className="signal-caption">
            <span>Calls answered tonight: <strong>3</strong></span>
            <span>Missed: <strong>0</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
