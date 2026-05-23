"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before cleaning",
  afterAlt = "After cleaning",
  initialPosition = 45,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const getPositionFromEvent = useCallback((clientX: number): number => {
    const container = containerRef.current;
    if (!container) return 50;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.min(Math.max(pct, 2), 98);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setPosition(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent]
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => setPosition(getPositionFromEvent(e.clientX));
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setPosition(getPositionFromEvent(e.touches[0].clientX));
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, getPositionFromEvent]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/60 border border-[#2E2E2E]"
      onMouseDown={handleContainerMouseDown}
      onTouchStart={(e) => {
        if (e.touches[0]) {
          setIsDragging(true);
          setPosition(getPositionFromEvent(e.touches[0].clientX));
        }
      }}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(2, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(98, p + 2));
      }}
    >
      {/* After image — full background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
        aria-hidden="true"
      />

      {/* Before image — clipped left */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${beforeImage})`,
            width: `${(100 / position) * 100}%`,
            maxWidth: `${10000 / position}%`,
          }}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none z-20"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.25)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-transform duration-100 ${
            isDragging ? "scale-110" : "scale-100"
          }`}
          style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.6)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Before label */}
      <div className="absolute bottom-4 left-4 z-20 bg-[#0D0D0D]/80 backdrop-blur-sm border border-white/15 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none">
        Before
      </div>

      {/* After label */}
      <div className="absolute bottom-4 right-4 z-20 bg-white backdrop-blur-sm text-[#0D0D0D] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none">
        After
      </div>

      {/* Drag hint */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${
          isDragging ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-xs font-medium tracking-wide flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
          Drag to compare
        </div>
      </div>
    </div>
  );
}
