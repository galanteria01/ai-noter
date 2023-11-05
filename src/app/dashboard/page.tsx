import React from 'react'
import { auth } from '@clerk/nextjs'
import CreateNoteDialog from '@/components/custom/create-note-dialog'
import { $notes } from '@/lib/db/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { Separator } from '@/components/ui/separator'
import { clerk } from '@/lib/clerk'
import NoteCard from '@/components/custom/note-card'
import DashboardHeader from '@/components/custom/dashboard-header'

type Props = {}

export default async function DashboardPage({ }: Props) {
  const { userId } = auth()
  const user = await clerk.users.getUser(userId!)
  const notes = await db.select().from($notes).where(
    eq($notes.userId, userId!)
  )
  return (
    <>
      <div className=" min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <div className='h-2' />
          <DashboardHeader userName={user.firstName!} />
          <div className="h-4"></div>
          <Separator />
          <div className="h-4"></div>
          {notes.length === 0 && <div className="text-center">
            <h2 className='text-xl text-gray-500'>You have no notes</h2>
          </div>}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-2 gap-3">
            <CreateNoteDialog />
            {
              notes.map((note, index) => {
                return (
                  <NoteCard createdAt={note.createdAt} note={note} key={note.id} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}