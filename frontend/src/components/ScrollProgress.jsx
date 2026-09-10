import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setPct(scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent pointer-events-none" aria-hidden="true">
      <div 
        className="h-full bg-gradient-to-r from-indigo to-teal transition-all duration-100 ease-linear" 
        style={{ width: `${pct}%` }} 
      />
    </div>
  );
}
