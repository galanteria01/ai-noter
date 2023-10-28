"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { Separator } from '@radix-ui/react-separator'

type Props = {}

export default function DashboardPage({ }: Props) {
  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className='h-14' />
          <div className='flex justify-center items-center md:flex-row flex-col'>
            <div className='flex items-center'>
              <Link href="/">
                <Button className='bg-green-600'><ArrowLeft className='mr-1 w-4 h-4' size={'sm'} /> Back</Button>
              </Link>
              <div className="w-4"></div>
              <h1 className='text-3xl font-bold text-slate-900'>My Notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>
          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          <div className="text-center">
            <h2 className='text-xl text-gray-500'>You have no notes</h2>
          </div>
        </div>
      </div>
    </>
  )
}