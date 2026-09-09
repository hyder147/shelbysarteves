import { useState } from 'react'
import { submitLead } from '../api'
import './Contact.css'

const initial = { name: '', business_name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', message: '' })
    try {
      await submitLead(form)
      setStatus({ state: 'ok', message: "Thanks. We'll follow up shortly." })
      setForm(initial)
    } catch (err) {
      setStatus({ state: 'err', message: err.message || 'Could not submit. Please try again.' })
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <div className="kicker">GET IN TOUCH</div>
            <h2>See what last month cost you</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '48ch', marginBottom: 26 }}>
              We'll pull a free missed call report for your business before you commit to anything.
              Prefer to reach us directly instead of the form?
            </p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 2 }}>
              <div>Email: <a href="mailto:shelbysarteves@gmail.com">shelbysarteves@gmail.com</a></div>
              <div>Instagram: <a href="https://instagram.com/shelbysarteves" target="_blank" rel="noopener noreferrer">@shelbysarteves</a></div>
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="business_name">Business name</label>
              <input id="business_name" name="business_name" value={form.business_name} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div className="form-row">
              <label htmlFor="message">What's slipping through right now</label>
              <textarea id="message" name="message" rows="4" value={form.message} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Sending' : 'Request my report'}
            </button>
            {status.state === 'ok' && <div className="form-status ok">{status.message}</div>}
            {status.state === 'err' && (
              <div className="form-status err">
                {status.message}{' '}
                <button type="button" className="link-retry" onClick={onSubmit}>
                  Try again
                </button>
                , or email us directly at{' '}
                <a href="mailto:shelbysarteves@gmail.com">shelbysarteves@gmail.com</a>.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
