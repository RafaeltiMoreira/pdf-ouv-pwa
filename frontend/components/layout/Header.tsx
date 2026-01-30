"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sun,
  Moon,
  LogOut,
  ListChecks,
  PlusSquare,
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useCidadao } from "@/components/providers/cidadao-provider";
import { useMounted } from "@/hooks/useMounted";

export default function Header() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const { cidadao, logout, loading } = useCidadao();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/70">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* == LOGO PARTICIPA DF == */}
        <Link href="/" className="flex items-center">
          {mounted ? (
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/logos/logo_participa_horizontal-dark.webp"
                  : "/logos/logo_participa_horizontal-light.webp"
              }
              alt="Participa DF"
              width={260}
              height={64}
              priority
            />
          ) : (
            <div className="h-16 w-65 rounded bg-muted" />
          )}
        </Link>

        <nav className="flex items-center gap-4">
          {!loading && cidadao ? (
            <>
              <Link
                href="/manifestacao"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                <PlusSquare className="h-4 w-4" />
                Nova Manifestação
              </Link>
              <Link
                href="/meus-registros"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                <ListChecks className="h-4 w-4" />
                Meus Registros
              </Link>

              <div className="h-6 border-l border-border" />

              <span className="text-sm font-medium text-foreground hidden sm:inline">
                Olá, {cidadao.nome.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </>
          ) : (
            <></> // No links when logged out
          )}

          <div className="h-6 border-l border-border" />

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="rounded-xl border border-border p-2 hover:bg-muted transition-colors"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}