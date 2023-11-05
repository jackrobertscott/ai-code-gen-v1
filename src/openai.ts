import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources"
import { startSpinner } from "./startSpinner"

const apiKey = process.argv[2]

if (!apiKey?.length)
  throw new Error("Please your OpenAI api key as the first command argument.")

if (!apiKey.startsWith("sk-"))
  throw new Error('Your OpenAI api key must start with "sk-".')

export const openAI = new OpenAI({
  apiKey,
})

export async function openAISendMessages(
  messages: Array<ChatCompletionMessageParam>
) {
  const stopSpinner = startSpinner()
  const result = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  })
  stopSpinner()
  if (result.usage) {
    const { prompt_tokens: pt, completion_tokens: ct } = result.usage
    console.log(`Prompt tokens: ${pt} ($${((pt / 1000) * 0.0015).toFixed(4)})`)
    console.log(`Output tokens: ${ct} ($${((ct / 1000) * 0.002).toFixed(4)})`)
  }
  const resultContent = result.choices[0].message.content
  if (!resultContent) throw new Error("Failed to generate content.")
  return resultContent
}
