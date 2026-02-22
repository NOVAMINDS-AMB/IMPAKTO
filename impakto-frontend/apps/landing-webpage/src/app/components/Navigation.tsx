import { Building2, User } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
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
            
            <Button 
              variant="ghost" 
              className="text-slate-700 hover:text-blue-900 hover:bg-blue-50"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">MSME Login</span>
              <span className="sm:hidden">Login</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Institution Login</span>
              <span className="sm:hidden">MFI</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
