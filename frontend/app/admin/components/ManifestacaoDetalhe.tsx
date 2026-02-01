"use client";

import { useState } from "react";
import { ManifestacaoAdmin } from "../types";
import { responderManifestacao } from "@/services/admin";
import { useAdmin } from "@/components/providers/admin-provider";
import { toast } from "sonner";

export default function ManifestacaoDetalhe({
  manifestacao,
}: {
  manifestacao: ManifestacaoAdmin;
}) {
  const { isAdmin } = useAdmin();
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarResposta = async () => {
    if (!resposta.trim()) return;

    try {
      setLoading(true);
      await responderManifestacao(manifestacao.id, resposta);
      toast.success("Resposta enviada");
      setResposta("");
    } catch {
      toast.error("Erro ao responder manifestação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium">Conteúdo</p>
        <p className="text-sm whitespace-pre-wrap">
          {manifestacao.conteudo}
        </p>
      </div>

      {!manifestacao.anonimo && manifestacao.cidadao && (
        <div className="text-sm">
          <p>
            <strong>Cidadão:</strong> {manifestacao.cidadao.nome}
          </p>
          <p>
            <strong>Email:</strong> {manifestacao.cidadao.email}
          </p>
        </div>
      )}

      {manifestacao.respostas.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Respostas</p>
          {manifestacao.respostas.map((r) => (
            <div
              key={r.id}
              className="bg-card border border-border rounded p-3 text-sm"
            >
              <p>{r.conteudo}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {r.usuario?.nome ?? "Resposta registrada pelo sistema"}
              </p>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Responder</label>
          <textarea
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-2 text-sm"
          />
          <button
            onClick={enviarResposta}
            disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {loading ? "Enviando..." : "Enviar resposta"}
          </button>
        </div>
      )}
    </div>
  );
}
