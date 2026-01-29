type Props = {
  mensagem: string;
  autor: string;
  data: string;
  anexos?: {
    id: string;
    nome: string;
  }[];
};

export default function RespostaItem({
  mensagem,
  autor,
  data,
  anexos,
}: Props) {
  return (
    <div className="border border-gray-700 rounded p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-blue-400">
          {autor}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(data).toLocaleString("pt-BR")}
        </span>
      </div>

      <p className="text-sm leading-relaxed whitespace-pre-line">
        {mensagem}
      </p>

      {anexos && anexos.length > 0 && (
        <div className="pt-2">
          <p className="text-xs text-gray-400">
            Anexos:
          </p>
          <ul className="list-disc pl-5 text-sm">
            {anexos.map((anexo) => (
              <li key={anexo.id}>
                {anexo.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}