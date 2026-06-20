'use client';

/*
  Reusable stagger/reveal animation wrapper.
  Uses IntersectionObserver to trigger CSS animations on scroll.
  Falls back to immediate visibility when reduced motion is preferred.
*/
import React, { useRef, useEffect, useState } from 'react';

export function Reveal({ children, className = '', as: Tag = 'div', delay = 0, stagger = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${visible ? (stagger ? 'stagger-children' : 'animate-fade-in-up') : 'opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* Convenience: stagger a list – each child gets a staggered delay */
export function Stagger({ children, className = '', ...props }) {
  return (
    <Reveal stagger className={className} {...props}>
      {children}
    </Reveal>
  );
}
