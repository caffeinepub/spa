import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FieldCalculator from './components/FieldCalculator';
import ConsiderationsPanel from './components/ConsiderationsPanel';
import FormulaReference from './components/FormulaReference';
import UnitConversions from './components/UnitConversions';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-primary shadow-md">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <img
              src="/assets/generated/app-logo.dim_256x256.png"
              alt="SPA Field Measure Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-primary-foreground font-bold text-lg leading-tight">
                SPA Field Measure
              </h1>
              <p className="text-primary-foreground/70 text-xs">
                Land Area Calculator
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Calculator */}
          <section>
            <FieldCalculator />
          </section>

          {/* Tips */}
          <section>
            <ConsiderationsPanel />
          </section>

          {/* Formula Reference */}
          <section>
            <FormulaReference />
          </section>

          {/* Unit Conversions */}
          <section>
            <UnitConversions />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted border-t border-border mt-8">
          <div className="max-w-2xl mx-auto px-4 py-6 text-center space-y-2">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SPA Field Measure. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              Built with{' '}
              <span className="text-accent">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'spa-field-measure')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
