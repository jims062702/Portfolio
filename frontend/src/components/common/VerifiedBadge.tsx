import React from 'react'
import { cn } from '../../utils/cn'

interface VerifiedBadgeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
  }

  return (
    <span
      title="Verified Developer Profile"
      className={cn('inline-flex items-center justify-center shrink-0 text-[#1877F2]', className)}
    >
      <svg
        className={cn(sizeClasses[size], 'drop-shadow-sm')}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.9-5.9 1.4 1.4-7.3 7.3z" />
      </svg>
    </span>
  )
}

