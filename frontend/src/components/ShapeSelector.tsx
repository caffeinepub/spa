import { Square, RectangleHorizontal, Shapes, RotateCcw } from 'lucide-react';
import { FieldShape } from './FieldCalculator';

interface ShapeSelectorProps {
  activeShape: FieldShape;
  onShapeChange: (shape: FieldShape) => void;
}

const shapes: { id: FieldShape; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'rectangle',
    label: 'Rectangle',
    icon: <RectangleHorizontal className="w-5 h-5" />,
    description: 'Length × Width',
  },
  {
    id: 'square',
    label: 'Square',
    icon: <Square className="w-5 h-5" />,
    description: 'Side²',
  },
  {
    id: 'irregular',
    label: 'Irregular',
    icon: <Shapes className="w-5 h-5" />,
    description: 'Triangle method',
  },
  {
    id: 'rotation',
    label: 'Rotation Count',
    icon: <RotateCcw className="w-5 h-5" />,
    description: 'Wheel rotations',
  },
];

export default function ShapeSelector({ activeShape, onShapeChange }: ShapeSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">Select Field Shape</p>
      <div className="grid grid-cols-2 gap-2">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onShapeChange(shape.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-150 text-left ${
              activeShape === shape.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              {shape.icon}
              <span className="font-semibold text-sm">{shape.label}</span>
            </div>
            <span className="text-xs w-full opacity-70">{shape.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
