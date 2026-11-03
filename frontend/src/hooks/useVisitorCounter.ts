import { useState, useEffect } from 'react'

const CACHE_KEY = 'jdev_portfolio_visits_count_v3'
const SESSION_FLAG = 'jdev_session_hit_registered_v3'
const API_KEY = 'jamesgasang_portfolio_live_v3'
const BASELINE_VISITS = 6034

export function useVisitorCounter() {
  const [visits, setVisits] = useState<number>(() => {
    if (typeof window === 'undefined') return BASELINE_VISITS
    const stored = localStorage.getItem(CACHE_KEY)
    if (stored) {
      const parsed = parseInt(stored, 10)
      if (!isNaN(parsed) && parsed >= BASELINE_VISITS) return parsed
    }
    return BASELINE_VISITS
  })

  useEffect(() => {
    let isMounted = true

    async function recordOrFetchVisit() {
      const alreadyCountedInSession = sessionStorage.getItem(SESSION_FLAG)
      // If new session: hit (increment); if already counted: get
      const endpoint = alreadyCountedInSession
        ? `https://countapi.mileshilliard.com/api/v1/get/${API_KEY}`
        : `https://countapi.mileshilliard.com/api/v1/hit/${API_KEY}`

      try {
        const response = await fetch(endpoint, { method: 'GET' })
        if (response.ok) {
          const data = await response.json()
          const liveDelta = typeof data.value === 'string' ? parseInt(data.value, 10) : data.value
          if (!isNaN(liveDelta) && liveDelta > 0) {
            // Baseline 6,034 + live recorded visits
            const computedTotal = BASELINE_VISITS + (liveDelta - 1)
            if (isMounted) {
              setVisits(computedTotal)
            }
            localStorage.setItem(CACHE_KEY, computedTotal.toString())
            if (!alreadyCountedInSession) {
              sessionStorage.setItem(SESSION_FLAG, 'true')
            }
          }
        }
      } catch (err) {
        // Fallback: increment locally from baseline
        if (!alreadyCountedInSession) {
          sessionStorage.setItem(SESSION_FLAG, 'true')
          setVisits(prev => {
            const next = prev + 1
            localStorage.setItem(CACHE_KEY, next.toString())
            return next
          })
        }
      }
    }

    recordOrFetchVisit()

    return () => {
      isMounted = false
    }
  }, [])

  // Format: clean natural visitor counter e.g. "6,034 visits"
  const formattedVisits = `${visits.toLocaleString('en-US')} visits`

  return {
    visits,
    formattedVisits,
  }
}
