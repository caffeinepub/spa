import { ArrowLeftRight } from 'lucide-react';

const conversions = [
  { from: '1 Hectare', to: '10,000 m²', note: 'Standard metric unit' },
  { from: '1 Acre', to: '4,046.86 m²', note: 'Imperial/US unit' },
  { from: '1 Acre', to: '0.4047 Hectares', note: 'Acres to hectares' },
  { from: '1 Hectare', to: '2.471 Acres', note: 'Hectares to acres' },
  { from: '1 km', to: '1,000 m', note: 'Distance conversion' },
  { from: '1 mile', to: '1,609.34 m', note: 'Imperial distance' },
];

export default function UnitConversions() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <ArrowLeftRight className="w-4 h-4 text-primary" />
        <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">
          Unit Conversions
        </h2>
      </div>
      <div className="space-y-2">
        {conversions.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{c.from}</span>
              <span className="text-muted-foreground text-xs">=</span>
              <span className="text-sm font-semibold text-primary">{c.to}</span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{c.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
