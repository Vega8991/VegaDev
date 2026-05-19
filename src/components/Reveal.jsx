import { useRef, useEffect } from 'react';

export default function Reveal({ children, stagger, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = (stagger ? 'reveal-stagger ' : 'reveal ') + className;
  return (
    <Tag ref={ref} className={cls} style={style}>
      {children}
    </Tag>
  );
}
