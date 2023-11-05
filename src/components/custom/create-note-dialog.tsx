'use client'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

type Props = {}

const CreateNoteDialog = (props: Props) => {
  const [value, setValue] = React.useState<string>("")
  const router = useRouter()

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/create-note", {
        name: value
      })
      return response.data
    }
  })
  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/upload-image", {
        noteId,
      });
      return response.data;
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value === "") {
      toast({
        description: "Please add value to note name",
      })
      return;
    }

    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log(note_id);
        uploadToFirebase.mutate(note_id);
        router.push(`/notebook/${note_id}`)
      },
      onError: (error) => {
        toast({
          description: "Failed to create new notebook",
        })
      }
    })
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className='border-dashed flex border-2 border-indigo-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
          <Plus className='w-6 h-6 text-indigo-600 stroke-3' />
          <h2 className='font-semibold text-indigo-600 sm:mt-2'>New Note Book</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create new note!
          </DialogTitle>
          <DialogDescription>You can create new note by giving it a name!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder='Name'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='h-4'></div>
          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type='reset' variant={'secondary'} >
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' className='bg-indigo-600' disabled={createNotebook.isPending}>
              {createNotebook.isPending ? (<Loader2 className='animate-spin w-4 h-4' />) : "Create"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog