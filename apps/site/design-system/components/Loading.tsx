'use client'

import * as React from 'react'

export function Loading() {
  const [dotCount, setDotCount] = React.useState(1)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount === 3 ? 1 : prevCount + 1))
    }, 450)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <span style={{ opacity: dotCount >= 1 ? 1 : 0 }}>{'·'}</span>
      <span style={{ opacity: dotCount >= 2 ? 1 : 0 }}>{'·'}</span>
      <span style={{ opacity: dotCount >= 3 ? 1 : 0 }}>{'·'}</span>
    </>
  )
}
