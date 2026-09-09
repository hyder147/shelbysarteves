import { FiInstagram, FiMail } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="wrap">
        <div style={styles.grid}>
          <div>
            <div style={styles.brand}><img src="/logo.png" width="24" height="24" alt="Shelby's Arteves" style={styles.logo} />Shelby's Arteves</div>
            <p style={styles.tag}>AI coverage for local service businesses.</p>
            <div className="footer-social">
              <a
                href="https://instagram.com/shelbysarteves"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram size={17} />
              </a>
              <a href="mailto:shelbysarteves@gmail.com" aria-label="Email">
                <FiMail size={17} />
              </a>
            </div>
          </div>
          <div>
            <div style={styles.col}>Platform</div>
            <a href="#services" style={styles.link}>Services</a>
            <a href="#how" style={styles.link}>How it works</a>
            <a href="#industries" style={styles.link}>Industries</a>
          </div>
          <div>
            <div style={styles.col}>Company</div>
            <a href="#contact" style={styles.link}>Contact</a>
            <a href="mailto:shelbysarteves@gmail.com" style={styles.link}>shelbysarteves@gmail.com</a>
          </div>
          <div>
            <div style={styles.col}>Legal</div>
            <a href="/privacy.html" style={styles.link}>Privacy Policy</a>
          </div>
        </div>
        <div style={styles.note}>Confirm shelbysarteves@gmail.com is correct before this site goes live.</div>
        <div style={styles.note}>
          We only offer the services listed above. We don't collect, scrape, or resell data
          from Google Maps or anywhere else — the only data we store is what you submit
          through the contact form. See our <a href="/privacy.html" style={{ color: 'inherit' }}>Privacy Policy</a>.
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: { borderTop: '1px solid var(--line)', padding: '48px 0 32px' },
  grid: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 28 },
  brand: { fontFamily: 'var(--display)', fontWeight: 600, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  logo: { borderRadius: '50%', display: 'block', objectFit: 'cover', flexShrink: 0 },
  tag: { color: 'var(--muted)', fontSize: 14, margin: 0, maxWidth: 240 },
  col: { fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 10 },
  link: { display: 'block', textDecoration: 'none', color: 'var(--ink)', fontSize: 14, marginBottom: 8 },
  note: { fontFamily: 'var(--mono)', fontSize: 12, color: '#8B8676', borderTop: '1px solid var(--line)', paddingTop: 20 },
}
