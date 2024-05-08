import { Header } from "@/components/header";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mokkit",
  description: "Download high quality mockups!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
