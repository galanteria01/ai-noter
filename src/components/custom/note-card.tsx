import { NoteType } from '@/lib/db/schema'
import React from 'react'

type Props = {
  note: NoteType,
  createdAt: Date
}

const NoteCard = ({ note, createdAt }: Props) => {
  return (
    <a href={`/notebook/${note.id}`} key={note.id}>
      <div className='border border-stone-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1'>
        <img width={256} height={256} alt={note.name} src={note.imageUrl ?? ""} />
        <div className="p-4">

          <h3 className='text-xl font-semibold'>{note.name}</h3>
          <div className="h-1"></div>
          <p className='text-sm text-gray-500'>
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </a>
  )
}

export default NoteCard