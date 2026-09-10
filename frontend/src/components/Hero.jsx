import { useEffect, useState, useRef } from 'react';

const SLIDES = [
  { image: '/imagesForNavbar/image1.png', alt: 'AI Operations for Local Service Businesses' },
  { image: '/imagesForNavbar/image2.png', alt: '24/7 AI Call Coverage' },
  { image: '/imagesForNavbar/image3.png', alt: 'Instant Lead Recovery & Dispatch' },
  { image: '/imagesForNavbar/image4.png', alt: 'Automated Customer Follow-Up' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    function startTimer() {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5500);
    }
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  function goToSlide(index) {
    setCurrentSlide(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5500);
    }
  }

  return (
    <section className="relative min-h-[70vh] sm:min-h-[82vh] flex items-center justify-center pt-[80px] pb-[60px] sm:pt-[110px] sm:pb-[80px] overflow-hidden bg-[#0D1017] !p-0" id="top">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} [transition-property:opacity,transform] [transition-duration:900ms,8s] [transition-timing-function:cubic-bezier(0.4,0,0.2,1),linear]`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={i !== currentSlide}
          />
        ))}
        {/* Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'linear-gradient(180deg, rgba(10, 12, 18, 0.75) 0%, rgba(10, 12, 18, 0.45) 45%, rgba(10, 12, 18, 0.88) 100%), radial-gradient(ellipse at center, transparent 25%, rgba(5, 7, 12, 0.65) 100%)' }}
          aria-hidden="true" 
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto px-5 mt-16 sm:mt-8">
        
        {/* Ribbon Badge */}
        <div className="relative bg-primary text-white font-display font-extrabold text-[13px] tracking-[0.08em] px-6 py-2 rounded shadow-[0_4px_18px_rgba(224,6,0,0.55)] inline-flex items-center justify-center mb-5 [clip-path:polygon(5%_0%,95%_0%,100%_50%,95%_100%,5%_100%,0%_50%)]">
          <span className="relative z-10">AI OPERATIONS FOR LOCAL SERVICE BUSINESSES</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-[clamp(38px,5.2vw,64px)] leading-[1.08] text-white tracking-[-0.025em] m-0 mb-5 max-w-[22ch] [text-shadow:0_3px_20px_rgba(0,0,0,0.75)]">
          Every Missed Call is a Job You Didn't Do.
        </h1>

        {/* Subtitle */}
        <p className="font-body text-[clamp(16px,1.8vw,19px)] leading-[1.6] text-[#F3F4F6] max-w-[58ch] m-0 mb-9 [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          Shelby's Arteves builds AI coverage agents that answer your phone, follow up with
          customers, and clear the admin work that a small business never has time for.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center justify-center flex-wrap mb-12 w-full sm:w-auto">
          <a href="#contact" className="bg-primary hover:bg-[#B30500] text-white font-body font-bold text-[14.5px] tracking-[0.03em] px-[34px] py-[15px] rounded-full no-underline shadow-[0_6px_22px_rgba(224,6,0,0.55)] hover:shadow-[0_10px_28px_rgba(224,6,0,0.7)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap w-full sm:w-auto text-center">
            GET YOUR MISSED CALL REPORT
          </a>
          <a href="#services" className="bg-white/10 hover:bg-white/25 text-white font-body font-bold text-[14.5px] tracking-[0.03em] px-[30px] py-[14px] rounded-full border-[1.5px] border-white/75 hover:border-white backdrop-blur-sm no-underline transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap w-full sm:w-auto text-center">
            SEE THE PLATFORM
          </a>
        </div>

        {/* Pagination Pill */}
        <div className="inline-flex items-center gap-2 bg-[#121620]/80 backdrop-blur-md border border-white/20 px-[18px] py-[7px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.45)]" role="tablist" aria-label="Hero carousel pagination">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`Go to slide ${i + 1}`}
              className={`block h-[7px] rounded-full border-none p-0 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === currentSlide ? 'w-[28px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-[7px] bg-white/45 hover:bg-white/85'}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
