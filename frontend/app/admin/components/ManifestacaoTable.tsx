"use client";

import React, { useState } from "react";
import { ManifestacaoAdmin } from "../types";
import { StatusBadge, ManifestacaoStatus } from "@/components/status/StatusBadge";
import ManifestacaoDetalhe from "./ManifestacaoDetalhe";
import { ChevronDown } from "lucide-react";
import { useAdmin } from "@/components/providers/admin-provider";

type Props = {
  manifestacoes: ManifestacaoAdmin[];
  onStatusChange: (
    manifestacaoId: string,
    novoStatus: ManifestacaoStatus
  ) => void;
};

export default function ManifestacaoTable({
  manifestacoes,
  onStatusChange,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { admin } = useAdmin();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Protocolo</th>
            <th className="px-4 py-3 text-left text-sm">Assunto</th>
            <th className="px-4 py-3 text-left text-sm">Cidadão</th>
            <th className="px-4 py-3 text-left text-sm">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>

        <tbody>
          {manifestacoes.map((m) => (
            <React.Fragment key={m.id}>
              <tr className="border-t">
                <td className="px-4 py-3 text-sm">{m.protocolo}</td>
                <td className="px-4 py-3 text-sm">{m.assunto}</td>
                <td className="px-4 py-3 text-sm">
                  {m.anonimo ? "Anônimo" : m.cidadao?.nome}
                </td>

                <td className="px-4 py-3">
                  {admin?.role === "admin" ? (
                    <select
                      value={m.status}
                      onChange={(e) =>
                        onStatusChange(
                          m.id,
                          e.target.value as ManifestacaoStatus
                        )
                      }
                      className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    >
                      <option value="RECEBIDA">Recebida</option>
                      <option value="EM_ANALISE">Em análise</option>
                      <option value="RESPONDIDA">Respondida</option>
                      <option value="CONCLUIDA">Concluída</option>
                      <option value="ARQUIVADA">Arquivada</option>
                    </select>
                  ) : (
                    <StatusBadge status={m.status} size="sm" />
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      setExpanded(expanded === m.id ? null : m.id)
                    }
                    className="p-2 rounded hover:bg-muted"
                    aria-label="Ver detalhes"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expanded === m.id ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </td>
              </tr>

              {expanded === m.id && (
                <tr className="bg-muted/50">
                  <td colSpan={5} className="px-4 py-4">
                    <ManifestacaoDetalhe manifestacao={m} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
