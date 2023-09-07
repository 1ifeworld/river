import "../styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { helveticaNeue } from "./fonts/fonts";
import { Sidebar } from "../components/client";
import { Flex } from "@river/design-system";

export const metadata: Metadata = {
  title: "River",
  description: "Set information free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${helveticaNeue.variable}`}>
      <body>
        <Providers>
         <Flex className="min-h-screen h-screen min-w-screen w-screen border-2 border-accent">
          <Sidebar/>
          {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
