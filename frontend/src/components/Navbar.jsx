import { useEffect, useState } from 'react';
import { FiInstagram } from 'react-icons/fi';

const LEFT_LINKS = [
  { href: '#services', label: 'Platform' },
  { href: '#industries', label: 'Solutions' },
];

const RIGHT_LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#contact', label: 'Contact' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ALL_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 960) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="sticky top-0 z-[80] w-full">
      {/* Top red announcement strip */}
      <div className="bg-primary text-white py-1.5 text-[12.5px] font-semibold tracking-[0.02em]">
        <div className="wrap flex items-center justify-center gap-4 text-center">
          <span className="font-body">
            Ready for 24/7 AI Coverage? Never miss a high-value customer call again!
          </span>
          <a href="#contact" className="bg-[#111827] hover:bg-black text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded tracking-[0.05em] no-underline transition-all duration-150 hover:scale-105">
            BOOK NOW
          </a>
        </div>
      </div>

      {/* Main split navbar */}
      <header className={`relative backdrop-blur-md border-b transition-all duration-250 overflow-visible ${scrolled ? 'bg-[rgba(10,12,18,0.98)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-transparent' : 'bg-[rgba(14,16,22,0.92)] border-white/10'}`}>
        
        {/* Corner Accents (Hidden on Mobile) */}
        <div className="hidden lg:block absolute top-0 left-0 h-full w-[90px] pointer-events-none z-[1] [background:linear-gradient(135deg,#E00600_0%,#B30500_50%,transparent_100%)] [clip-path:polygon(0_0,100%_0,25%_100%,0_100%)]" aria-hidden="true" />
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[90px] pointer-events-none z-[1] [background:linear-gradient(-135deg,#E00600_0%,#B30500_50%,transparent_100%)] [clip-path:polygon(0_0,100%_0,100%_100%,75%_100%)]" aria-hidden="true" />

        <div className="wrap flex items-center justify-between h-[72px] relative z-[2] lg:px-7 px-4">
          
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-end pr-12">
            {LEFT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-white font-body text-[14.5px] font-semibold tracking-[0.01em] no-underline py-1.5 transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 ${active === l.href ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2 hover:after:w-full hover:after:left-0'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Centered Crest Badge */}
          <div className="relative z-10 flex justify-center shrink-0">
            <a href="#top" className="block no-underline bg-white px-5 pt-2.5 pb-3.5 [clip-path:polygon(0%_0%,100%_0%,100%_82%,50%_100%,0%_82%)] shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-all duration-200 mt-1 hover:translate-y-[3px] hover:shadow-[0_10px_28px_rgba(224,6,0,0.35)] lg:mt-1 lg:px-5 lg:pb-3.5 max-lg:mt-0 max-lg:px-4 max-lg:pb-3" onClick={() => setOpen(false)} aria-label="Shelby's Arteves Home">
              <div className="flex flex-col items-center justify-center text-center">
                <img src="/logo.png" width="36" height="36" alt="Shelby's Arteves Logo" className="rounded-full block object-cover mb-[3px] max-lg:w-[30px] max-lg:h-[30px]" />
                <span className="font-display font-extrabold text-[13.5px] leading-[1.1] text-[#111827] tracking-[0.05em] max-lg:text-[12px]">SHELBY'S</span>
                <span className="font-display font-bold text-[10px] text-primary tracking-[0.12em] max-lg:text-[9px]">ARTEVES</span>
              </div>
            </a>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-start pl-12">
            {RIGHT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-white font-body text-[14.5px] font-semibold tracking-[0.01em] no-underline py-1.5 transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 ${active === l.href ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2 hover:after:w-full hover:after:left-0'}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://instagram.com/shelbysarteves"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center justify-center transition-all duration-150 ml-1 hover:text-primary hover:scale-110"
              aria-label="Instagram @shelbysarteves"
              title="@shelbysarteves"
            >
              <FiInstagram size={18} />
            </a>
            <a href="#contact" className="bg-primary hover:bg-[#C40500] text-white font-body text-[13.5px] font-bold tracking-[0.02em] px-[22px] py-[10px] rounded-full no-underline whitespace-nowrap transition-all duration-150 hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(224,6,0,0.4)] hover:shadow-[0_6px_18px_rgba(224,6,0,0.55)]">
              Book a demo
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="flex lg:hidden flex-col justify-center items-center gap-[5px] w-[38px] h-[38px] bg-transparent border-none cursor-pointer p-0 z-[85]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block w-[22px] h-[2.5px] bg-white rounded-sm transition-all duration-250 ${open ? 'translate-y-[7.5px] rotate-45' : ''}`} />
            <span className={`block w-[22px] h-[2.5px] bg-white rounded-sm transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2.5px] bg-white rounded-sm transition-all duration-250 ${open ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile slide-out drawer */}
        <div className={`block lg:hidden fixed inset-0 z-[80] transition-visibility ${open ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/70 transition-opacity duration-250 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
          <div className={`absolute top-0 right-0 bottom-0 w-[min(82vw,320px)] bg-[#11141D] border-l border-white/10 shadow-[-6px_0_28px_rgba(0,0,0,0.5)] p-6 px-5 flex flex-col gap-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center gap-2.5 text-white font-display font-bold text-base pb-4 mb-3 border-b border-white/10">
              <img src="/logo.png" width="30" height="30" alt="Shelby's Arteves" className="rounded-full" />
              <span>Shelby's Arteves</span>
            </div>
            {ALL_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white no-underline text-[15.5px] font-semibold px-3.5 py-3 rounded-lg flex items-center gap-2.5 transition-colors duration-150 hover:bg-primary/15 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://instagram.com/shelbysarteves"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline text-[15.5px] font-semibold px-3.5 py-3 rounded-lg flex items-center gap-2.5 transition-colors duration-150 hover:bg-primary/15 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              <FiInstagram size={18} />
              <span>@shelbysarteves</span>
            </a>
            <a
              href="#contact"
              className="bg-primary text-white font-body text-[13.5px] font-bold tracking-[0.02em] px-[20px] py-[13px] rounded-full no-underline text-center mt-5 block shadow-[0_4px_14px_rgba(224,6,0,0.4)]"
              onClick={() => setOpen(false)}
            >
              Book a demo
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
