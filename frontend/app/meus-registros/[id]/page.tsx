"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarRegistroPorId } from "@/services/registros";
import Timeline from "@/components/timeline/Timeline";
import Respostas from "@/components/respostas/Respostas";

type ManifestacaoDetalhe = {
  id: string;
  protocolo: string;
  assunto: string;
  conteudo: string;
  status: string;
  createdAt: string;
  prazoResposta?: string;
  anexos: {
    id: string;
    tipo: string;
    nomeOriginal: string;
  }[];
  cidadao?: {
    nome: string;
    email: string;
  };
};

export default function DetalheManifestacaoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [registro, setRegistro] =
    useState<ManifestacaoDetalhe | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarRegistroPorId(id);
        setRegistro(data);
      } catch {
        setErro("Não foi possível carregar a manifestação.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Carregando manifestação...</p>
      </main>
    );
  }

  if (erro || !registro) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{erro}</p>
      </main>
    );
  }

  const eventosMock = [
    {
      id: "1",
      status: "Recebida",
      descricao: "Manifestação registrada pelo cidadão.",
      data: "2026-01-28T10:15:00",
    },
    {
      id: "2",
      status: "Em análise",
      descricao: "Encaminhada para o órgão responsável.",
      data: "2026-01-29T09:40:00",
    },
  ];

  const respostasMock = [
    {
      id: "r1",
      mensagem:
        "Informamos que sua manifestação foi analisada e encaminhada à unidade responsável. O prazo para resposta é de até 30 dias.",
      autor: "Ouvidoria-Geral do DF",
      data: "2026-01-30T14:20:00",
      anexos: [],
    },
  ];

  return (
    <main className="min-h-screen px-4 py-8 flex justify-center">
      <section className="w-full max-w-2xl space-y-6">
        {/* CABEÇALHO */}
        <div className="rounded border border-gray-700 bg-gray-900 p-4 space-y-1">
          <h1 className="text-lg font-semibold">
            {registro.assunto}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span>
              Protocolo: <strong className="text-gray-200">{registro.protocolo}</strong>
            </span>

            <span className="px-2 py-0.5 rounded bg-gray-800 text-xs">
              {registro.status}
            </span>

            <span>
              Registrado em{" "}
              {new Date(registro.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div>
          <h2 className="font-medium mb-1">Descrição</h2>
          <p className="whitespace-pre-line text-sm">
            {registro.conteudo}
          </p>
        </div>

        {/* ANEXOS */}
        <div>
          <h2 className="font-medium mb-1">Anexos</h2>

          {registro.anexos.length === 0 ? (
            <p className="text-sm text-gray-400">
              Nenhum anexo enviado.
            </p>
          ) : (
            <ul className="list-disc pl-5 text-sm">
              {registro.anexos.map((anexo) => (
                <li key={anexo.id}
                  className="text-sm text-blue-400 hover:underline cursor-pointer"
                >
                  {anexo.nomeOriginal} ({anexo.tipo})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CIDADÃO (SE NÃO ANÔNIMO) */}
        {registro.cidadao && (
          <div>
            <h2 className="font-medium mb-1">
              Dados do cidadão
            </h2>
            <p className="text-sm">
              {registro.cidadao.nome} —{" "}
              {registro.cidadao.email}
            </p>
          </div>
        )}

        <Timeline eventos={eventosMock} />
        <Respostas respostas={respostasMock} />


        {/* AÇÕES */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-gray-600 text-gray-300 px-4 py-2 rounded hover:bg-gray-800"
          >
            Voltar para acompanhar meus registros
          </button>
        </div>
      </section>
    </main>
  );
}
