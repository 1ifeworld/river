export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <section className="pt-[69px] px-5 md:px-[186px] pb-8">{children}</section>
  )
}
