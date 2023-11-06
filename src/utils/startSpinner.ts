const spinnerChars: string[] = ["|", "/", "-", "\\"]

export function startSpinner() {
  let currentCharacterIndex: number = 0
  let interval: NodeJS.Timeout | undefined
  process.stdout.write("Loading ")
  interval = setInterval(() => {
    process.stdout.write(`\rLoading ${spinnerChars[currentCharacterIndex]} `)
    currentCharacterIndex = (currentCharacterIndex + 1) % spinnerChars.length
  }, 100)
  return () => {
    if (interval) clearInterval(interval)
  }
}
