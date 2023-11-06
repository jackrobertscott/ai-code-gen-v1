import { ChatCompletionMessageParam } from "openai/resources"
import { openAI } from "./openAI"

export async function openAICodeChat(
  language: string,
  messages: Array<ChatCompletionMessageParam>
) {
  // const stopSpinner = startSpinner()
  const stream = openAI.beta.chat.completions.stream({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: [
          "You are a helpful assistant.",
          "You will not describe your code.",
          "Your code will not have a description.",
          "Your code will be written in " + language,
        ].join(" "),
      },
      ...messages,
    ],
  })
  // stopSpinner()
  stream.on("content", (delta) => {
    process.stdout.write(delta)
  })
  const result = await stream.finalChatCompletion()
  if (result.usage) {
    const { prompt_tokens: pt, completion_tokens: ct } = result.usage
    console.log(`Prompt tokens: ${pt} ($${((pt / 1000) * 0.0015).toFixed(4)})`)
    console.log(`Output tokens: ${ct} ($${((ct / 1000) * 0.002).toFixed(4)})`)
  }
  const resultContent = result.choices[0].message.content
  if (!resultContent) throw new Error("Failed to generate content.")
  return resultContent
}
