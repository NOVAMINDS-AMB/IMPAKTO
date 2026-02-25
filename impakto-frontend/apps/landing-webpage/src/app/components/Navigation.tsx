import { Building2, User } from 'lucide-react';
import { Button } from "@impakto/ui/src/ui_components/button";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-white-800 to-white-700 rounded-lg flex items-center justify-center">
              <img src="./Impakto Official Logo.jpeg" alt="Impakto logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Impakto
            </span>
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 mr-4">
              <a href="#philosophy" className="text-slate-700 hover:text-blue-900 transition-colors">
                About
              </a>
              <a href="#marketplace" className="text-slate-700 hover:text-blue-900 transition-colors">
                Solutions
              </a>
            </div>
            
            {/* Link to MSME PWA (Update href to your future local/prod URL) */}
            <a href="https://app.impakto.systems" className="inline-block">
            <Button 
              variant="ghost" 
              className="text-slate-700 hover:text-green-600 hover:bg-blue-50"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">MSME Login</span>
              <span className="sm:hidden">Login</span>
            </Button>
            </a>
            
            {/* Link to MFI Dashboard (Update href to your future local/prod URL) */}
            <a href="https://mfi.impakto.systems" className="inline-block">
            <Button 
              variant="outline" 
              className="border-blue-700 text-blue-700 hover:bg-blue-600 hover:text-white"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Institution Login</span>
              <span className="sm:hidden">MFI</span>
            </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
