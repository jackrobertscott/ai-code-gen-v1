import { input } from "@inquirer/prompts"
import fs from "fs"
import { ChatCompletionMessageParam } from "openai/resources"
import path from "path"
import { extractJSONCode } from "./extractCode"
import { ModelSchema } from "./modelSchema"
import { openai } from "./openai"

export async function createModel() {
  const modelName = await input({ message: "Model name:" })
  const fileContent = fs.readFileSync(path.join(__dirname, "modelSchema.ts"))
  const messages: Array<ChatCompletionMessageParam> = [
    {
      role: "system",
      content: [
        "You are a helpful assistant for a software development company.",
        "You respond only with code.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Create a database model called ${modelName}.`,
        `Your response should be JSON code.`,
        `The JSON code should match the following "ModelSchema" definition:`,
        "```ts",
        fileContent,
        "```",
      ].join("\n"),
    },
  ]
  let seconds = 0
  const i = setInterval(() => {
    seconds += 1
    console.log("Seconds " + seconds)
  }, 1000)
  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  })
  clearInterval(i)
  if (result.usage) {
    const { prompt_tokens: pt, completion_tokens: ct } = result.usage
    console.log(`Prompt tokens: ${pt} ($${((pt / 1000) * 0.0015).toFixed(4)})`)
    console.log(`Output tokens: ${ct} ($${((ct / 1000) * 0.002).toFixed(4)})`)
  }
  const resultContent = result.choices[0].message.content
  if (!resultContent) throw new Error("Failed to generate content.")
  const jsonData = extractJSONCode(resultContent)
  if ("error" in jsonData) throw new Error(jsonData.error)
  const parsedModel = ModelSchema.parse(jsonData.json)
  console.log(parsedModel)
}
