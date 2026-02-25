import { ArrowRight, Shield, Users } from 'lucide-react';
import { Button } from "@impakto/ui/src/ui_components/button";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Institutional-Grade Infrastructure</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Building the{' '}
              <span className="bg-gradient-to-r from-blue-700 via-teal-500 to-green-500 bg-clip-text text-transparent">
                Financial Trust Layer
              </span>{' '}
              {/* <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 bg-clip-text text-transparent">
                Financial Trust Layer
              </span>{' '} */}
              for Africa
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Impakto empowers individuals and businesses to securely generate, control and present their financial story; bridging the informal economy with formal capital through verifiable trust infrastructure.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://app.impakto.systems" className="inline-block">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-500 text-white group"
              >
                <Users className="w-5 h-5 mr-2" />
                Access MSME Portal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </a>
              
              <a href="https://mfi.impakto.systems" className="inline-block">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-blue-900 text-white group hover:bg-blue-700 hover:text-white group"
              >
                <Shield className="w-5 h-5 mr-2" />
                Access MFI Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-blue-900">100+</div>
                <div className="text-sm text-slate-600">MSMEs Empowered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">5+</div>
                <div className="text-sm text-slate-600">Partner Institutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">99.9%</div>
                <div className="text-sm text-slate-600">Uptime SLA</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="./Hero_Section.png"
                alt="African business professional using technology"
                className="w-full h-auto"
              />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-600">Trust Score</div>
                    <div className="text-2xl font-bold text-green-600">720</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Verification</div>
                    <div className="text-sm font-semibold text-blue-900">Real-time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
