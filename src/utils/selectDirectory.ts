import { select } from "@inquirer/prompts"
import fs from "fs"
import path from "path"

export async function selectDirectory(
  options: { message: string },
  curDir: string = process.cwd()
) {
  const dirs = fs
    .readdirSync(curDir)
    .filter((dir) => fs.statSync(dir).isDirectory)
  const folder = await select({
    ...options,
    choices: dirs.map((dir) => ({
      value: path.relative(curDir, dir),
    })),
  })
  return path.resolve(curDir, folder)
}
