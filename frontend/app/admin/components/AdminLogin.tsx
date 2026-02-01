"use client";

import { useState } from "react";
import { adminLogin } from "@/services/admin";
import { useAdmin } from "../../../components/providers/admin-provider";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { refresh } = useAdmin();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminLogin(email, senha);
      await refresh();
      toast.success("Login realizado com sucesso");
    } catch {
      toast.error("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-6">Acesso Administrativo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg bg-background"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg bg-background"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
