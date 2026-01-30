import { CheckCircle } from "lucide-react";

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
        <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
          <CheckCircle className="h-4 w-4 text-accent" />
        </div>
        {!isLast && (
          <div className="flex-1 w-0.5 bg-border mt-2" />
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="pb-6 flex-1">
        <p className="text-sm font-medium text-card-foreground">{status}</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {descricao}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(data).toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
