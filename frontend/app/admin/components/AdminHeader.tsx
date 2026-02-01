"use client";

import { LogOut, Shield } from "lucide-react";
import { useAdmin } from "@/components/providers/admin-provider";

export default function AdminHeader() {
  const { admin, logout } = useAdmin();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-5 w-5 text-primary" />
          Painel Administrativo
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Olá, {admin?.nome}
          </span>

          <button
            onClick={logout}
            className="flex items-center gap-1 text-sm text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
