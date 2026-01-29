import RespostaItem from "./RespostaItem";
import { RespostaManifestacao } from "./types";

type Props = {
  respostas: RespostaManifestacao[];
};

export default function Respostas({ respostas }: Props) {
  return (
    <div className="mt-8">
      <h2 className="font-medium mb-4">
        Respostas do órgão
      </h2>

      {respostas.length === 0 ? (
        <p className="text-sm text-gray-400">
          Ainda não há respostas para esta manifestação.
        </p>
      ) : (
        <div className="space-y-4">
          {respostas.map((resposta) => (
            <RespostaItem
              key={resposta.id}
              mensagem={resposta.mensagem}
              autor={resposta.autor}
              data={resposta.data}
              anexos={resposta.anexos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
