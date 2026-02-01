import { ManifestacaoStatus } from "@/components/status/StatusBadge";

export type ManifestacaoAdmin = {
  id: string;
  protocolo: string;
  assunto: string;
  conteudo: string;
  status: ManifestacaoStatus;
  anonimo: boolean;
  createdAt: string;

  cidadao?: {
    nome: string;
    email: string;
  };

  anexos: {
    id: string;
    nomeOriginal: string;
    tipo: string;
  }[];

  respostas: {
    id: string;
    conteudo: string;
    createdAt: string;
    usuario: {
      nome: string;
      email: string;
    };
  }[];
};
