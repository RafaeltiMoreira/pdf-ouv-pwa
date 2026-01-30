import TimelineItem from "./TimelineItem";
import { TimelineEvento } from "./types";
import { History } from "lucide-react";

type Props = {
  eventos: TimelineEvento[];
};

export default function Timeline({ eventos }: Props) {
  return (
    <div>
      <h2 className="font-medium text-card-foreground mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-primary" />
        Histórico da manifestação
      </h2>

      <div className="space-y-1">
        {eventos.map((evento, index) => (
          <TimelineItem
            key={evento.id}
            status={evento.status}
            descricao={evento.descricao}
            data={evento.data}
            isLast={index === eventos.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
