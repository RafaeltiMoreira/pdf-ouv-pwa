import TimelineItem from "./TimelineItem";
import { TimelineEvento } from "./types";

type Props = {
  eventos: TimelineEvento[];
};

export default function Timeline({ eventos }: Props) {
  return (
    <div className="mt-6">
      <h2 className="font-medium mb-4">
        Histórico da manifestação
      </h2>

      <div className="space-y-2">
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
