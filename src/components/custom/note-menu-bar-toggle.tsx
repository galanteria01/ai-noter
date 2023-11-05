import React from 'react'
import { Button } from '../ui/button'

type Props = {
  onClick: () => void,
  disabled?: boolean
  children: React.ReactNode,
  className?: string
}

const NoteMenuBarToggle = ({ children, onClick, disabled, className }: Props) => {
  return (
    <Button
      variant="outline"
      aria-label="Toggle italic"
      onClick={onClick}
      disabled={disabled}
      className={className}>
      {children}
    </Button>
  )
}

export default NoteMenuBarToggle