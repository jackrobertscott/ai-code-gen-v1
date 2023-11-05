import { input } from "@inquirer/prompts"
import fs from "fs"
import path from "path"
import { ModelSchema } from "./ModelSchema"
import { extractJSONCode } from "./extractCode"
import { openAICodeChat } from "./openAICodeChat"
import { selectDirectory } from "./selectDirectory"

export async function createJsonModel() {
  let modelName = await input({
    message: "The model name is:",
  })
  modelName = modelName.split(" ").join("")
  const modelPurpose = await input({
    message: `The purpose of the model is to:`,
  })
  const outputDir = await selectDirectory({
    message: "Store the code in:",
  })
  const resultContent = await openAICodeChat("JSON", [
    { role: "user", content: "Create a zod schema for a database model." },
    { role: "assistant", content: "What is the model's name?" },
    { role: "user", content: modelName },
    { role: "assistant", content: "What is the purpose of the model?" },
    { role: "user", content: "The purpose is to: " + modelPurpose },
    { role: "assistant", content: "What shape do you want the code to be?" },
    {
      role: "user",
      content: [
        "```ts",
        fs.readFileSync(path.join(__dirname, "modelSchema.ts")),
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
  fs.writeFileSync(
    path.resolve(outputDir, modelName + "Model.json"),
    JSON.stringify(parsedModel, null, 2)
  )
}
