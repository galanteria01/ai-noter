'use client'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Button } from '../ui/button'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import Text from '@tiptap/extension-text'
import { useCompletion } from 'ai/react'
import NoteMenuBar from './note-menu-bar'

type Props = {
  note: NoteType
}

export default function NoteEditor({ note }: Props) {
  const [editorState, setEditorState] = React.useState(note.editorState ?? `<h1>${note.name}</h1>`)
  const debouncedEditorState = useDebounce(editorState, 500)
  const lastCompletion = React.useRef('')

  const { complete, completion } = useCompletion({
    api: '/api/completion',

  })
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/save-note', {
        noteId: note.id,
        editorState: debouncedEditorState
      })
      return response.data
    }
  })
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-a': () => {
          const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
          complete(prompt)
          return true;
        }
      }

    }
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    }
  })
  React.useEffect(() => {
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Success update', data)
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }, [debouncedEditorState])
  React.useEffect(() => {
    if (!editor || !completion) return
    const diff = completion.slice(lastCompletion.current.length)
    lastCompletion.current = completion
    editor?.commands.insertContent(diff)
  }, [completion, editor])
  return (
    <>
      <div className='flex justify-between'>
        {editor && <NoteMenuBar editor={editor} />}
        <Button disabled>
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className='prose prose-sm w-full mt-4'>
        <EditorContent editor={editor} />
      </div>
      <div className="text-sm">
        Tip: Press<kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 rounded-lg'>Shift + A</kbd>
        for AI autocomplete
      </div>
    </>
  )
}