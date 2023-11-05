import { select } from "@inquirer/prompts"
import { createModel } from "./createModel"

enum SelectChoice {
  CreateModel,
}

async function main() {
  const action = await select({
    message: "I want to:",
    choices: [
      {
        value: SelectChoice.CreateModel,
        name: "Create a database model",
      },
    ],
  })
  switch (action) {
    case SelectChoice.CreateModel: {
      await createModel()
    }
  }
}

main()
