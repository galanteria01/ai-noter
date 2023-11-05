"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

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
    const confirm = window.confirm("Are you sure you want to delete this note?")
    if (!confirm) return;
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
    <Button variant="destructive" onClick={handleDelete}><Trash /></Button>
  )
}

export default DeleteNote