import { input } from "@inquirer/prompts"
import fs from "fs"
import path from "path"
import { extractCode } from "./extractCode"
import { openAISendMessages } from "./openai"
import { selectDirectory } from "./selectDirectory"

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
  const resultContent = await openAISendMessages([
    {
      role: "system",
      content: [
        "You are a helpful assistant for a software development company.",
        "You respond only with code between markdown code tags like: ```.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Create a zod schema which represents for the following model.`,
        `The model name is: ${modelName}`,
        `The purpose of the ${modelName} model is to: ${modelPurpose}`,
        `Your response should be TypeScript code.`,
        `Use the "zod" package as the only dependency.`,
        `Export the zod schema like: \`export const ${modelName}Schema = z.object({/* todo */})\`.`,
      ].join("\n"),
    },
  ])
  const [code] = extractCode(resultContent)
  if (!code) {
    console.log(resultContent)
    throw new Error("Failed to extract code from response.")
  }
  fs.writeFileSync(path.resolve(outputDir, modelName + "Schema.zod.ts"), code)
}
