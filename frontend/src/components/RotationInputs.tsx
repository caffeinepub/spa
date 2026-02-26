import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RotationForm {
  wheelCircumference: string;
  rotationCount: string;
  shape: 'square' | 'rectangle';
  width: string;
}

interface RotationInputsProps {
  form: RotationForm;
  onChange: (form: RotationForm) => void;
  errors: Record<string, string>;
}

export default function RotationInputs({ form, onChange, errors }: RotationInputsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="rot-circumference" className="text-sm font-medium">
          Wheel Circumference (m)
        </Label>
        <Input
          id="rot-circumference"
          type="number"
          inputMode="decimal"
          placeholder="e.g. 1.88"
          value={form.wheelCircumference}
          onChange={(e) => onChange({ ...form, wheelCircumference: e.target.value })}
          className={`h-12 text-base ${errors.wheelCircumference ? 'border-destructive' : ''}`}
        />
        {errors.wheelCircumference && (
          <p className="text-destructive text-xs mt-1">{errors.wheelCircumference}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="rot-count" className="text-sm font-medium">
          Rotation Count
        </Label>
        <Input
          id="rot-count"
          type="number"
          inputMode="decimal"
          placeholder="e.g. 500"
          value={form.rotationCount}
          onChange={(e) => onChange({ ...form, rotationCount: e.target.value })}
          className={`h-12 text-base ${errors.rotationCount ? 'border-destructive' : ''}`}
        />
        {errors.rotationCount && (
          <p className="text-destructive text-xs mt-1">{errors.rotationCount}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium">Field Shape</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...form, shape: 'square' })}
            className={`h-11 rounded-lg border-2 text-sm font-semibold transition-all ${
              form.shape === 'square'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Square
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...form, shape: 'rectangle' })}
            className={`h-11 rounded-lg border-2 text-sm font-semibold transition-all ${
              form.shape === 'rectangle'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Rectangle
          </button>
        </div>
      </div>

      {form.shape === 'rectangle' && (
        <div className="space-y-1">
          <Label htmlFor="rot-width" className="text-sm font-medium">
            Field Width (m)
          </Label>
          <Input
            id="rot-width"
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
      )}
    </div>
  );
}
