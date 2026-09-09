import { FiShield, FiZap, FiGlobe, FiTrendingUp, FiFileText, FiHeart } from 'react-icons/fi'
import Reveal from './Reveal'
import './WhyUs.css'

const benefits = [
  { icon: FiZap, title: 'Live in days, not months', body: 'No new software to learn and nothing to migrate. Coverage starts on your existing phone line.' },
  { icon: FiHeart, title: 'Sounds like your business', body: "Trained on your services, pricing, and tone before it ever talks to a customer, and reviewed by you first." },
  { icon: FiGlobe, title: 'Fluent in more than English', body: 'Serve the languages your customer base actually speaks, without hiring for it.' },
  { icon: FiFileText, title: 'Every call, on paper', body: 'A transcript and outcome for every conversation, so nothing depends on memory.' },
  { icon: FiShield, title: 'Built for trades, not call centers', body: "No contact-center jargon or seat licenses. Priced and built for a business your size." },
  { icon: FiTrendingUp, title: 'Pays for itself fast', body: 'One recovered job most weeks tends to cover the cost several times over.' },
]

function handleMove(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--sx', `${e.clientX - rect.left}px`)
  card.style.setProperty('--sy', `${e.clientY - rect.top}px`)
}

export default function WhyUs() {
  return (
    <section className="whyus-section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">WHY SHELBY'S ARTEVES</div>
          <h2>Enterprise-grade coverage, sized for a small crew</h2>
          <p>The same idea big call centers pay six figures for, built specifically for a business that runs on one phone line and a calendar.</p>
        </Reveal>

        <div className="whyus-grid">
          {benefits.map((b, i) => (
            <Reveal
              as="div"
              className="whyus-card"
              key={b.title}
              delay={(i % 3) * 90}
              style={{}}
            >
              <div className="whyus-card-inner" onMouseMove={handleMove}>
                <b.icon size={22} />
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
