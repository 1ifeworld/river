import { Header } from "../../../../components/client";

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // w-full h-full
    <section className="flex w-full h-full">
      {/* <Header /> */}
      {children}
    </section>
  );
}
