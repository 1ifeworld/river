export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="flex w-full h-screen">{children}</section>
}
