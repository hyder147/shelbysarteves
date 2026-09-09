import Reveal from './Reveal'
import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-ring" aria-hidden="true" />
      <div className="cta-glow" aria-hidden="true" />
      <div className="wrap">
        <Reveal className="cta-inner">
          <h2>Stop losing jobs to voicemail</h2>
          <p>See exactly how many calls your business is missing right now, no obligation.</p>
          <a href="#contact" className="btn btn-primary cta-btn">Get your missed call report</a>
        </Reveal>
      </div>
    </section>
  )
}
