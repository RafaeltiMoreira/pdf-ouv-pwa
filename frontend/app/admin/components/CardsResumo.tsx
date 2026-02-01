"use client";

import { ManifestacaoAdmin } from "../types";

export default function CardsResumo({
  manifestacoes,
}: {
  manifestacoes: ManifestacaoAdmin[];
}) {
  const total = manifestacoes.length;

  const count = (status: string) =>
    manifestacoes.filter((m) => m.status === status).length;

  const cards = [
    { label: "Total", value: total },
    { label: "Recebidas", value: count("RECEBIDA") },
    { label: "Em análise", value: count("EM_ANALISE") },
    { label: "Respondidas", value: count("RESPONDIDA") },
    { label: "Concluída", value: count("CONCLUIDA") },
    { label: "Arquivada", value: count("ARQUIVADA") },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-card border border-border rounded-xl p-4"
        >
          <p className="text-sm text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
