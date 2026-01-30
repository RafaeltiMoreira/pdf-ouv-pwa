import { axiosInstance } from "./apiHttp";

export type CriarManifestacaoDTO = {
  assunto: string;
  conteudo: string;
  anonimo: boolean;
  cidadao?: {
    nome: string;
    email: string;
  };
  latitude?: string;
  longitude?: string;
  audio?: File;
  anexos?: File[];
};

export async function criarManifestacao(
  data: CriarManifestacaoDTO
): Promise<{ protocolo: string }> {
  const formData = new FormData();

  formData.append("assunto", data.assunto);
  formData.append("conteudo", data.conteudo);
  formData.append("anonimo", String(data.anonimo));

  if (data.latitude && data.longitude) {
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));
  }

  // Adiciona dados do cidadão se não for anônimo
  if (!data.anonimo && data.cidadao) {
    formData.append('cidadao[nome]', data.cidadao.nome);
    formData.append('cidadao[email]', data.cidadao.email);
  }

  if (data.audio) {
    formData.append("audio", data.audio);
  }

  data.anexos?.forEach((file) => {
    formData.append("anexos", file);
  });

  const response = await axiosInstance.post(
    "/manifestacoes",
    formData,
  );
  return response.data;
}
