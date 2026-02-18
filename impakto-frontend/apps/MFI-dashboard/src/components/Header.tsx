import { Home, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onHome?: () => void;
  onBack?: () => void;
  showNavigation?: boolean;
}

export function Header({ title, onHome, onBack, showNavigation = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showNavigation && (
            <div className="flex gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {onHome && (
                <button
                  onClick={onHome}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Go to home"
                >
                  <Home className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          )}
          <h1>{title}</h1>
        </div>
      </div>
    </header>
  );
}
