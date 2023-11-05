import { select } from "@inquirer/prompts"
import { createJsonModel } from "./createJsonModel"
import { createZodModel } from "./createZodModel"
import { updateZodModel } from "./updateZodModel"

enum SelectChoice {
  CreateZodModel,
  UpdateZodModel,
  CreateJsonModel,
}

async function main() {
  const action = await select({
    message: "I want to:",
    choices: [
      {
        value: SelectChoice.CreateZodModel,
        name: "Create zod model",
      },
      {
        value: SelectChoice.UpdateZodModel,
        name: "Update zod model",
      },
      {
        value: SelectChoice.CreateJsonModel,
        name: "Create json model",
      },
    ],
  })
  switch (action) {
    case SelectChoice.CreateZodModel:
      await createZodModel()
      break
    case SelectChoice.UpdateZodModel:
      await updateZodModel()
      break
    case SelectChoice.CreateJsonModel:
      await createJsonModel()
      break
  }
}

main()
