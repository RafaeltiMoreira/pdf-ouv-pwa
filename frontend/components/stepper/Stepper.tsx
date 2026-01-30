import { Check } from "lucide-react";

type Step = {
  id: number;
  label: string;
};

const steps: Step[] = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Relato" },
  { id: 3, label: "Anexos" },
  { id: 4, label: "Revisão" },
];

type Props = {
  currentStep: number;
};

export default function Stepper({ currentStep }: Props) {
  return (
    <nav aria-label="Progresso" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const ativo = step.id === currentStep;
          const concluido = step.id < currentStep;

          return (
            <li key={step.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-2">
                {/* Circle indicator */}
                <div
                  className={`
                    relative flex h-10 w-10 items-center justify-center rounded-full 
                    text-sm font-semibold transition-all duration-300
                    ${concluido
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : ativo
                        ? "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  aria-current={ativo ? "step" : undefined}
                >
                  {concluido ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    text-xs font-medium text-center whitespace-nowrap transition-colors
                    ${ativo
                      ? "text-primary"
                      : concluido
                        ? "text-accent"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Linha de conexão */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-3 h-0.5 rounded-full transition-colors duration-300 self-start mt-5">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-500
                      ${step.id < currentStep
                        ? "bg-accent"
                        : "bg-border"
                      }
                    `}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
