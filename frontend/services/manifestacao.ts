import axios from "axios";
import { CriarManifestacaoDTO } from "@/types/manifestacao";

export async function criarManifestacao(
  data: CriarManifestacaoDTO
) {
  const formData = new FormData();

  formData.append("assunto", data.assunto);
  formData.append("conteudo", data.conteudo);
  formData.append("anonimo", String(data.anonimo));

  if (data.latitude && data.longitude) {
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));
  }

  if (data.audio) {
    formData.append("audio", data.audio);
  }

  data.anexos?.forEach((file) => {
    formData.append("anexos", file);
  });

  const response = await axios.post(
    "/manifestacoes",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
