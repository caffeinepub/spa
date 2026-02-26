import { BookOpen } from 'lucide-react';

const formulas = [
  {
    name: 'Perimeter',
    formula: 'Perimeter = Wheel Circumference × Rotation Count',
    example: 'e.g. 1.88m × 500 = 940m',
  },
  {
    name: 'Rectangle Area',
    formula: 'Area = Length × Width',
    example: 'e.g. 100m × 50m = 5,000 m²',
  },
  {
    name: 'Square Area',
    formula: 'Area = Side²',
    example: 'e.g. 75m² = 5,625 m²',
  },
  {
    name: 'Irregular Area',
    formula: 'Area = Σ (0.5 × Base × Height)',
    example: 'Sum of all triangle areas',
  },
  {
    name: 'Rotation-Based Area (Square)',
    formula: 'Side = Total Distance ÷ 4, Area = Side²',
    example: 'e.g. 940m ÷ 4 = 235m, 235² = 55,225 m²',
  },
  {
    name: 'Rotation-Based Area (Rectangle)',
    formula: 'Length = (Perimeter − 2 × Width) ÷ 2, Area = Length × Width',
    example: 'e.g. (940 − 2×50) ÷ 2 = 420m, 420×50 = 21,000 m²',
  },
];

export default function FormulaReference() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">
          Formula Reference
        </h2>
      </div>
      <div className="space-y-2">
        {formulas.map((f, i) => (
          <div
            key={i}
            className="bg-muted/50 rounded-xl p-3 space-y-1"
          >
            <p className="text-xs font-bold text-primary uppercase tracking-wide">
              {f.name}
            </p>
            <p className="text-sm font-mono text-foreground">{f.formula}</p>
            <p className="text-xs text-muted-foreground">{f.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
