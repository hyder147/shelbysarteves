import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const stats = [
  { num: '27%', label: 'of inbound calls miss the front desk on average' },
  { num: '5 min', label: 'is roughly how long a lead stays warm before response' },
  { num: '24/7', label: 'coverage, without adding a headcount' },
];

function splitNumber(value) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: null, prefix: value, suffix: '' };
  return { target: parseInt(match[1], 10), prefix: '', suffix: match[2] };
}

function CountUp({ value, active }) {
  const { target, suffix } = splitNumber(value);
  const [display, setDisplay] = useState(target === null ? value : 0);

  useEffect(() => {
    if (target === null || !active) return;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  if (target === null) return value;
  return `${display}${suffix}`;
}

export default function StatStrip() {
  const [ref, visible] = useReveal(0.4);

  return (
    <div className="border-y border-line py-7" ref={ref}>
      <div className="wrap flex flex-wrap gap-0">
        {stats.map((s, i) => (
          <div
            key={s.num}
            className={`flex-1 min-w-[180px] py-1.5 px-6 ${i === 0 ? 'border-l-0 pl-0' : 'border-l border-line pl-6'}`}
          >
            <div className="font-display font-semibold text-[30px] tabular-nums">
              <CountUp value={s.num} active={visible} />
            </div>
            <div className="text-[13px] text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
