import { input } from "@inquirer/prompts"
import fs from "fs"
import path from "path"
import { extractCode } from "../utils/extractCode"
import { openAICodeChat } from "../utils/openAICodeChat"
import { selectDirectory } from "../utils/selectDirectory"

export async function createZodModel() {
  const modelName = await input({
    message: "The model name is:",
  })
  const modelPurpose = await input({
    message: `The purpose of the ${modelName} model is to:`,
  })
  const outputDir = await selectDirectory({
    message: "Store the code in:",
  })
  const resultContent = await openAICodeChat("TypeScript", [
    { role: "user", content: "Create a zod schema for a database model." },
    { role: "assistant", content: "What is the model's name?" },
    { role: "user", content: modelName },
    { role: "assistant", content: "What is the purpose of the model?" },
    { role: "user", content: "The purpose is to: " + modelPurpose },
    { role: "assistant", content: "What npm dependencies are allowed?" },
    { role: "user", content: "zod" },
    { role: "assistant", content: "Is there any other requirements?" },
    {
      role: "user",
      content:
        "Export at the definition e.g. `export const ExampleSchema = z.object({/* todo */})`",
    },
  ])
  const [code] = extractCode(resultContent)
  if (!code) {
    console.log(resultContent)
    throw new Error("Failed to extract code from response.")
  }
  fs.writeFileSync(path.resolve(outputDir, modelName + "Model.zod.ts"), code)
}
