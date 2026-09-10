import Reveal from './Reveal';

export default function SectionHeader({ kicker, title, description, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  const maxWidth = align === 'center' ? 'max-w-[680px]' : 'max-w-[620px]';

  return (
    <Reveal className={`flex flex-col ${alignClass} ${maxWidth} mb-11 px-4 sm:px-0 ${className}`}>
      {kicker && (
        <div className="font-mono text-[12.5px] font-bold tracking-[0.1em] uppercase text-primary mb-3.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
          {kicker}
        </div>
      )}
      <h2 className="font-display font-bold text-[clamp(28px,3.4vw,42px)] leading-[1.15] tracking-[-0.02em] text-ink m-0 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[16.5px] leading-[1.6] text-muted max-w-[54ch] m-0">
          {description}
        </p>
      )}
    </Reveal>
  );
}
