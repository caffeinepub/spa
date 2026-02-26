import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RectangleForm {
  length: string;
  width: string;
}

interface RectangleInputsProps {
  form: RectangleForm;
  onChange: (form: RectangleForm) => void;
  errors: Record<string, string>;
}

export default function RectangleInputs({ form, onChange, errors }: RectangleInputsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="rect-length" className="text-sm font-medium">
          Length (m)
        </Label>
        <Input
          id="rect-length"
          type="number"
          inputMode="decimal"
          placeholder="e.g. 100"
          value={form.length}
          onChange={(e) => onChange({ ...form, length: e.target.value })}
          className={`h-12 text-base ${errors.length ? 'border-destructive' : ''}`}
        />
        {errors.length && (
          <p className="text-destructive text-xs mt-1">{errors.length}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="rect-width" className="text-sm font-medium">
          Width (m)
        </Label>
        <Input
          id="rect-width"
          type="number"
          inputMode="decimal"
          placeholder="e.g. 50"
          value={form.width}
          onChange={(e) => onChange({ ...form, width: e.target.value })}
          className={`h-12 text-base ${errors.width ? 'border-destructive' : ''}`}
        />
        {errors.width && (
          <p className="text-destructive text-xs mt-1">{errors.width}</p>
        )}
      </div>
    </div>
  );
}
