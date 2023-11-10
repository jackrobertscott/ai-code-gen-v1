import { input } from "@inquirer/prompts"
import { openAI } from "./utils/openAI"

async function getNickname(args: { name: string }) {
  // writeFileSync(
  //   path.resolve(__dirname, "hello.json"),
  //   JSON.stringify({ hello: args.name }, null, 2)
  // )
  return { nickname: args.name.split("").reverse().join("") }
}

async function main() {
  const q = await input({ message: "What do you want?" })
  const runner = openAI.beta.chat.completions.runFunctions({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: q }],
    functions: [
      {
        description: "Gets the nickname of the user.",
        function: getNickname,
        parse: (data) => {
          console.log("parse:", typeof data)
          return JSON.parse(data)
        },
        parameters: {
          type: "object",
          properties: { name: { type: "string" } },
        },
      },
    ],
  })
  runner.on("message", (message) => console.log(message))
  const final = await runner.finalContent()
  console.log(final)
}

main()
