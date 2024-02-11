import { pluralize } from './pluralize'

export function unixTimeConverter(seconds: number) {
  const now = new Date().getTime() // Get current time in milliseconds
  const timestamp = new Date(seconds * 1000).getTime() // Convert seconds to milliseconds

  // Difference in milliseconds
  let diff = now - timestamp

  // If the difference is negative, it means the timestamp is in the future
  if (diff < 0) {
    // return 0 minutes ago instead of 23 hours from negative number
    return '0 minutes ago'
  }

  // Calculate days, hours, and minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  diff -= days * (1000 * 60 * 60 * 24)
  const hours = Math.floor(diff / (1000 * 60 * 60))
  diff -= hours * (1000 * 60 * 60)
  const minutes = Math.floor(diff / (1000 * 60))
  // Format output with pluralization
  if (days > 0) {
    return `${pluralize(days, 'day', 'days')} ago`
  } else if (hours > 0) {
    return `${pluralize(hours, 'hour', 'hours')} ago`
  } else {
    return `${pluralize(minutes, 'minute', 'minutes')} ago`
  }
}
