import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SquareForm {
  side: string;
}

interface SquareInputsProps {
  form: SquareForm;
  onChange: (form: SquareForm) => void;
  errors: Record<string, string>;
}

export default function SquareInputs({ form, onChange, errors }: SquareInputsProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor="square-side" className="text-sm font-medium">
        Side Length (m)
      </Label>
      <Input
        id="square-side"
        type="number"
        inputMode="decimal"
        placeholder="e.g. 75"
        value={form.side}
        onChange={(e) => onChange({ side: e.target.value })}
        className={`h-12 text-base ${errors.side ? 'border-destructive' : ''}`}
      />
      {errors.side && (
        <p className="text-destructive text-xs mt-1">{errors.side}</p>
      )}
    </div>
  );
}
