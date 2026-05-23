'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Beat timing (ms)
const HINT_DELAY    = 2200   // when scroll hint appears
const EXIT_DURATION = 850    // ms for the exit transition

interface LogoIntroProps {
  onComplete: () => void
}

interface ExitTarget {
  x: number
  y: number
  scale: number
}

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const [phase,      setPhase]      = useState<'animating' | 'waiting' | 'exiting' | 'done'>('animating')
  const [showHint,   setShowHint]   = useState(false)
  const [exitTarget, setExitTarget] = useState<ExitTarget>({ x: 0, y: 0, scale: 1 })

  // Keep body scroll LOCKED for the entire intro — page never moves
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // After logo reveal finishes → show hint + listen for exit intent
  useEffect(() => {
    const id = setTimeout(() => {
      setShowHint(true)
      setPhase('waiting')
    }, HINT_DELAY)
    return () => clearTimeout(id)
  }, [])

  const doExit = useCallback(() => {
    if (phase !== 'waiting') return
    setPhase('exiting')

    // Compute nav-logo position for morph
    const navLogo = document.querySelector('[data-navbar-logo]') as HTMLElement | null
    if (navLogo && logoRef.current) {
      const intro = logoRef.current.getBoundingClientRect()
      const nav   = navLogo.getBoundingClientRect()
      setExitTarget({
        x:     (nav.left + nav.width  / 2) - (intro.left + intro.width  / 2),
        y:     (nav.top  + nav.height / 2) - (intro.top  + intro.height / 2),
        scale: nav.height / intro.height,
      })
    }

    setTimeout(() => {
      document.body.style.overflow = ''
      setPhase('done')
      onComplete()
    }, EXIT_DURATION)
  }, [phase, onComplete])

  // Detect scroll/wheel/touch INTENT without letting the page actually scroll
  useEffect(() => {
    if (phase !== 'waiting') return

    // Wheel — fires before any scroll happens, can be blocked
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) { e.preventDefault(); doExit() }
    }
    // Touch swipe up
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches[0].clientY < touchStartY - 10) { e.preventDefault(); doExit() }
    }
    // Keyboard: arrow down / page down / space
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown','PageDown','Space',' '].includes(e.key)) { e.preventDefault(); doExit() }
    }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('keydown',    onKey)

    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('keydown',    onKey)
    }
  }, [phase, doExit])

  if (phase === 'done') return null

  const isExiting = phase === 'exiting'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      {/* Matte dark background — fades out on exit */}
      <motion.div
        className="absolute inset-0 bg-[#0D0D0D]"
        animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Logo — diagonal wipe reveal, morphs to navbar on exit */}
      <motion.div
        ref={logoRef}
        style={{ willChange: 'transform' }}
        animate={isExiting
          ? { x: exitTarget.x, y: exitTarget.y, scale: exitTarget.scale }
          : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Blade wipe left → right */}
        <motion.div
          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 6% 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 106% 100%, 0% 100%)' }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/logo.png"
            alt="The Hood Brothers"
            width={260}
            height={130}
            style={{ width: 260, height: 'auto' }}
            className="invert brightness-200"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Scroll hint + skip */}
      <AnimatePresence>
        {showHint && !isExiting && (
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-3 pointer-events-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-medium">
              Scroll to enter
            </span>
            <motion.div
              className="w-px bg-white/20"
              animate={{ height: [0, 28, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ minHeight: 0 }}
            />
            <button
              onClick={doExit}
              className="mt-1 text-white/20 hover:text-white/50 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
