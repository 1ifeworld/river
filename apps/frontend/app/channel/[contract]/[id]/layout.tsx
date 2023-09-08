export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // w-full h-full
    <section className="flex w-full h-screen">
      {/* <Header /> */}
      {children}
    </section>
  );
}
