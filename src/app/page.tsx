import FAQAccordian from '@/components/custom/faq-accordian'
import TypewriteTitle from '@/components/custom/typewriter-title'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className=''>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className="font-semibold text-7xl text-center">
          Artificial Intelligence based <span className='text-indigo-600 font-bold'>note taking</span>{' '} assistant
        </h1>
        <div className="mt-4"> </div>
        <h2 className='font-semibold text-3xl text-center'><TypewriteTitle /></h2>
        <div className="mt-8"> </div>
        <div className='flex justify-center'>
          <Link href={"/dashboard"}>
            <Button className='bg-indigo-600'>
              Get Started <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3} />
            </Button>
          </Link>
        </div>
        <FAQAccordian />
      </div>
    </div>
  )
}
