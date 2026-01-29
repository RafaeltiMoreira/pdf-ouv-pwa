export type CriarManifestacaoDTO = {
  assunto: string;
  conteudo: string;
  anonimo: boolean;

  // localização (opcional)
  latitude?: number;
  longitude?: number;

  // arquivos
  audio?: File;
  anexos?: File[];
};
