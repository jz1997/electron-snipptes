export default () => {
  const readText = (): Promise<string> => {
    return navigator.clipboard.readText()
  }

  const writeText = (content: string): Promise<void> => {
    return navigator.clipboard.writeText(content)
  }
  return {
    readText,
    writeText
  }
}
