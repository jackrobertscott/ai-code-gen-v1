import { input } from "@inquirer/prompts"
import fs from "fs"
import path from "path"
import { extractJSONCode } from "./extractCode"
import { ModelSchema } from "./modelSchema"
import { openAISendMessages } from "./openai"

export async function createModel() {
  const modelName = await input({
    message: "The model name is:",
  })
  const modelPurpose = await input({
    message: `The purpose of the ${modelName} model is to:`,
  })
  const fileContent = fs.readFileSync(path.join(__dirname, "modelSchema.ts"))
  const resultContent = await openAISendMessages([
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
        `Create a database model.`,
        `The model name is: ${modelName}`,
        `The purpose of the ${modelName} model is to: ${modelPurpose}`,
        `Your response should be JSON code.`,
        `The JSON code should match the following "ModelSchema" definition:`,
        "```ts",
        fileContent,
        "```",
      ].join("\n"),
    },
  ])
  const jsonData = extractJSONCode(resultContent)
  if ("error" in jsonData) {
    console.log(resultContent)
    throw new Error(jsonData.error)
  }
  const parsedModel = ModelSchema.parse(jsonData.json)
  console.log(parsedModel)
}
