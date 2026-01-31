"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarRegistroPorId } from "@/services/registros";
import Timeline from "@/components/timeline/Timeline";
import Respostas from "@/components/respostas/Respostas";
import Header from "@/components/layout/Header";
import { downloadManifestationAsPdf } from "@/utils/download";
import {
  StatusBadge,
  formatManifestacaoStatus,
  ManifestacaoStatus,
} from "@/components/status/StatusBadge";
import {
  ChevronLeft,
  Printer,
  Download,
  FileText,
  Calendar,
  User,
  Paperclip,
  Loader2,
  AlertCircle,
  Clock,
  ShieldCheck
} from "lucide-react";

type Tramitacao = {
  id: string;
  statusNovo: string;
  observacao: string;
  createdAt: string;
};

type Resposta = {
  id: string;
  conteudo: string;
  createdAt: string;
  usuario: {
    nome: string;
  };
  anexos: []; // TODO: Definir tipo de anexo da resposta
};

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
  tramitacoes: Tramitacao[];
  respostas: Resposta[];
};

export default function DetalheManifestacaoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const [registro, setRegistro] =
    useState<ManifestacaoDetalhe | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      if (!id) return;
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

  function handlePrint() {
    window.print();
  }

  async function handleDownloadPDF() {
    if (!registro) return;
    downloadManifestationAsPdf(registro, (status: string) =>
      formatManifestacaoStatus(status as ManifestacaoStatus)
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </main>
      </div>
    );
  }

  if (erro || !registro) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{erro || "Manifestação não encontrada"}</span>
          </div>
        </main>
      </div>
    );
  }

  // Mapeia os dados recebidos do backend
  const eventos = registro.tramitacoes.map(t => ({
    id: t.id,
    status: t.statusNovo,
    descricao: t.observacao,
    data: t.createdAt,
  }));

  const respostas = registro.respostas.map(r => ({
    id: r.id,
    mensagem: r.conteudo,
    autor: r.usuario.nome || "Equipe da Ouvidoria",
    data: r.createdAt,
    anexos: r.anexos || [],
  }));

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 py-8 flex justify-center">
        <section className="w-full max-w-3xl space-y-6">
          <div className="flex items-center justify-between no-print">
            <button
              type="button"
              onClick={() => router.push("/meus-registros")}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-xl text-card-foreground hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar para meus registros
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-card-foreground hover:bg-muted transition-colors"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Baixar
              </button>
            </div>
          </div>

          {/* Conteúdo para impressão */}
          <div ref={printRef}>
            {/* Header Card */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <FileText className="h-5 w-5" />
                    <span className="font-mono text-sm">{registro.protocolo}</span>
                  </div>
                  <h1 className="text-xl font-semibold text-card-foreground">
                    {registro.assunto}
                  </h1>
                </div>

                <StatusBadge
                  status={registro.status as ManifestacaoStatus}
                  className="self-start"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Registrado em {new Date(registro.createdAt).toLocaleDateString("pt-BR")}
                </span>
                {registro.prazoResposta && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Prazo: {new Date(registro.prazoResposta).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h2 className="font-medium text-card-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Descrição
              </h2>
              <p className="whitespace-pre-line text-sm text-card-foreground leading-relaxed">
                {registro.conteudo}
              </p>
            </div>

            {/* Anexos */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h2 className="font-medium text-card-foreground mb-3 flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-primary" />
                Anexos
              </h2>

              {registro.anexos.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum anexo enviado.
                </p>
              ) : (
                <ul className="space-y-3">
                  {registro.anexos.map((anexo) => (
                    <li
                      key={anexo.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium leading-none">
                            {anexo.nomeOriginal}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {anexo.tipo}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`${apiUrl}/anexos/${anexo.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Baixar anexo
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dados do cidadão (se não forem anônimos) */}
            {registro.cidadao && (
              <div className="bg-card border border-border rounded-xl p-6 mt-4">
                <h2 className="font-medium text-card-foreground mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Dados do cidadão
                </h2>
                <div className="text-sm text-card-foreground">
                  <p>{registro.cidadao.nome}</p>
                  <p className="text-muted-foreground">{registro.cidadao.email}</p>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <Timeline eventos={eventos} />
            </div>

            {/* Responses */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <Respostas respostas={respostas} />
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border flex items-center justify-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Dados estão protegidos pela Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 flex gap-3 no-print" />
        </section>
      </main>
    </div>
  );
}
