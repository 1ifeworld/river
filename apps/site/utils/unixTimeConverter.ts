export function unixTimeConverter(seconds: number) {
    const now = new Date().getTime(); // Get current time in milliseconds
    const timestamp = new Date(seconds * 1000).getTime(); // Convert seconds to milliseconds

    // Difference in milliseconds
    let diff = now - timestamp;

    // Calculate days, hours, and minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));

    // Format output
    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else {
        return `${minutes} minutes ago`;
    }
}
