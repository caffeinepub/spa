import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Calculator } from 'lucide-react';
import ShapeSelector from './ShapeSelector';
import RectangleInputs from './RectangleInputs';
import SquareInputs from './SquareInputs';
import IrregularInputs from './IrregularInputs';
import RotationInputs from './RotationInputs';
import PerimeterInputs from './PerimeterInputs';
import ResultsDisplay from './ResultsDisplay';
import {
  useCalculatePerimeter,
  useCalculateRectangleArea,
  useCalculateSquareArea,
  useCalculateIrregularArea,
  useCalculateAreaFromRotations,
} from '../hooks/useQueries';

export type FieldShape = 'rectangle' | 'square' | 'irregular' | 'rotation';

interface PerimeterForm {
  wheelCircumference: string;
  rotationCount: string;
}

interface RectangleForm {
  length: string;
  width: string;
}

interface SquareForm {
  side: string;
}

interface Triangle {
  base: string;
  height: string;
}

interface RotationForm {
  wheelCircumference: string;
  rotationCount: string;
  shape: 'square' | 'rectangle';
  width: string;
}

interface Results {
  area?: number;
  perimeter?: number;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function FieldCalculator() {
  const [activeShape, setActiveShape] = useState<FieldShape>('rectangle');
  const [perimeterForm, setPerimeterForm] = useState<PerimeterForm>({
    wheelCircumference: '',
    rotationCount: '',
  });
  const [rectangleForm, setRectangleForm] = useState<RectangleForm>({
    length: '',
    width: '',
  });
  const [squareForm, setSquareForm] = useState<SquareForm>({ side: '' });
  const [triangles, setTriangles] = useState<Triangle[]>([{ base: '', height: '' }]);
  const [rotationForm, setRotationForm] = useState<RotationForm>({
    wheelCircumference: '',
    rotationCount: '',
    shape: 'square',
    width: '',
  });
  const [results, setResults] = useState<Results>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const perimeterMutation = useCalculatePerimeter();
  const rectangleMutation = useCalculateRectangleArea();
  const squareMutation = useCalculateSquareArea();
  const irregularMutation = useCalculateIrregularArea();
  const rotationMutation = useCalculateAreaFromRotations();

  const isLoading =
    perimeterMutation.isPending ||
    rectangleMutation.isPending ||
    squareMutation.isPending ||
    irregularMutation.isPending ||
    rotationMutation.isPending;

  function validatePerimeter(): boolean {
    const errs: ValidationErrors = {};
    if (!perimeterForm.wheelCircumference || isNaN(Number(perimeterForm.wheelCircumference)) || Number(perimeterForm.wheelCircumference) <= 0) {
      errs.wheelCircumference = 'Enter a valid wheel circumference (> 0)';
    }
    if (!perimeterForm.rotationCount || isNaN(Number(perimeterForm.rotationCount)) || Number(perimeterForm.rotationCount) <= 0) {
      errs.rotationCount = 'Enter a valid rotation count (> 0)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateRectangle(): boolean {
    const errs: ValidationErrors = {};
    if (!rectangleForm.length || isNaN(Number(rectangleForm.length)) || Number(rectangleForm.length) <= 0) {
      errs.length = 'Enter a valid length (> 0)';
    }
    if (!rectangleForm.width || isNaN(Number(rectangleForm.width)) || Number(rectangleForm.width) <= 0) {
      errs.width = 'Enter a valid width (> 0)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateSquare(): boolean {
    const errs: ValidationErrors = {};
    if (!squareForm.side || isNaN(Number(squareForm.side)) || Number(squareForm.side) <= 0) {
      errs.side = 'Enter a valid side length (> 0)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateIrregular(): boolean {
    const errs: ValidationErrors = {};
    triangles.forEach((t, i) => {
      if (!t.base || isNaN(Number(t.base)) || Number(t.base) <= 0) {
        errs[`base_${i}`] = 'Enter a valid base (> 0)';
      }
      if (!t.height || isNaN(Number(t.height)) || Number(t.height) <= 0) {
        errs[`height_${i}`] = 'Enter a valid height (> 0)';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateRotation(): boolean {
    const errs: ValidationErrors = {};
    if (!rotationForm.wheelCircumference || isNaN(Number(rotationForm.wheelCircumference)) || Number(rotationForm.wheelCircumference) <= 0) {
      errs.wheelCircumference = 'Enter a valid wheel circumference (> 0)';
    }
    if (!rotationForm.rotationCount || isNaN(Number(rotationForm.rotationCount)) || Number(rotationForm.rotationCount) <= 0) {
      errs.rotationCount = 'Enter a valid rotation count (> 0)';
    }
    if (rotationForm.shape === 'rectangle') {
      if (!rotationForm.width || isNaN(Number(rotationForm.width)) || Number(rotationForm.width) <= 0) {
        errs.width = 'Enter a valid width (> 0)';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleCalculate() {
    setResults({});

    if (activeShape === 'rectangle') {
      if (!validateRectangle()) return;
      const area = await rectangleMutation.mutateAsync({
        length: Number(rectangleForm.length),
        width: Number(rectangleForm.width),
      });
      setResults({ area });
    } else if (activeShape === 'square') {
      if (!validateSquare()) return;
      const area = await squareMutation.mutateAsync({
        side: Number(squareForm.side),
      });
      setResults({ area });
    } else if (activeShape === 'irregular') {
      if (!validateIrregular()) return;
      const area = await irregularMutation.mutateAsync({
        triangles: triangles.map((t) => [Number(t.base), Number(t.height)] as [number, number]),
      });
      setResults({ area });
    } else if (activeShape === 'rotation') {
      if (!validateRotation()) return;
      const area = await rotationMutation.mutateAsync({
        wheelCircumference: Number(rotationForm.wheelCircumference),
        rotationCount: Number(rotationForm.rotationCount),
        shape: rotationForm.shape,
        width: rotationForm.shape === 'rectangle' ? Number(rotationForm.width) : undefined,
      });
      const perimeter = Number(rotationForm.wheelCircumference) * Number(rotationForm.rotationCount);
      setResults({ area, perimeter });
    }
  }

  async function handlePerimeterCalculate() {
    if (!validatePerimeter()) return;
    const perimeter = await perimeterMutation.mutateAsync({
      wheelCircumference: Number(perimeterForm.wheelCircumference),
      rotationCount: Number(perimeterForm.rotationCount),
    });
    setResults((prev) => ({ ...prev, perimeter }));
  }

  function handleShapeChange(shape: FieldShape) {
    setActiveShape(shape);
    setResults({});
    setErrors({});
  }

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary text-xl">
          <Calculator className="w-5 h-5" />
          Field Area Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Shape Selector */}
        <ShapeSelector activeShape={activeShape} onShapeChange={handleShapeChange} />

        {/* Inputs based on shape */}
        {activeShape === 'rectangle' && (
          <div className="space-y-4">
            <RectangleInputs
              form={rectangleForm}
              onChange={setRectangleForm}
              errors={errors}
            />
            <Button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {rectangleMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</>
              ) : (
                'Calculate Area'
              )}
            </Button>
          </div>
        )}

        {activeShape === 'square' && (
          <div className="space-y-4">
            <SquareInputs
              form={squareForm}
              onChange={setSquareForm}
              errors={errors}
            />
            <Button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {squareMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</>
              ) : (
                'Calculate Area'
              )}
            </Button>
          </div>
        )}

        {activeShape === 'irregular' && (
          <div className="space-y-4">
            <IrregularInputs
              triangles={triangles}
              onChange={setTriangles}
              errors={errors}
            />
            <Button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {irregularMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</>
              ) : (
                'Calculate Area'
              )}
            </Button>
          </div>
        )}

        {activeShape === 'rotation' && (
          <div className="space-y-4">
            <RotationInputs
              form={rotationForm}
              onChange={setRotationForm}
              errors={errors}
            />
            <Button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {rotationMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</>
              ) : (
                'Calculate Area from Rotations'
              )}
            </Button>
          </div>
        )}

        {/* Perimeter section for non-rotation shapes */}
        {activeShape !== 'rotation' && (
          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Measure Perimeter (optional)
            </p>
            <PerimeterInputs
              form={perimeterForm}
              onChange={setPerimeterForm}
              errors={errors}
            />
            <Button
              variant="outline"
              onClick={handlePerimeterCalculate}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold border-primary text-primary hover:bg-primary/10"
            >
              {perimeterMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</>
              ) : (
                'Calculate Perimeter'
              )}
            </Button>
          </div>
        )}

        {/* Results */}
        {(results.area !== undefined || results.perimeter !== undefined) && (
          <ResultsDisplay area={results.area} perimeter={results.perimeter} />
        )}
      </CardContent>
    </Card>
  );
}
