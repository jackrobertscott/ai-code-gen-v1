import OpenAI from "openai"

const apiKey = process.argv[2]

if (!apiKey?.length)
  throw new Error("Please your OpenAI api key as the first command argument.")

if (!apiKey.startsWith("sk-"))
  throw new Error('Your OpenAI api key must start with "sk-".')

export const openai = new OpenAI({
  apiKey,
})
