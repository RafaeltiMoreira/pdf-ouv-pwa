import { axiosInstance } from "@/services/apiHttp";
import { AdminUser } from "@/components/providers/admin-provider";
import { ManifestacaoStatus } from "@/components/status/StatusBadge";

export async function adminLogin(
  email: string,
  senha: string
): Promise<AdminUser> {
  const res = await axiosInstance.post("/admin/login", { email, senha });
  return res.data;
}

export async function adminLogout(): Promise<void> {
  await axiosInstance.post("/admin/logout");
}

export async function getAdminMe(): Promise<AdminUser> {
  const res = await axiosInstance.get("/admin/me");
  return res.data;
}

export async function listarManifestacoesAdmin() {
  const res = await axiosInstance.get("/admin/manifestacoes");
  return res.data;
}

export async function atualizarStatusManifestacao(
  id: string,
  status: ManifestacaoStatus
) {
  await axiosInstance.patch(`/admin/manifestacoes/${id}/status`, { status });
}

export async function responderManifestacao(
  id: string,
  conteudo: string
) {
  await axiosInstance.post(`/admin/manifestacoes/${id}/responder`, {
    conteudo,
  });
}
