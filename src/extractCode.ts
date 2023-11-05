export function extractJSONCode(
  text: string
): { json: string } | { error: string } {
  const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/
  const match = text.match(jsonBlockRegex)
  if (match && match[1]) {
    try {
      return { json: JSON.parse(match[1]) }
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
