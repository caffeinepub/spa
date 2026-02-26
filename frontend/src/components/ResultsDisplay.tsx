import { CheckCircle2 } from 'lucide-react';

interface ResultsDisplayProps {
  area?: number;
  perimeter?: number;
}

function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const SQ_M_TO_ACRES = 1 / 4046.8564224;
const SQ_M_TO_HECTARES = 1 / 10000;

export default function ResultsDisplay({ area, perimeter }: ResultsDisplayProps) {
  const acres = area !== undefined ? area * SQ_M_TO_ACRES : undefined;
  const hectares = area !== undefined ? area * SQ_M_TO_HECTARES : undefined;
  const perimeterKm = perimeter !== undefined ? perimeter / 1000 : undefined;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-primary font-semibold">
        <CheckCircle2 className="w-5 h-5" />
        <span>Results</span>
      </div>

      {area !== undefined && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Area
          </p>
          {/* Acres - highlighted */}
          <div className="bg-primary text-primary-foreground rounded-xl p-3 text-center">
            <p className="text-3xl font-bold">{formatNumber(acres!, 4)}</p>
            <p className="text-sm opacity-80 mt-0.5">Acres</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">{formatNumber(area)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">m²</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">{formatNumber(hectares!, 4)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Hectares</p>
            </div>
          </div>
        </div>
      )}

      {perimeter !== undefined && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Perimeter
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">{formatNumber(perimeter)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Meters</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">{formatNumber(perimeterKm!, 3)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Kilometers</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
