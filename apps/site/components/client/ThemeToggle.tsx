import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const isLight = theme === 'light'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.metaKey && event.key === 't') {
        setTheme(isLight ? 'dark' : 'light')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLight, setTheme])

  if (!mounted) {
    return null
  }

  {
    /* Currently, the ability to toggle between dark and light modes using a button is commented out. This is due to some components and styles that are not yet compatible with this feature. */
  }
  return (
    <>
      {/* <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`h-4 w-4 border border-primary bg-primary fixed left-4 bottom-4 ${
          isLight ? '' : 'hidden'
        }`}
      />
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`h-4 w-4 border border-primary bg-primary fixed left-4 bottom-4 ${
          isLight ? 'hidden' : ''
        }`}
      /> */}
    </>
  )
}
