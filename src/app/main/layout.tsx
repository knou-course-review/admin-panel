import NavBar from "@/components/NavBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] overflow-hidden">
      <NavBar />
      <main className="h-dvh overflow-auto p-10">{children}</main>
    </div>
  );
}
