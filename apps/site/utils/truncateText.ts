export function truncateText(text: string, maxLength: number) {
  if (!text) return '' // Return an empty string if text is undefined
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}
