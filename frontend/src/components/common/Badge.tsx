import React from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline' | 'success'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-300 border border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-300 dark:border-slate-800',
    accent: 'bg-blue-500/10 text-blue-600 border border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30',
    outline: 'bg-transparent text-slate-600 border border-slate-300 dark:text-slate-400 dark:border-slate-800',
    success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
  }

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 rounded-full',
    md: 'text-sm px-3.5 py-1.5 rounded-full',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}

