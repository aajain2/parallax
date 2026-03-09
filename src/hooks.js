import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * target);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}

export function useAnimateOnMount(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export function useStaggeredMount(count, baseDelay = 0, stagger = 80) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    const timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), baseDelay + i * stagger)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count, baseDelay, stagger]);
  return visibleCount;
}
