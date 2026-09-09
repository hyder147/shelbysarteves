import { useEffect, useState } from 'react'
import { submitFeedback, fetchFeedbackSummary } from '../api'
import './Rating.css'

const STARS = [1, 2, 3, 4, 5]

export default function Rating() {
  const [value, setValue] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetchFeedbackSummary()
      .then(setSummary)
      .catch(() => setSummary(null))
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    if (!value) {
      setStatus({ state: 'err', message: 'Pick a star rating first.' })
      return
    }
    setStatus({ state: 'loading', message: '' })
    try {
      await submitFeedback({ rating: value, comment })
      setStatus({ state: 'ok', message: 'Thanks for the feedback!' })
      setComment('')
      fetchFeedbackSummary().then(setSummary).catch(() => {})
    } catch (err) {
      setStatus({ state: 'err', message: err.message || 'Could not submit your rating.' })
    }
  }

  return (
    <section className="rating-section" id="rate-us">
      <div className="wrap rating-wrap">
        <div className="kicker">RATE YOUR EXPERIENCE</div>
        <h2>How does this site feel so far?</h2>
        <p className="rating-sub">
          Quick, anonymous, and it helps us make this page better before it goes live.
        </p>

        <form onSubmit={onSubmit} className="rating-form">
          <div className="stars" role="radiogroup" aria-label="Rating out of 5 stars">
            {STARS.map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={value === n}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                className={`star ${(hovered || value) >= n ? 'filled' : ''}`}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setValue(n)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="rating-comment"
            placeholder="Anything you'd add? (optional)"
            rows="2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="btn btn-outline" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending' : 'Submit rating'}
          </button>

          {status.state === 'ok' && <div className="form-status ok">{status.message}</div>}
          {status.state === 'err' && <div className="form-status err">{status.message}</div>}
        </form>

        {summary && summary.count > 0 && (
          <div className="rating-summary">
            Average so far: <strong>{summary.average} / 5</strong> from {summary.count}{' '}
            {summary.count === 1 ? 'rating' : 'ratings'}.
          </div>
        )}
      </div>
    </section>
  )
}
