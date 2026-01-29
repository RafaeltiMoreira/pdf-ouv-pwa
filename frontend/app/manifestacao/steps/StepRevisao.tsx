"use client";

import { useState } from "react";
import { criarManifestacao } from "@/services/manifestacao";
import { CriarManifestacaoDTO } from "@/types/manifestacao";

type Props = {
  data: {
    assunto: string;
    conteudo: string;
    anexos: File[];
    audioBlob: Blob | null;
    localizacao?: {
      lat: number;
      lng: number;
    };
    anonimo: boolean;
  };
  onBack: () => void;
  onSuccess: (protocolo: string) => void;
};

export default function StepRevisao({
  data,
  onBack,
  onSuccess,
}: Props) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function enviarManifestacao() {
    setErro(null);
    setEnviando(true);

    function blobToFile(blob: Blob, fileName: string): File {
      return new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });
    }

    try {
      const payload: CriarManifestacaoDTO = {
        assunto: data.assunto,
        conteudo: data.conteudo,
        anonimo: data.anonimo,
        latitude: data.localizacao?.lat,
        longitude: data.localizacao?.lng,
        audio: data.audioBlob
          ? blobToFile(data.audioBlob, "manifestacao.webm")
          : undefined,
        anexos: data.anexos,
      };

      const response = await criarManifestacao(payload);

      onSuccess(response.protocolo);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else if (typeof err === "object" && err !== null && "erro" in err) {
        setErro(String((err as unknown as { erro: string }).erro));
      } else {
        setErro("Erro inesperado ao enviar manifestação.");
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        Revisão da manifestação
      </h2>

      <div className="space-y-4 text-sm">
        {/* ASSUNTO */}
        <div>
          <span className="text-gray-400">Assunto</span>
          <p className="font-medium">
            {data.assunto || "—"}
          </p>
        </div>

        {/* CONTEÚDO */}
        <div>
          <span className="text-gray-400">Descrição</span>
          <p className="whitespace-pre-line">
            {data.conteudo || "—"}
          </p>
        </div>

        {/* ANEXOS */}
        <div>
          <span className="text-gray-400">Anexos</span>
          <p>
            {data.anexos.length > 0
              ? `${data.anexos.length} arquivo(s)`
              : "Nenhum"}
          </p>
        </div>

        {/* LOCALIZAÇÃO */}
        {data.localizacao && (
          <div className="flex items-center gap-2 text-green-500">
            📍 Localização incluída
          </div>
        )}

        {/* ANÔNIMO */}
        {data.anonimo && (
          <div className="text-yellow-500">
            🔒 Manifestação anônima
          </div>
        )}
      </div>

      {/* ERRO */}
      {erro && (
        <p className="text-red-500 text-sm" role="alert">
          {erro}
        </p>
      )}

      {/* AÇÕES */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={enviando}
          className="flex-1 border border-gray-500 text-gray-300 py-2 rounded disabled:opacity-50"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={enviarManifestacao}
          disabled={enviando}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Enviar manifestação"}
        </button>
      </div>
    </div>
  );
}
