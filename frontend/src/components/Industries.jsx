import Reveal from './Reveal'
import './Industries.css'

const industries = [
  'HVAC', 'Plumbing and electrical', 'Roofing and restoration', 'Auto repair',
  'Pest control', 'Salons and spas', 'Dental and medical practices',
  'Cleaning services', 'Landscaping',
]

export default function Industries() {
  return (
    <section id="industries" className="industries-section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker" style={{ color: 'var(--teal)' }}>BUILT FOR</div>
          <h2>Local, service based, and busy</h2>
          <p style={{ color: '#B9BCC8' }}>
            If your business runs on phone calls and repeat customers, coverage pays for itself
            in the first recovered job.
          </p>
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="false">
        <div className="marquee-track">
          {[...industries, ...industries].map((name, i) => (
            <span className="chip" key={`${name}-${i}`}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
