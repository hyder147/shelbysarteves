import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchServices } from '../api';
import SectionHeader from './SectionHeader';

const FALLBACK_SERVICES = [
  { code: 'CALL', name: 'After-hours call coverage', description: "An AI agent answers every call you'd otherwise miss, books the job on your calendar, and texts the customer a confirmation. Nights and weekends included." },
  { code: 'WARR', name: 'Warranty and service recapture', description: 'We track install and service dates from your own job history and reach out to customers right before a warranty or replacement window opens.' },
  { code: 'REV', name: 'Reputation firefighting', description: 'A short post-job text catches unhappy customers before they post publicly, and routes only happy ones toward a review request.' },
  { code: 'LEAD', name: 'Instant lead response', description: 'Web and social form leads get a qualifying reply within seconds, not hours. Well before a competitor gets there first.' },
  { code: 'GHOST', name: 'Dead quote recovery', description: 'Old estimates that never closed get a timed, relevant follow-up months later. Revenue you already paid to generate once.' },
  { code: 'CLAIM', name: 'Insurance claim documentation', description: 'Job photos and technician notes are turned into insurance-ready claim paperwork the same day, for faster payout on restoration and roofing jobs.' },
  { code: 'LIC', name: 'License and compliance tracking', description: 'Renewals, insurance certs, and inspections are tracked across every location and technician, with a nag well before anything lapses.' },
  { code: 'LANG', name: 'Multilingual front desk', description: 'Calls and messages are handled fluently in the languages your customer base actually speaks, not just English.' },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [source, setSource] = useState('fallback');

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setServices(data);
          setSource('api');
        }
      })
      .catch(() => setSource('fallback'));
  }, []);

  const leftServices = services.filter((_, i) => i % 2 === 0);
  const rightServices = services.filter((_, i) => i % 2 !== 0);

  const leftMargins = ['mb-[42px]', 'mb-[50px]', 'mb-[38px]', 'mb-0'];
  const rightMargins = ['mb-[48px]', 'mb-[36px]', 'mb-[44px]', 'mb-0'];

  return (
    <section id="services" className="bg-paper-dim py-[96px] pb-[110px] relative overflow-hidden">
      <div className="wrap">
        <SectionHeader
          kicker="THE PLATFORM"
          title="Eight quiet leaks in every local business"
          description="None of these need a new hire. Each one runs as a standing agent connected to your phone line, calendar, or job history."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-9 relative py-3 md:pb-8">
          {/* Left Column */}
          <div className="flex flex-col md:pr-2">
            {leftServices.map((s, idx) => {
              const isRed = idx % 2 === 0;
              const marginClass = leftMargins[idx] || 'mb-6 md:mb-10';
              return (
                <motion.div
                  key={s.code}
                  className={`w-full will-change-transform ${marginClass} md:mb-[initial] max-md:mb-6`}
                  initial={{ opacity: 0, x: -45, y: 25 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative w-full min-h-[195px] drop-shadow-[0_14px_32px_rgba(18,20,28,0.08)] transition-all duration-250 flex items-center hover:-translate-y-1.5 hover:drop-shadow-[0_22px_42px_rgba(224,6,0,0.16)] group">
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 520 200" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M 0 0 L 475 0 L 520 100 L 475 200 L 0 200 Z" className="vector-effect-non-scaling-stroke" style={{ fill: isRed ? '#E00600' : '#ECE9DF', stroke: '#E00600', strokeWidth: isRed ? '2px' : '2.2px' }} />
                    </svg>
                    <div className="relative z-10 w-full py-[24px] px-[32px] md:py-[30px] md:pr-[64px] md:pl-[32px]">
                      <div className={`font-mono text-[11px] font-bold tracking-[0.08em] px-2.5 py-1 rounded-md w-fit mb-3 ${isRed ? 'bg-white/20 text-white border border-white/35' : 'bg-primary/10 text-primary border border-primary/25'}`}>
                        {s.code}
                      </div>
                      <h3 className={`font-display font-bold text-[20px] leading-[1.25] tracking-[-0.015em] mb-2.5 m-0 ${isRed ? 'text-white' : 'text-ink'}`}>
                        {s.name}
                      </h3>
                      <p className={`text-[14.5px] leading-[1.62] m-0 max-w-[48ch] ${isRed ? 'text-white/90' : 'text-muted'}`}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:pt-[54px] md:pl-2">
            {rightServices.map((s, idx) => {
              const isRed = idx % 2 === 1;
              const marginClass = rightMargins[idx] || 'mb-6 md:mb-10';
              return (
                <motion.div
                  key={s.code}
                  className={`w-full will-change-transform ${marginClass} md:mb-[initial] max-md:mb-6`}
                  initial={{ opacity: 0, x: 45, y: 25 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.12 + 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative w-full min-h-[195px] drop-shadow-[0_14px_32px_rgba(18,20,28,0.08)] transition-all duration-250 flex items-center hover:-translate-y-1.5 hover:drop-shadow-[0_22px_42px_rgba(224,6,0,0.16)] group">
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 520 200" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M 45 0 L 520 0 L 520 200 L 45 200 L 0 100 Z" className="vector-effect-non-scaling-stroke" style={{ fill: isRed ? '#E00600' : '#ECE9DF', stroke: '#E00600', strokeWidth: isRed ? '2px' : '2.2px' }} />
                    </svg>
                    <div className="relative z-10 w-full py-[24px] px-[32px] md:py-[30px] md:pl-[64px] md:pr-[32px]">
                      <div className={`font-mono text-[11px] font-bold tracking-[0.08em] px-2.5 py-1 rounded-md w-fit mb-3 ${isRed ? 'bg-white/20 text-white border border-white/35' : 'bg-primary/10 text-primary border border-primary/25'}`}>
                        {s.code}
                      </div>
                      <h3 className={`font-display font-bold text-[20px] leading-[1.25] tracking-[-0.015em] mb-2.5 m-0 ${isRed ? 'text-white' : 'text-ink'}`}>
                        {s.name}
                      </h3>
                      <p className={`text-[14.5px] leading-[1.62] m-0 max-w-[48ch] ${isRed ? 'text-white/90' : 'text-muted'}`}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="font-mono text-[12px] text-muted text-center mt-10">
          {source === 'api' ? "Loaded live from the Shelby's Arteves API" : 'Showing built-in service list (backend not running)'}
        </div>
      </div>
    </section>
  );
}
