export type RespostaManifestacao = {
  id: string;
  mensagem: string;
  autor: string;
  data: string;
  anexos?: {
    id: string;
    nome: string;
  }[];
};
