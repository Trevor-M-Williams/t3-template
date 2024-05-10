import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[100rem]">
      <Header />
      <main className="px-8 pb-8">{children}</main>
    </div>
  );
}
