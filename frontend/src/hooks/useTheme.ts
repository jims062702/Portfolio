import { useState, useEffect, useCallback } from 'react'

export type Theme = 'dark' | 'light'

const THEME_KEY = 'jdev_portfolio_theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem(THEME_KEY) as Theme | null
    if (saved === 'dark' || saved === 'light') return saved
    return 'dark'
  })

  // Apply theme class and colorScheme to document root
  const applyThemeToDOM = (nextTheme: Theme) => {
    const root = document.documentElement
    if (nextTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    }
    localStorage.setItem(THEME_KEY, nextTheme)
  }

  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  // Expanding circular ripple theme transition originating from click coordinates
  const toggleTheme = useCallback((event?: React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    // Determine circular ripple origin (x, y)
    let x = window.innerWidth - 40
    let y = 40

    if (event) {
      if ('clientX' in event && event.clientX !== undefined) {
        x = event.clientX
        y = event.clientY
      } else {
        const target = (event as any).currentTarget as HTMLElement | null
        if (target) {
          const rect = target.getBoundingClientRect()
          x = rect.left + rect.width / 2
          y = rect.top + rect.height / 2
        }
      }
    }

    // Check if View Transitions API is available
    const doc = document as any
    const hasViewTransition =
      typeof doc.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasViewTransition) {
      // Robust Fallback: Animate expanding circle over 3 seconds
      const ripple = document.createElement('div')
      ripple.style.position = 'fixed'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = '12px'
      ripple.style.height = '12px'
      ripple.style.marginTop = '-6px'
      ripple.style.marginLeft = '-6px'
      ripple.style.borderRadius = '50%'
      ripple.style.backgroundColor = nextTheme === 'dark' ? '#050b14' : '#f8fafc'
      ripple.style.zIndex = '9999999'
      ripple.style.pointerEvents = 'none'
      ripple.style.transform = 'scale(0)'
      ripple.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease 2.7s'
      document.body.appendChild(ripple)

      requestAnimationFrame(() => {
        const maxDist = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        )
        const scale = (maxDist * 2.2) / 12
        ripple.style.transform = `scale(${scale})`

        setTimeout(() => {
          setTheme(nextTheme)
          applyThemeToDOM(nextTheme)
          ripple.style.opacity = '0'
          setTimeout(() => {
            ripple.remove()
          }, 350)
        }, 2700)
      })
      return
    }

    // Calculate maximum radius to reach the furthest corner of the window
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Trigger circular expansion View Transition
    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme)
      applyThemeToDOM(nextTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 3000, // 3-second smooth circular theme expansion
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [theme])

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  }
}
