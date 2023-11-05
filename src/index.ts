import { select } from "@inquirer/prompts"
import { createModel } from "./createModel"

enum SelectChoice {
  CreateModel,
  Other,
}

async function main() {
  const action = await select({
    message: "What would you like to do?",
    choices: [
      {
        value: SelectChoice.CreateModel,
        name: "Create a database model",
      },
      {
        value: SelectChoice.Other,
        name: "Todo #1",
      },
      {
        value: SelectChoice.Other,
        name: "Todo #2",
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
