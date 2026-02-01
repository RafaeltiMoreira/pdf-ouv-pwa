"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getAdminMe, adminLogout } from "@/services/admin";

export type AdminUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "colaborador";
};

type AdminContextType = {
  admin: AdminUser | null;
  loading: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = async () => {
    try {
      setLoading(true);
      const me = await getAdminMe();
      setAdmin(me);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await adminLogout();
    setAdmin(null);
    router.push("/admin");
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,
        isAdmin: admin?.role === "admin",
        refresh,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin deve ser usado dentro de AdminProvider");
  }
  return ctx;
}
