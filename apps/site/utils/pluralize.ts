export function pluralize(
  count: number,
  singular: string,
  plural: string,
): string {
  return `${count} ${count === 1 ? singular : plural}`
}

export function selectPluralForm(
  count: number,
  singular: string,
  plural: string,
): string {
  return count === 1 ? singular : plural
}
