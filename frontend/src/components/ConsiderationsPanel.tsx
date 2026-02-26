import { AlertTriangle, Navigation, Layers } from 'lucide-react';

const tips = [
  {
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    title: 'Wheel Slip',
    description: 'Account for 2–5% wheel slip on soft or wet ground. Multiply your result by 0.95–0.98 for accuracy.',
  },
  {
    icon: <Navigation className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    title: 'Path Accuracy',
    description: 'Walk straight lines along field edges. Curved paths will overestimate the perimeter and area.',
  },
  {
    icon: <Layers className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    title: 'Irregular Fields',
    description: 'For complex shapes, divide the field into triangles and sum the areas for best accuracy.',
  },
];

export default function ConsiderationsPanel() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 space-y-3">
      <h2 className="font-semibold text-amber-800 dark:text-amber-300 text-sm uppercase tracking-wider">
        Measurement Tips
      </h2>
      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-3 items-start">
            {tip.icon}
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                {tip.title}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
