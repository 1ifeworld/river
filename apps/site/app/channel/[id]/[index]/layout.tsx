export default function ItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="pt-[var(--header-height)]">{children}</section>
}
