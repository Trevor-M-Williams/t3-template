import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header";

export const metadata = {
  title: "Dashboard",
  description: "Download high quality mockups!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="mx-auto w-full max-w-[100rem]">
        <Header />
        <main className="px-8 pb-8">{children}</main>
      </div>
    </ClerkProvider>
  );
}
