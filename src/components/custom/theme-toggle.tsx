"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

type Props = {}

const ThemeToggle = (props: Props) => {
  const { setTheme, theme } = useTheme()
  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme('light')
    } else {
      setTheme("dark")
    }
  }
  return (
    <Button variant={'ghost'} onClick={handleToggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggle