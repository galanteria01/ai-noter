import TypewriteTitle from '@/components/custom/typewriter-title'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-gradient-to-r min-h-screen from-rose-100 to-teal-100 grainy'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className="font-semibold text-7xl text-center">
          AI <span className='text-green-600 font-bold'>note taking</span>{' '} assistant
        </h1>
        <div className="mt-4"> </div>
        <h2 className='font-semibold text-slate-700 text-3xl text-center'><TypewriteTitle /></h2>
        <div className="mt-8"> </div>
        <div className='flex justify-center'>

          <Link href={"/dashboard"}>
            <Button className='bg-green-600'>
              Get Started <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}