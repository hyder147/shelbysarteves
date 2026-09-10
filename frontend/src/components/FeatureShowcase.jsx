import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './SectionHeader';

const points = [
  {
    num: '01',
    tag: 'NATURAL VOICE AI',
    title: 'Sounds like a person, not a menu',
    body: 'Callers talk in plain language and get a plain-language answer back. No "press 1 for billing."',
    highlight: 'Zero phone trees · Natural conversation · Instant answers',
  },
  {
    num: '02',
    tag: 'ROUND-THE-CLOCK',
    title: 'Answers day or night',
    body: 'Nights, weekends, lunch breaks, job sites with no signal. Coverage never clocks out.',
    highlight: '24/7/365 active · Never miss an emergency · No overtime cost',
  },
  {
    num: '03',
    tag: 'CUSTOMER MEMORY',
    title: 'Knows your regulars',
    body: 'Return customers are recognized against your own job history, not treated like a cold lead.',
    highlight: 'CRM sync · Past service history · Warm personalized greeting',
  },
  {
    num: '04',
    tag: 'INTELLIGENT HANDOFF',
    title: 'Hands off cleanly when needed',
    body: 'Anything urgent or unusual gets routed to you directly, with the full context attached.',
    highlight: 'Live call transfer · Instant SMS summary · Complete transcript',
  },
];

const CARD_THEMES = ['red', 'dark', 'light', 'dark'];

const StickyCard_001 = ({ i, point, theme = 'red', progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Tailwind Theme Maps
  const bgColors = {
    red: 'bg-primary shadow-[0_30px_80px_rgba(224,6,0,0.35),0_8px_24px_rgba(0,0,0,0.16)] border-white/20',
    dark: 'bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.65),0_8px_28px_rgba(224,6,0,0.18)] border-primary/40',
    light: 'bg-paper-dim shadow-[0_28px_70px_rgba(18,20,28,0.08),0_6px_16px_rgba(18,20,28,0.04)] border-ink/10',
  };
  
  const textColors = {
    red: { num: 'text-white drop-shadow-md', tag: 'text-white/90', title: 'text-white drop-shadow-sm', body: 'text-white/95', highlight: 'text-white bg-black/30 border-white/35 backdrop-blur-md' },
    dark: { num: 'text-primary drop-shadow-[0_0_24px_rgba(224,6,0,0.45)]', tag: 'text-paper-dim/85', title: 'text-white drop-shadow-lg', body: 'text-paper-dim/90', highlight: 'text-white bg-primary/15 border-primary/40 backdrop-blur-md' },
    light: { num: 'text-ink', tag: 'text-muted', title: 'text-ink', body: 'text-muted', highlight: 'text-ink bg-white border-ink/10' },
  };

  const borders = {
    red: 'border-b sm:border-b-0 sm:border-r border-white/25',
    dark: 'border-b sm:border-b-0 sm:border-r border-primary/30',
    light: 'border-b sm:border-b-0 sm:border-r border-ink/10',
  };

  const currentTheme = bgColors[theme] || bgColors.red;
  const currentText = textColors[theme] || textColors.red;
  const currentBorder = borders[theme] || borders.red;

  return (
    <div ref={container} className="sticky top-0 w-full flex items-center justify-center mb-12 pointer-events-none">
      <motion.div
        style={{ scale, top: `calc(112px + ${i * 28}px)` }}
        className={`relative w-[min(1140px,94vw)] h-auto sm:h-[400px] min-h-[240px] rounded-[26px] flex items-center px-6 py-7 sm:px-16 sm:py-14 overflow-hidden pointer-events-auto border origin-top transition-colors duration-300 ${currentTheme}`}
      >
        {theme === 'red' && <div className="absolute inset-0 bg-[url('/card-bg-pattern.png')] bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none" />}
        {theme === 'dark' && <div className="absolute inset-0 bg-[url('/card-bg-pattern-dark.png')] bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none" />}

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-4 sm:gap-14 items-center w-full">
          {/* Left Column */}
          <div className={`flex flex-row sm:flex-col justify-start sm:justify-center items-baseline sm:items-stretch gap-4 sm:gap-3 pb-3.5 sm:pb-0 pr-0 sm:pr-11 ${currentBorder}`}>
            <span className={`font-display text-[32px] sm:text-[58px] font-extrabold leading-none tracking-[-0.03em] ${currentText.num}`}>
              {point.num}
            </span>
            <span className={`font-mono text-[12px] font-bold tracking-[0.08em] uppercase ${currentText.tag}`}>
              {point.tag}
            </span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <h3 className={`font-display text-[20px] sm:text-[30px] font-extrabold tracking-[-0.02em] m-0 ${currentText.title}`}>
              {point.title}
            </h3>
            <p className={`text-[14.5px] sm:text-[18px] leading-[1.7] m-0 max-w-[62ch] ${currentText.body}`}>
              {point.body}
            </p>
            <div className={`inline-flex items-center font-mono text-[13.5px] font-semibold px-5 py-2 rounded-full w-fit mt-2 tracking-[0.02em] border ${currentText.highlight}`}>
              <span>{point.highlight}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function FeatureShowcase() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="relative bg-paper-dim border-y border-line" id="features">
      <main ref={container} className="relative flex w-full flex-col items-center justify-center pt-[90px] pb-[30vh]">
        <SectionHeader
          kicker="CALL COVERAGE"
          title="A phone call that actually gets handled"
          description="Most missed-call systems just take a voicemail. This one carries the conversation through to a booked job, the same way your best front-desk hire would."
          align="center"
        />
        
        {/* Scroll Indicator */}
        <div className="flex flex-col items-center mb-11">
          <span className="block w-[1.5px] h-14 bg-gradient-to-b from-muted to-transparent rounded-sm opacity-60" />
        </div>

        {points.map((point, i) => {
          const targetScale = Math.max(0.75, 1 - (points.length - i - 1) * 0.06);
          return (
            <StickyCard_001
              key={`point_${i}`}
              i={i}
              point={point}
              theme={CARD_THEMES[i % CARD_THEMES.length]}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </section>
  );
}
