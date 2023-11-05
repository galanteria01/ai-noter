"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import useHasMounted from '@/hooks/useHasMounted'

type Props = {}

const ThemeToggle = (props: Props) => {
  const { setTheme, theme } = useTheme()
  const hasMounted = useHasMounted()
  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme('light')
    } else {
      setTheme("dark")
    }
  }
  return (
    <>
      {hasMounted &&
        (<Button variant={'ghost'} onClick={handleToggleTheme}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        )}
    </>
  )
}

export default ThemeToggle