'use client'

import { useEffect, useRef, useState } from 'react'

const PLAY_MS  = 2600  // how long the animation plays before fading
const TOTAL_MS = 3400  // total before onComplete fires (PLAY_MS + fade)

export default function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const doneRef  = useRef(false)

  useEffect(() => {
    document.body.classList.add('intro-playing')

    const t1 = setTimeout(() => setLeaving(true), PLAY_MS)
    const t2 = setTimeout(() => {
      if (doneRef.current) return
      doneRef.current = true
      document.body.classList.remove('intro-playing')
      onComplete()
    }, TOTAL_MS)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.classList.remove('intro-playing')
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0D0D]${
        leaving ? ' intro-fade-out' : ''
      }`}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Sweep line */}
      <div
        className="absolute top-1/2 left-0 h-px w-48 intro-sweep pointer-events-none"
        style={{
          animationDelay: '0.2s',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), #fff, rgba(255,255,255,0.8), transparent)',
          boxShadow: '0 0 10px rgba(255,255,255,0.4)',
        }}
      />

      {/* Content */}
      <div className="relative text-center px-6 flex flex-col items-center gap-4">
        {/* Top divider */}
        <div
          className="intro-line-grow h-px w-28"
          style={{
            animationDelay: '0.05s',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />

        {/* Eyebrow */}
        <p
          className="intro-slide-up text-white/40 text-[11px] tracking-[0.45em] uppercase font-semibold"
          style={{ animationDelay: '0.2s' }}
        >
          Commercial Kitchen Specialists
        </p>

        {/* Brand name */}
        <h1
          className="intro-text-reveal text-white font-black uppercase tracking-tight"
          style={{
            animationDelay: '0.38s',
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(2rem, 9vw, 3.8rem)',
            lineHeight: 1,
          }}
        >
          The Hood Brothers
        </h1>

        {/* Bottom divider */}
        <div
          className="intro-line-grow h-px w-28"
          style={{
            animationDelay: '0.75s',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />

        {/* Progress bar */}
        <div className="mt-2 w-32 h-px bg-white/10 rounded-full overflow-hidden">
          <div
            className="intro-progress-fill h-full bg-white/55 rounded-full"
            style={{ animationDuration: `${PLAY_MS}ms` }}
          />
        </div>
      </div>
    </div>
  )
}
