import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <p className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border flex items-center justify-center">
        <ShieldCheck className="h-4 w-4" /> Dados estão protegidos pela Lei Geral de Proteção de Dados (LGPD).
      </p>
    </footer>
  );
}