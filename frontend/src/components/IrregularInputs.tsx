import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Triangle {
  base: string;
  height: string;
}

interface IrregularInputsProps {
  triangles: Triangle[];
  onChange: (triangles: Triangle[]) => void;
  errors: Record<string, string>;
}

export default function IrregularInputs({ triangles, onChange, errors }: IrregularInputsProps) {
  function addTriangle() {
    onChange([...triangles, { base: '', height: '' }]);
  }

  function removeTriangle(index: number) {
    if (triangles.length === 1) return;
    onChange(triangles.filter((_, i) => i !== index));
  }

  function updateTriangle(index: number, field: 'base' | 'height', value: string) {
    const updated = triangles.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Divide your field into triangles. Enter base and height for each.
      </p>
      {triangles.map((triangle, index) => (
        <div
          key={index}
          className="bg-muted/40 rounded-xl p-3 space-y-3 border border-border"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Triangle {index + 1}
            </span>
            {triangles.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTriangle(index)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Base (m)</Label>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="e.g. 40"
                value={triangle.base}
                onChange={(e) => updateTriangle(index, 'base', e.target.value)}
                className={`h-12 text-base ${errors[`base_${index}`] ? 'border-destructive' : ''}`}
              />
              {errors[`base_${index}`] && (
                <p className="text-destructive text-xs">{errors[`base_${index}`]}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Height (m)</Label>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="e.g. 30"
                value={triangle.height}
                onChange={(e) => updateTriangle(index, 'height', e.target.value)}
                className={`h-12 text-base ${errors[`height_${index}`] ? 'border-destructive' : ''}`}
              />
              {errors[`height_${index}`] && (
                <p className="text-destructive text-xs">{errors[`height_${index}`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={addTriangle}
        className="w-full h-11 border-dashed border-primary/50 text-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Triangle
      </Button>
    </div>
  );
}
