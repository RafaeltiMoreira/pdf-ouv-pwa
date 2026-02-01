import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1",
  withCredentials: true,
  timeout: 30000,
});

// Interceptor para tratar erros de autenticação (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // A URL da requisição que falhou
    const failedUrl = error.config.url;

    if (
      typeof window !== "undefined" &&
      error.response?.status === 401
    ) {
      // Evita o loop de redirecionamento na página de admin.
      // A chamada para /admin/me é esperada falhar se o usuário não estiver logado,
      // e o AdminProvider já trata esse caso.
      if (failedUrl?.endsWith("/admin/me")) {
        return Promise.reject(error);
      }
      
      // Para qualquer outra falha 401, o usuário está tentando fazer uma ação
      // não autorizada e deve ser deslogado.
      window.location.href = "/admin";
    }

    return Promise.reject(error);
  },
);
