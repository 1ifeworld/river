export default function ItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden overscroll-none">{children}</section>
  )
}
