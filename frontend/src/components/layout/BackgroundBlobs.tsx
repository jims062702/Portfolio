import React from 'react'
import { motion } from 'framer-motion'

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Ambient Gradient Blob 1 - Electric Blue */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl will-change-transform transform-gpu"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dynamic Ambient Gradient Blob 2 - Indigo / Purple */}
      <motion.div
        className="absolute top-1/3 -right-28 w-80 sm:w-[600px] h-80 sm:h-[600px] rounded-full bg-gradient-to-br from-indigo-600/12 via-violet-500/10 to-transparent blur-3xl will-change-transform transform-gpu"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 0.94, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Dynamic Ambient Gradient Blob 3 - Emerald / Cyan at Bottom */}
      <motion.div
        className="absolute -bottom-40 left-1/3 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-gradient-to-t from-emerald-500/10 via-cyan-500/8 to-transparent blur-3xl will-change-transform transform-gpu"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* ANIMATED Geometric Wireframe Lines & Orbits */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="orbitGradPurple" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Orbit System 1: Top Left - Continuous Rotating Circles */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '18% 30%' }}
        >
          <circle
            cx="18%"
            cy="30%"
            r="160"
            fill="none"
            stroke="url(#orbitGradBlue)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <circle
            cx="18%"
            cy="30%"
            r="240"
            fill="none"
            stroke="url(#orbitGradBlue)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
          {/* Orbiting Satellite Dot */}
          <circle
            cx="calc(18% + 160px)"
            cy="30%"
            r="4"
            fill="#38bdf8"
            className="drop-shadow-[0_0_8px_#38bdf8]"
          />
        </motion.g>

        {/* Orbit System 2: Counter-Rotating Middle Circle */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '18% 30%' }}
        >
          <circle
            cx="18%"
            cy="30%"
            r="320"
            fill="none"
            stroke="currentColor"
            className="text-slate-400/20 dark:text-slate-600/30"
            strokeWidth="1.2"
            strokeDasharray="16 16"
          />
        </motion.g>

        {/* Orbit System 3: Bottom Right - Large Rotating Geometric Wireframe */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '82% 65%' }}
        >
          <circle
            cx="82%"
            cy="65%"
            r="280"
            fill="none"
            stroke="url(#orbitGradPurple)"
            strokeWidth="1.5"
            strokeDasharray="10 10"
          />
          <circle
            cx="82%"
            cy="65%"
            r="170"
            fill="none"
            stroke="url(#orbitGradPurple)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <circle
            cx="calc(82% + 280px)"
            cy="65%"
            r="5"
            fill="#818cf8"
            className="drop-shadow-[0_0_8px_#818cf8]"
          />
        </motion.g>

        {/* Floating Sinusoidal Wave Lines drifting across screen */}
        <motion.path
          d="M-100,220 C250,140 600,320 1000,180 C1400,60 1800,260 2200,160"
          fill="none"
          stroke="url(#orbitGradBlue)"
          strokeWidth="1.5"
          strokeDasharray="12 12"
          animate={{
            x: [-80, 80, -80],
            y: [-15, 20, -15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M-100,580 C300,680 750,490 1200,620 C1650,740 1950,530 2300,640"
          fill="none"
          stroke="url(#orbitGradPurple)"
          strokeWidth="1.2"
          strokeDasharray="8 14"
          animate={{
            x: [60, -60, 60],
            y: [20, -25, 20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  )
}
