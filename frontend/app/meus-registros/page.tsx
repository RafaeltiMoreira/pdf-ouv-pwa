"use client";

import { useEffect, useState } from "react";
import { listarRegistros, RegistroResumo } from "@/services/registros";
import { useRouter } from "next/navigation";

export default function MeusRegistrosPage() {
  const [registros, setRegistros] = useState<RegistroResumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [protocoloBusca, setProtocoloBusca] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  async function carregarRegistros() {
    try {
      setLoading(true);
      setErro(null);

      const response = await listarRegistros({
        protocolo: protocoloBusca || undefined,
        status: status || undefined,
      });

      setRegistros(response.data);
    } catch {
      setErro("Não foi possível carregar seus registros.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarRegistros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 flex justify-center">
      <section className="w-full max-w-2xl space-y-6">
        <h1 className="text-xl font-semibold">
          Acompanhar meus registros
        </h1>

        {/* FILTROS */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar por protocolo"
            value={protocoloBusca}
            onChange={(e) => setProtocoloBusca(e.target.value)}
            className="flex-1 border rounded p-2"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos os status</option>
            <option value="RECEBIDA">Recebida</option>
            <option value="EM_ANALISE">Em análise</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>

          <button
            type="button"
            onClick={carregarRegistros}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-400">
            Carregando registros...
          </p>
        )}

        {/* ERRO */}
        {erro && (
          <p className="text-red-500">
            {erro}
          </p>
        )}

        {/* VAZIO */}
        {!loading && !erro && registros.length === 0 && (
          <p className="text-gray-400">
            Nenhuma manifestação encontrada.
          </p>
        )}

        {/* LISTA */}
        <ul className="space-y-3">
          {registros.map((registro) => (
            <li
              key={registro.id}
              onClick={() => router.push(`/meus-registros/${registro.id}`)}
              className="border rounded p-4 flex flex-col gap-1 cursor-pointer hover:bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {registro.assunto}
                </span>

                <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200">
                  {registro.status}
                </span>
              </div>

              <span className="text-sm text-gray-400">
                Protocolo: {registro.protocolo}
              </span>

              <span className="text-xs text-gray-500">
                Registrado em{" "}
                {new Date(registro.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
