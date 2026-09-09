import { FiMic, FiClock, FiUserCheck, FiPhoneOutgoing } from 'react-icons/fi'
import Reveal from './Reveal'
import CallCard from './CallCard'
import './FeatureShowcase.css'

const points = [
  {
    icon: FiMic,
    title: 'Sounds like a person, not a menu',
    body: "Callers talk in plain language and get a plain-language answer back. No \"press 1 for billing.\"",
  },
  {
    icon: FiClock,
    title: 'Answers day or night',
    body: 'Nights, weekends, lunch breaks, job sites with no signal. Coverage never clocks out.',
  },
  {
    icon: FiUserCheck,
    title: 'Knows your regulars',
    body: 'Return customers are recognized against your own job history, not treated like a cold lead.',
  },
  {
    icon: FiPhoneOutgoing,
    title: 'Hands off cleanly when needed',
    body: "Anything urgent or unusual gets routed to you directly, with the full context attached.",
  },
]

export default function FeatureShowcase() {
  return (
    <section className="feature-showcase">
      <div className="wrap feature-grid">
        <Reveal className="feature-visual">
          <CallCard />
        </Reveal>

        <Reveal className="feature-copy" delay={100}>
          <div className="kicker">CALL COVERAGE</div>
          <h2>A phone call that actually gets handled</h2>
          <p className="feature-lede">
            Most missed-call systems just take a voicemail. This one carries the conversation
            through to a booked job, the same way your best front-desk hire would.
          </p>
          <div className="feature-points">
            {points.map((p) => (
              <div className="feature-point" key={p.title}>
                <p.icon size={18} />
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
