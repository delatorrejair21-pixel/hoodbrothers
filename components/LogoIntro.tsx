'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Timeline (ms)
const LOGO_SETTLE   = 2000   // logo finishes revealing + brief pause
const PROGRESS_DURATION = 1400  // thin line fills up before exit
const EXIT_DURATION = 800    // overlay fades + logo morphs out

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
  const [phase,      setPhase]      = useState<'revealing' | 'progress' | 'exiting' | 'done'>('revealing')
  const [exitTarget, setExitTarget] = useState<ExitTarget>({ x: 0, y: 0, scale: 1 })

  // Body always locked — page never moves during intro
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const doExit = useCallback(() => {
    setPhase('exiting')

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
  }, [onComplete])

  // Auto-sequence: logo settles → progress bar fills → exit
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('progress'), LOGO_SETTLE)
    const t2 = setTimeout(() => doExit(), LOGO_SETTLE + PROGRESS_DURATION)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [doExit])

  if (phase === 'done') return null

  const isExiting = phase === 'exiting'

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Matte background */}
      <motion.div
        className="absolute inset-0 bg-[#0D0D0D]"
        animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Logo */}
      <motion.div
        ref={logoRef}
        style={{ willChange: 'transform' }}
        animate={isExiting
          ? { x: exitTarget.x, y: exitTarget.y, scale: exitTarget.scale }
          : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Diagonal blade wipe */}
        <motion.div
          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 6% 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 106% 100%, 0% 100%)' }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Progress bar — thin white line that fills then triggers exit */}
      <div className="absolute bottom-10 w-40 flex flex-col items-center gap-3">
        {/* Track */}
        <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/60 rounded-full"
            initial={{ width: '0%' }}
            animate={phase === 'progress' || isExiting ? { width: '100%' } : { width: '0%' }}
            transition={{
              duration: PROGRESS_DURATION / 1000,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </div>
  )
}
