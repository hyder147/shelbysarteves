import { useEffect, useState } from 'react'
import { fetchServices } from '../api'
import Reveal from './Reveal'
import './Services.css'

const FALLBACK_SERVICES = [
  { code: 'CALL', name: 'After-hours call coverage', description: "An AI agent answers every call you'd otherwise miss, books the job on your calendar, and texts the customer a confirmation. Nights and weekends included." },
  { code: 'WARR', name: 'Warranty and service recapture', description: 'We track install and service dates from your own job history and reach out to customers right before a warranty or replacement window opens.' },
  { code: 'REV', name: 'Reputation firefighting', description: 'A short post-job text catches unhappy customers before they post publicly, and routes only happy ones toward a review request.' },
  { code: 'LEAD', name: 'Instant lead response', description: 'Web and social form leads get a qualifying reply within seconds, not hours. Well before a competitor gets there first.' },
  { code: 'GHOST', name: 'Dead quote recovery', description: 'Old estimates that never closed get a timed, relevant follow-up months later. Revenue you already paid to generate once.' },
  { code: 'CLAIM', name: 'Insurance claim documentation', description: 'Job photos and technician notes are turned into insurance-ready claim paperwork the same day, for faster payout on restoration and roofing jobs.' },
  { code: 'LIC', name: 'License and compliance tracking', description: 'Renewals, insurance certs, and inspections are tracked across every location and technician, with a nag well before anything lapses.' },
  { code: 'LANG', name: 'Multilingual front desk', description: 'Calls and messages are handled fluently in the languages your customer base actually speaks, not just English.' },
]

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const [source, setSource] = useState('fallback')

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setServices(data)
          setSource('api')
        }
      })
      .catch(() => setSource('fallback'))
  }, [])

  return (
    <section id="services" className="services-section">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">THE PLATFORM</div>
          <h2>Eight quiet leaks in every local business</h2>
          <p>None of these need a new hire. Each one runs as a standing agent connected to your phone line, calendar, or job history.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal as="div" className="service-card" key={s.code} delay={(i % 2) * 80}>
              <div className="service-code">{s.code}</div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </Reveal>
          ))}
        </div>
        <div className="services-status">
          {source === 'api' ? 'Loaded live from the Shelby\'s Arteves API' : 'Showing built-in service list (backend not running)'}
        </div>
      </div>
    </section>
  )
}
