import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import ThemeToggle from './theme-toggle'
import { UserButton } from '@clerk/nextjs'

type Props = {
  userName: string
}

const DashboardHeader = ({ userName }: Props) => {
  return (
    <div className='flex justify-between items-center'>
      <Link href="/">
        <Button className='bg-indigo-600'><ArrowLeft className='mr-1 w-4 h-4' size={'sm'} /> Back</Button>
      </Link>
      <div className="w-4"></div>
      <h1 className='text-xl font-bold md:text-3xl'>{userName}'s Notes</h1>
      <div className="w-4"></div>
      <div className='flex items-center'>
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardHeader