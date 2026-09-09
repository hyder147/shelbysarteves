import { useReveal } from '../hooks/useReveal'

/**
 * Wraps children in a div that fades/slides up once when scrolled into
 * view. `delay` (ms) staggers groups of items. `as` picks the wrapper tag.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
    >
      {children}
    </Tag>
  )
}
