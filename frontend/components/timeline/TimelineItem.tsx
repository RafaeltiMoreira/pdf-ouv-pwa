type Props = {
  status: string;
  descricao: string;
  data: string;
  isLast?: boolean;
};

export default function TimelineItem({
  status,
  descricao,
  data,
  isLast,
}: Props) {
  return (
    <div className="flex gap-4">
      {/* LINHA + BOLINHA */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
        {!isLast && (
          <div className="flex-1 w-px bg-gray-600 mt-1" />
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="pb-6">
        <p className="text-sm font-medium">{status}</p>
        <p className="text-sm text-gray-400">
          {descricao}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(data).toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
