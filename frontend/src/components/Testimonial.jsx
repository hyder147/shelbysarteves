import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Testimonial() {
  return (
    <section className="relative z-10 border-b border-line py-24">
      <div className="wrap relative">
        <div className="w-[80%] md:w-1/2">
          <SectionHeader
            kicker="SAMPLE, REPLACE WITH A REAL CUSTOMER QUOTE"
            title={<span className="font-medium text-[clamp(22px,3vw,30px)] leading-[1.3] m-0 max-w-[30ch] tracking-[-0.01em]">&quot;We used to lose weekend calls to voicemail. Now every one of them turns into either a booked job or a clear reason why not, and I see all of it the next morning.&quot;</span>}
          />
          <Reveal>
            <div className="font-mono text-[13px] text-muted -mt-7">
              Placeholder attribution, owner, placeholder HVAC company
            </div>
          </Reveal>
        </div>

        <div className="absolute top-[5px] right-0 w-[42%] h-[calc(100%+260px)] z-10 hidden md:block">
          <img
            src="/imagesForNavbar/human.png"
            alt="Customer success dashboard"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
