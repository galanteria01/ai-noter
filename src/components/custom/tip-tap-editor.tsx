'use client'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

type Props = {}

export default function TipTapEditor({ }: Props) {
  const [editorState, setEditorState] = React.useState("")
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    }
  })
  return (
    <div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}