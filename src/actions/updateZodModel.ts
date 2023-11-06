import { input, select } from "@inquirer/prompts"
import fs from "fs"
import path from "path"
import { extractCode } from "../utils/extractCode"
import { openAICodeChat } from "../utils/openAICodeChat"
import { selectDirectory } from "../utils/selectDirectory"

export async function updateZodModel() {
  const modelDir = await selectDirectory({
    message: "The models are located in:",
  })
  const modelFiles = fs
    .readdirSync(modelDir)
    .filter((i) => i.endsWith(".zod.ts"))
  const modelCur = await select({
    message: "Edit model:",
    choices: modelFiles.map((fileName) => ({
      value: fileName,
      name: fileName.replace(/.zod.ts$/g, ""),
    })),
  })
  const proposedChanges = await input({
    message: `I want to change:`,
  })
  const originalCode = fs.readFileSync(path.join(modelDir, modelCur)).toString()
  // if (!isValidTypeScript(originalCode))
  //   throw new Error("Original model code is not valid TypeScript.")
  const resultContent = await openAICodeChat("TypeScript", [
    { role: "user", content: "Update my zod schema code." },
    { role: "assistant", content: "What is the current code?" },
    { role: "user", content: ["```ts", originalCode, "```"].join("\n") },
    { role: "assistant", content: "What changes do you want to make?" },
    { role: "user", content: "I want to change: " + proposedChanges },
  ])
  const [newCode] = extractCode(resultContent)
  if (!newCode) {
    console.log(resultContent)
    throw new Error("Failed to extract code from response.")
  }
  // if (!isValidTypeScript(newCode)) {
  //   console.log(resultContent)
  //   // todo: send back to OpenAI with the error message
  //   throw new Error("The returned code is not valid TypeScript.")
  // }
  fs.writeFileSync(path.resolve(modelDir, modelCur), newCode)
}
