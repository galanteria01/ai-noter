"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
  noteId: number
}

const DeleteNote = ({ noteId }: Props) => {
  const router = useRouter()
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/delete-note', {
        noteId
      })
      return response.data
    }
  })
  const handleDelete = () => {
    deleteNote.mutate(undefined, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (error) => {
        toast({
          description: "Failed to create delete notebook",
        })
        console.error(error)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><Trash /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

}

export default DeleteNote