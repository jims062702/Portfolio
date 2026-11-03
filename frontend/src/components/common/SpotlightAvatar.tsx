import React, { useState, useRef } from 'react'

interface SpotlightAvatarProps {
  className?: string
  sizeClassName?: string
  roundedClassName?: string
  spotlightRadius?: number
}

export const SpotlightAvatar: React.FC<SpotlightAvatarProps> = ({
  className = '',
  sizeClassName = 'w-36 h-36',
  roundedClassName = 'rounded-[26px]',
  spotlightRadius = 52,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
    if (!isActive) setIsActive(true)
  }

  const handlePointerLeave = () => {
    setIsActive(false)
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerMove}
      className={`relative overflow-hidden cursor-crosshair select-none bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 shadow-xl ${sizeClassName} ${roundedClassName} ${className}`}
    >
      {/* Base Layer: Ghibli Anime Artwork */}
      <img
        src="/assets/james-ghibli.png"
        alt="James Gasang Ghibli Illustration"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        draggable={false}
      />

      {/* Spotlight Layer: Real Photo revealed only under the cursor */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          maskImage: `radial-gradient(circle ${spotlightRadius}px at ${pos.x}px ${pos.y}px, black 75%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${pos.x}px ${pos.y}px, black 75%, transparent 100%)`,
        }}
      >
        <img
          src="/assets/james-real.jpg"
          alt="James Gasang Real Photo"
          className="w-full h-full object-cover object-top select-none"
          draggable={false}
        />
      </div>

      {/* Inspection Lens Follower Ring */}
      {isActive && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-blue-400/90 shadow-[0_0_16px_rgba(56,189,248,0.6)] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${spotlightRadius * 2}px`,
            height: `${spotlightRadius * 2}px`,
          }}
        >
          {/* Subtle Crosshair Reticle Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
        </div>
      )}
    </div>
  )
}

