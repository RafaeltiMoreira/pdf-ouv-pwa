"use client";

import { useEffect, useState } from "react";
import { listarManifestacoesAdmin } from "@/services/admin";
import { ManifestacaoAdmin } from "../types";
import CardsResumo from "./CardsResumo";
import ManifestacaoTable from "./ManifestacaoTable";
import { Loader2 } from "lucide-react";
import { atualizarStatusManifestacao } from "@/services/admin";
import { ManifestacaoStatus } from "@/components/status/StatusBadge";


export default function AdminDashboard() {
  const [manifestacoes, setManifestacoes] = useState<ManifestacaoAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await listarManifestacoesAdmin();
        setManifestacoes(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  async function handleStatusChange(
  manifestacaoId: string,
  novoStatus: ManifestacaoStatus
) {
  try {
    await atualizarStatusManifestacao(manifestacaoId, novoStatus);

    setManifestacoes((prev) =>
      prev.map((m) =>
        m.id === manifestacaoId
          ? { ...m, status: novoStatus }
          : m
      )
    );
  } catch (error) {
    console.error("Erro ao atualizar status", error);
  }
}


  return (
    <div className="space-y-6">
      <CardsResumo manifestacoes={manifestacoes} />
      <ManifestacaoTable manifestacoes={manifestacoes} onStatusChange={handleStatusChange} />
    </div>
  );
}
