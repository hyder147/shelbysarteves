import Reveal from './Reveal';

export default function CtaBanner() {
  return (
    <section className="relative bg-ink text-paper overflow-hidden text-center !py-24">
      <div 
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,rgba(0,194,168,0.14),transparent_25%,rgba(139,92,246,0.14),transparent_50%,rgba(63,94,255,0.14),transparent_75%)] animate-cta-rotate motion-reduce:animate-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(63,94,255,0.28),transparent_65%)] animate-cta-drift motion-reduce:animate-none" 
        aria-hidden="true" 
      />
      <div className="wrap">
        <Reveal className="relative max-w-[560px] mx-auto">
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,40px)] tracking-[-0.015em] mb-3.5 m-0 text-paper">Stop losing jobs to voicemail</h2>
          <p className="text-[#B9BCC8] text-[16px] m-0 mb-7">See exactly how many calls your business is missing right now, no obligation.</p>
          <a href="#contact" className="btn btn-primary px-[30px] py-[15px] text-[16px] border-none shadow-[0_4px_14px_rgba(224,6,0,0.4)]">Get your missed call report</a>
        </Reveal>
      </div>
    </section>
  );
}
