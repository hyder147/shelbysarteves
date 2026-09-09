import Reveal from './Reveal'

export default function Testimonial() {
  return (
    <section style={styles.section}>
      <div className="wrap">
        <Reveal>
          <div className="kicker">SAMPLE, REPLACE WITH A REAL CUSTOMER QUOTE</div>
          <blockquote style={styles.quote}>
            "We used to lose weekend calls to voicemail. Now every one of them turns into
            either a booked job or a clear reason why not, and I see all of it the next morning."
          </blockquote>
          <div style={styles.attribution}>Placeholder attribution, owner, placeholder HVAC company</div>
        </Reveal>
      </div>
    </section>
  )
}

const styles = {
  section: { borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' },
  quote: {
    fontFamily: 'var(--display)',
    fontWeight: 500,
    fontSize: 'clamp(22px, 3vw, 30px)',
    lineHeight: 1.3,
    margin: '0 0 18px',
    maxWidth: '30ch',
    letterSpacing: '-0.01em',
  },
  attribution: { fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' },
}
