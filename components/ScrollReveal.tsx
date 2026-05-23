"use client";

import { useEffect, useRef, ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  variant?: Variant;
  threshold?: number;
}

const variantClass: Record<Variant, string> = {
  up:    "reveal",
  left:  "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade:  "reveal-fade",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const base = variantClass[variant];
  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div ref={ref} className={`${base} ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
