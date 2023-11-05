/**
 * ROUTE /api/create-note
 */

import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { storage } from "@/lib/firebase"
import { generateImage, generateImagePrompt } from "@/lib/openai"
import { auth } from "@clerk/nextjs"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('unauthorized', { status: 401 })
  }
  const body = await req.json()
  const { name } = body
  const image_description = await generateImagePrompt(name);
  if (!image_description) {
    return new NextResponse("Failed to generate image description", { status: 500 })
  }
  const image_url = await generateImage(image_description)
  if (!image_url) {
    return new NextResponse("Failed to generate image", { status: 500 })
  }

  const response = await fetch(image_url);
  const buffer = await response.arrayBuffer();
  const file_name = name.replace(' ', '') + Date.now + '.jpg';
  const storageRef = ref(storage, file_name)
  await uploadBytes(storageRef, buffer, { contentType: 'image/jpeg' });
  const firebase_url = await getDownloadURL(storageRef)


  const notes = await db.insert($notes).values({
    name: name,
    userId: userId,
    imageUrl: firebase_url
  }).returning({
    insertedId: $notes.id
  })

  console.log(image_description)
  return NextResponse.json({ note_id: notes[0].insertedId })
}