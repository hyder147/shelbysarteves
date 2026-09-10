import { FiShield, FiZap, FiGlobe, FiTrendingUp, FiFileText, FiHeart } from 'react-icons/fi';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const benefits = [
  { icon: FiZap, title: 'Live in days, not months', body: 'No new software to learn and nothing to migrate. Coverage starts on your existing phone line.' },
  { icon: FiHeart, title: 'Sounds like your business', body: "Trained on your services, pricing, and tone before it ever talks to a customer, and reviewed by you first." },
  { icon: FiGlobe, title: 'Fluent in more than English', body: 'Serve the languages your customer base actually speaks, without hiring for it.' },
  { icon: FiFileText, title: 'Every call, on paper', body: 'A transcript and outcome for every conversation, so nothing depends on memory.' },
  { icon: FiShield, title: 'Built for trades, not call centers', body: "No contact-center jargon or seat licenses. Priced and built for a business your size." },
  { icon: FiTrendingUp, title: 'Pays for itself fast', body: 'One recovered job most weeks tends to cover the cost several times over.' },
];

function handleMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--sx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--sy', `${e.clientY - rect.top}px`);
}

export default function WhyUs() {
  return (
    <section>
      <div className="wrap">
        <SectionHeader
          kicker="WHY SHELBY'S ARTEVES"
          title="Enterprise-grade coverage, sized for a small crew"
          description="The same idea big call centers pay six figures for, built specifically for a business that runs on one phone line and a calendar."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {benefits.map((b, i) => (
            <Reveal as="div" key={b.title} delay={(i % 3) * 90}>
              <div 
                className="relative p-[26px_24px] border border-line rounded-[10px] bg-paper overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(18,20,28,0.08)] hover:border-primary group"
                onMouseMove={handleMove}
              >
                {/* Glow effect */}
                <div 
                  className="absolute w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 transition-opacity duration-250 group-hover:opacity-100"
                  style={{
                    left: 'var(--sx, 50%)',
                    top: 'var(--sy, 50%)',
                    background: 'radial-gradient(circle, rgba(224, 6, 0, 0.16), transparent 70%)'
                  }}
                />
                
                <div className="relative z-10">
                  <b.icon size={22} className="text-primary mb-4" />
                  <h3 className="font-display font-semibold text-[16.5px] m-0 mb-2">{b.title}</h3>
                  <p className="text-muted text-[14px] m-0">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
