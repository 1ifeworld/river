import { Header } from "../../../components/client";

export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-[145px]">
      <Header/>
      {children}
    </section>
  );
}
