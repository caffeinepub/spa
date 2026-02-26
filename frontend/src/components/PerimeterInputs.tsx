import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PerimeterForm {
  wheelCircumference: string;
  rotationCount: string;
}

interface PerimeterInputsProps {
  form: PerimeterForm;
  onChange: (form: PerimeterForm) => void;
  errors: Record<string, string>;
}

export default function PerimeterInputs({ form, onChange, errors }: PerimeterInputsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="peri-circumference" className="text-sm font-medium">
          Wheel Circumference (m)
        </Label>
        <Input
          id="peri-circumference"
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
        <Label htmlFor="peri-rotations" className="text-sm font-medium">
          Rotation Count
        </Label>
        <Input
          id="peri-rotations"
          type="number"
          inputMode="decimal"
          placeholder="e.g. 200"
          value={form.rotationCount}
          onChange={(e) => onChange({ ...form, rotationCount: e.target.value })}
          className={`h-12 text-base ${errors.rotationCount ? 'border-destructive' : ''}`}
        />
        {errors.rotationCount && (
          <p className="text-destructive text-xs mt-1">{errors.rotationCount}</p>
        )}
      </div>
    </div>
  );
}
