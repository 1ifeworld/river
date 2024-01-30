export function truncateText(text: string, maxLength: number, ellipsis = true) {
  if (!text) return '' // Return an empty string if text is undefined
  if (text.length <= maxLength) return text
  return ellipsis ? `${text.slice(0, maxLength)}...` : text.slice(0, maxLength)
}
