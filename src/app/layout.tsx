import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mokkit",
  description: "Download high quality mockups!",
  icons: [{ rel: "icon", url: "/favicon.png" }],
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
          <div className="mx-auto w-full max-w-[100rem]">
            <Header />
            <main className="px-8 pb-8">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
