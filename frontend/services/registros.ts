import { apiHttp } from "./apiHttp";

/**
 * Tipos alinhados ao backend
 */
export type RegistroResumo = {
  id: string;
  protocolo: string;
  assunto: string;
  status: string;
  createdAt: string;
};

export type ListaRegistrosResponse = {
  data: RegistroResumo[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/**
 * Listar manifestações (Acompanhar meus registros)
 */
export async function listarRegistros(params?: {
  page?: number;
  limit?: number;
  status?: string;
  protocolo?: string;
}): Promise<ListaRegistrosResponse> {
  const response = await apiHttp.get<ListaRegistrosResponse>(
    "/manifestacoes",
    { params }
  );
  return response.data;
}

/**
 * Buscar por protocolo (detalhe)
 */
export async function buscarRegistroPorProtocolo(
  protocolo: string
) {
  const response = await apiHttp.get(
    `/manifestacoes/protocolo/${protocolo}`
  );
  return response.data;
}

export async function buscarRegistroPorId(id: string) {
  const response = await apiHttp.get(
    `/manifestacoes/${id}`
  );
  return response.data;
}
