"use client";

import { useState, useEffect, useCallback } from "react";
import { useCidadao } from "@/components/providers/cidadao-provider";
import { useRouter } from "next/navigation";
import Stepper from "@/components/stepper/Stepper";
import StepDados from "./steps/StepDados";
import StepAnexos from "./steps/StepAnexos";
import StepRevisao from "./steps/StepRevisao";
import ManifestacaoSucesso from "@/components/success/ManifestacaoSucesso";
import Header from "@/components/layout/Header";
import { Loader2, ShieldCheck } from "lucide-react";

export type ManifestacaoForm = {
  assunto: string;
  conteudo: string;
  audioBlob: Blob | null;
  audioMimeType: string;
  anexos: File[];
  localizacao?: {
    lat: string;
    lng: string;
  };
  anonimo: boolean;
  cidadao?: {
    nome: string;
    email: string;
  };
};

type DraftData = {
  assunto: string;
  conteudo: string;
  audioBlob: Blob | null;
  audioMimeType: string;
  anexos: File[];
  anonimo: boolean;
  localizacao?: {
    lat: string;
    lng: string;
  };
}

const initialDraft: DraftData = {
  assunto: "",
  conteudo: "",
  audioBlob: null,
  audioMimeType: "",
  anexos: [],
  anonimo: false,
  localizacao: undefined,
};

export default function ManifestacaoPage() {
  const { cidadao, loading: cidadaoLoading } = useCidadao();
  const router = useRouter();

  const [step, setStep] = useState(2); // 2 = Relato
  const [protocolo, setProtocolo] = useState<string | null>(null);
  const [draftData, setDraftData] = useState(initialDraft);

  // Derivando estado em vez de sincronizar com Effect
  const fullForm: ManifestacaoForm = {
    ...draftData,
    cidadao: cidadao ? { nome: cidadao.nome, email: cidadao.email } : undefined,
  };

  const handleDraftChange = useCallback((changes: Partial<DraftData>) => {
    setDraftData(prev => ({ ...prev, ...changes }));
  }, []);

  // Efeito para proteger a rota
  useEffect(() => {
    if (!cidadaoLoading && !cidadao) {
      router.replace("/");
    }
  }, [cidadao, cidadaoLoading, router]);

  if (cidadaoLoading || !cidadao) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </main>
      </div>
    )
  }

  /* ===============================
     SUCESSO (NÃO MOSTRA STEPPER)
     =============================== */
  if (protocolo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center px-4 py-8">
          <ManifestacaoSucesso
            protocolo={protocolo}
            novaManifestacao={() => {
              setProtocolo(null);
              setStep(2);
              setDraftData(initialDraft);
            }}
          />
        </main>
      </div>
    );
  }

  /* ===============================
     FLUXO NORMAL COM STEPPER
     =============================== */
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center px-4 py-8">
        <section className="w-full max-w-2xl bg-card p-6 sm:p-8 rounded-2xl shadow-lg border border-border">
          <Stepper currentStep={step} />

          {step === 2 && (
            <StepDados
              data={fullForm}
              onChange={handleDraftChange}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <StepAnexos
              data={fullForm}
              onChange={handleDraftChange}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && (
            <StepRevisao
              data={fullForm}
              onBack={() => setStep(3)}
              onSuccess={(newProtocolo) => setProtocolo(newProtocolo)}
            />
          )}

          {/* LGPD Notice */}
          <p className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border flex items-center justify-center gap-1">
            <ShieldCheck className="h-4 w-4" /> Dados estão protegidos pela Lei Geral de Proteção de Dados (LGPD).
          </p>
        </section>
      </main>
    </div>
  );
}
