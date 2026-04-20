'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationEvents() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on every route change, bypassing Lenis
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname])

  return null
}
