import { useEffect, useState } from 'react';
import { submitFeedback, fetchFeedbackSummary } from '../api';

const STARS = [1, 2, 3, 4, 5];

export default function Rating() {
  const [value, setValue] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchFeedbackSummary()
      .then(setSummary)
      .catch(() => setSummary(null));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!value) {
      setStatus({ state: 'err', message: 'Pick a star rating first.' });
      return;
    }
    setStatus({ state: 'loading', message: '' });
    try {
      await submitFeedback({ rating: value, comment });
      setStatus({ state: 'ok', message: 'Thanks for the feedback!' });
      setComment('');
      fetchFeedbackSummary().then(setSummary).catch(() => {});
    } catch (err) {
      setStatus({ state: 'err', message: err.message || 'Could not submit your rating.' });
    }
  }

  return (
    <section className="border-y border-line bg-paper-dim !py-0" id="rate-us">
      <div className="wrap max-w-[560px] mx-auto text-center py-14">
        <div className="font-mono text-[12.5px] font-bold tracking-[0.1em] uppercase text-primary mb-3.5">RATE YOUR EXPERIENCE</div>
        <h2 className="font-display font-semibold text-[clamp(26px,3.2vw,36px)] tracking-[-0.015em] m-0 mb-2">How does this site feel so far?</h2>
        <p className="text-muted text-[15px] m-0 mt-2 mb-6">
          Quick, anonymous, and it helps us make this page better before it goes live.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col items-center gap-3.5">
          <div className="flex gap-1.5" role="radiogroup" aria-label="Rating out of 5 stars">
            {STARS.map((n) => {
              const isFilled = (hovered || value) >= n;
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={value === n}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  className={`bg-transparent border-none text-[34px] leading-none cursor-pointer px-0.5 transition-all duration-150 ${isFilled ? 'text-[#F2A93B] scale-105' : 'text-line'}`}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setValue(n)}
                >
                  ★
                </button>
              );
            })}
          </div>

          <textarea
            className="w-full max-w-[420px] font-body text-[14px] px-3 py-2.5 border border-line rounded bg-paper text-ink resize-y focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="Anything you'd add? (optional)"
            rows="2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="btn btn-outline" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending' : 'Submit rating'}
          </button>

          {status.state === 'ok' && <div className="font-mono text-[13px] mt-1 text-[#1E8E6C]">{status.message}</div>}
          {status.state === 'err' && <div className="font-mono text-[13px] mt-1 text-[#C7402F]">{status.message}</div>}
        </form>

        {summary && summary.count > 0 && (
          <div className="mt-4.5 font-mono text-[13px] text-muted">
            Average so far: <strong>{summary.average} / 5</strong> from {summary.count}{' '}
            {summary.count === 1 ? 'rating' : 'ratings'}.
          </div>
        )}
      </div>
    </section>
  );
}
