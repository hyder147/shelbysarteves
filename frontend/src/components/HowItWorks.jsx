import Reveal from './Reveal'
import { useReveal } from '../hooks/useReveal'
import './HowItWorks.css'

const steps = [
  { num: '01', title: 'Connect what you already have', body: 'Your phone line, booking calendar, or job history. Whatever exists today. Nothing to migrate.' },
  { num: '02', title: 'We train your coverage agent', body: 'On your services, pricing, and how you actually talk to customers. Reviewed by you before it goes live.' },
  { num: '03', title: 'Booked jobs land in your inbox', body: 'Not "leads." Confirmed jobs on your calendar, with a paper trail for every call and message.' },
]

export default function HowItWorks() {
  const [lineRef, lineVisible] = useReveal(0.3)

  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">HOW IT WORKS</div>
          <h2>Three steps, no new software to learn</h2>
        </div>
        <div className="step-grid" ref={lineRef}>
          <div className={`step-connector ${lineVisible ? 'step-connector-draw' : ''}`} aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal as="div" className="step" key={s.num} delay={i * 140}>
              <div className="step-num">{s.num}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
