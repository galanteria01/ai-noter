/**
 * ROUTE /api/completion
 */

import { OpenAIApi, Configuration } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from "ai"
import { generateResponseStream } from '@/lib/openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  const { prompt } = await req.json()


  const stream = await generateResponseStream(prompt);
  return new StreamingTextResponse(stream);

}