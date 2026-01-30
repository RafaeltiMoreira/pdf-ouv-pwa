export type CriarManifestacaoDTO = {
  assunto: string;
  conteudo: string;
  anonimo: boolean;
  cidadao?: {
    nome: string;
    email: string;
  };

  // localização (opcional)
  latitude?: string;
  longitude?: string;

  // arquivos
  audio?: File;
  anexos?: File[];
};
