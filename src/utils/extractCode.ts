export function extractCode(markdown: string): string[] {
  const blocks: string[] = []
  const regex = /```(?:\w+\n)?([^`]+)```/g
  let match
  while ((match = regex.exec(markdown))) {
    blocks.push(match[1].trim())
  }
  return blocks
}

export function extractJSONCode(
  markdown: string
): { json: string } | { error: string } {
  const blocks = extractCode(markdown)
  if (blocks[0]) {
    try {
      return { json: JSON.parse(blocks[0]) }
    } catch (error) {
      const msg =
        typeof error === "string"
          ? error
          : typeof error === "object" &&
            error &&
            "message" in error &&
            typeof error?.message === "string"
          ? error.message
          : "Unknown"
      return { error: "Error parsing JSON:" + msg }
    }
  } else {
    return { error: "No JSON block found" }
  }
}
