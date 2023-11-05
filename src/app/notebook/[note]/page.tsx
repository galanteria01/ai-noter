import DeleteNote from '@/components/custom/delete-note'
import NoteEditor from '@/components/custom/note-editor'
import { Button } from '@/components/ui/button'
import { clerk } from '@/lib/clerk'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { Delete, Trash } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    note: string
  }
}

export default async function NotebookPage({ params: { note } }: Props) {
  console.log(note)
  const { userId } = await auth()
  if (!userId) {
    return redirect('/dashboard')
  }
  const user = await clerk.users.getUser(userId)
  const notes = await db.select().from($notes).where(
    and(
      eq($notes.id, parseInt(note)),
      eq($notes.userId, userId)
    )
  )
  if (notes.length !== 1) {
    return redirect('/dashboard')
  }
  const currentNote = notes[0]
  return (
    <div className=" min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl rounded-lg flex p-4 items-center border-stone-200">
          <Link href="/dashboard">
            <Button className='bg-indigo-600' size={'sm'}>Back</Button>
          </Link>
          <div className="w-3"></div>
          <span className='font-semibold'>{user.firstName} {user.lastName}</span>
          <span className='inline-block mx-1'>
            /
          </span>
          <span className='text-stone-500 font-semibold'>{currentNote.name}</span>
          <div className="ml-auto"></div>
          <DeleteNote noteId={currentNote.id} />
        </div>
        <div className="h-4"></div>
        <div className='border border-stone-200 shadow-xl rounded-lg w-full px-16 py-8'>
          <NoteEditor note={currentNote} />
        </div>
      </div>
    </div>
  )
}