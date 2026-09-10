import Reveal from './Reveal';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

const steps = [
  { num: '01', title: 'Connect what you already have', body: 'Your phone line, booking calendar, or job history. Whatever exists today. Nothing to migrate.' },
  { num: '02', title: 'We train your coverage agent', body: 'On your services, pricing, and how you actually talk to customers. Reviewed by you before it goes live.' },
  { num: '03', title: 'Booked jobs land in your inbox', body: 'Not "leads." Confirmed jobs on your calendar, with a paper trail for every call and message.' },
];

export default function HowItWorks() {
  const [lineRef, lineVisible] = useReveal(0.3);

  return (
    <section id="how">
      <div className="wrap">
        <SectionHeader
          kicker="HOW IT WORKS"
          title="Three steps, no new software to learn"
        />
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7" ref={lineRef}>
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-0 left-0 right-0 h-[2px] bg-line origin-left" aria-hidden="true">
            <div 
              className="absolute inset-0 bg-primary origin-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </div>

          {steps.map((s, i) => (
            <Reveal as="div" className="pt-[18px]" key={s.num} delay={i * 140}>
              <div className="font-mono text-[13px] text-primary mb-3.5">{s.num}</div>
              <h3 className="font-display font-semibold text-[19px] m-0 mb-2.5">{s.title}</h3>
              <p className="text-muted text-[15px] m-0">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
