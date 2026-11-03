import React from 'react'
import { motion, useSpring } from 'framer-motion'
import { useCustomCursor } from '../../hooks/useCustomCursor'

export const CustomCursor: React.FC = () => {
  const { position, isHovered, isClicking, isVisible, isEnabled } = useCustomCursor()

  // Hardware-accelerated smooth spring for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.6 }
  const cursorX = useSpring(position.x, springConfig)
  const cursorY = useSpring(position.y, springConfig)

  React.useEffect(() => {
    cursorX.set(position.x)
    cursorY.set(position.y)
  }, [position, cursorX, cursorY])

  if (!isEnabled || !isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none overflow-hidden">
      {/* Outer Floating Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-blue-500/80 dark:border-blue-400/80 pointer-events-none will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.04)',
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 380 }}
      />

      {/* Inner Pinpoint Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 pointer-events-none will-change-transform transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.6 : isHovered ? 1.4 : 1
          })`,
        }}
      />
    </div>
  )
}

