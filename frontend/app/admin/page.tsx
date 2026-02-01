"use client";

import AdminHeader from "./components/AdminHeader";
import { AdminProvider, useAdmin } from "@/components/providers/admin-provider";
import AdminLogin from "@/app/admin/components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { Loader2 } from "lucide-react";

function AdminContent() {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <AdminContent />
      </main>
    </AdminProvider>
  );
}
