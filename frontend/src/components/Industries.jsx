import SectionHeader from './SectionHeader';

const industries = [
  'HVAC', 'Plumbing and electrical', 'Roofing and restoration', 'Auto repair',
  'Pest control', 'Salons and spas', 'Dental and medical practices',
  'Cleaning services', 'Landscaping',
];

export default function Industries() {
  return (
    <section id="industries" className="bg-ink text-paper overflow-hidden">
      <div className="wrap">
        <SectionHeader
          kicker="BUILT FOR"
          title={<span className="text-paper">Local, service based, and busy</span>}
          description={<span className="text-[#B9BCC8]">If your business runs on phone calls and repeat customers, coverage pays for itself in the first recovered job.</span>}
        />
      </div>

      <div 
        className="mt-2 overflow-hidden" 
        style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
        aria-hidden="false"
      >
        <div className="flex gap-2.5 w-max animate-marquee-scroll hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-auto">
          {[...industries, ...industries].map((name, i) => (
            <span className="font-mono text-[13px] border border-paper/25 px-4 py-2 rounded-full text-[#DCDAD1] whitespace-nowrap shrink-0" key={`${name}-${i}`}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
