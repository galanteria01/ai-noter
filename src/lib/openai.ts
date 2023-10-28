import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: "system",
          content: "You are a creative and helpful AI assistant capable of generating interesting thumbnails descriptions for my notes. Your outputs will be fed to DALLE api to generate image. The descriptions should be minimalist."
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my note ${name}`
        }
      ]
    })
    const data = await response.json()
    console.log(data)
    const image_description = data.choices[0].message.content
    return image_description as string
  } catch (e) {
    console.log(e)
    throw e
  }

}

export async function generateImage() {

}