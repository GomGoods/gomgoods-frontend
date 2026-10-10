import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="pt-16 min-h-screen w-full px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
