'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Beat timing (ms)
const HINT_DELAY = 2200   // when scroll hint appears
const EXIT_DURATION = 850 // ms for the exit transition

interface LogoIntroProps {
  onComplete: () => void
}

interface ExitTarget {
  x: number
  y: number
  scale: number
}

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  const logoRef  = useRef<HTMLDivElement>(null)
  const [phase,       setPhase]       = useState<'animating' | 'waiting' | 'exiting' | 'done'>('animating')
  const [showHint,    setShowHint]    = useState(false)
  const [exitTarget,  setExitTarget]  = useState<ExitTarget>({ x: 0, y: 0, scale: 1 })

  // Lock body scroll while animating
  useEffect(() => {
    document.body.style.overflow = phase === 'animating' ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [phase])

  // After logo reveal beats finish → unlock scroll + show hint
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

    // Lock scroll + snap back to top so page starts at the hero
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Compute where the nav logo is so we can morph toward it
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

  // First scroll → trigger exit
  useEffect(() => {
    if (phase !== 'waiting') return
    window.addEventListener('scroll', doExit, { once: true, passive: true })
    return () => window.removeEventListener('scroll', doExit)
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

      {/* Logo — single image, diagonal wipe reveal, morphs to navbar on exit */}
      <motion.div
        ref={logoRef}
        style={{ willChange: 'transform' }}
        animate={isExiting
          ? { x: exitTarget.x, y: exitTarget.y, scale: exitTarget.scale }
          : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Diagonal blade wipe: left-edge sweeps left→right */}
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

      {/* Scroll hint + skip button */}
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
