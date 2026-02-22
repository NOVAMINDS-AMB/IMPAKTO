import { Smartphone, Building, TrendingUp, Clock, Shield, FileText, CheckCircle2, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TwoSidedMarketplace() {
  return (
    <section id="marketplace" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A Two-Sided Marketplace Built on Trust
          </h2>
          <p className="text-lg text-slate-600">
            Impakto creates value for both sides of the financial ecosystem, reducing friction and building trust at scale
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* MSMEs Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">For MSMEs</h3>
                  <p className="text-blue-100">Primary Economic Actors</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="relative rounded-xl overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwc21hbGwlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzE3NjA5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="African entrepreneur managing small business"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Portable Financial Identity</h4>
                    <p className="text-sm text-slate-600">
                      Build your financial reputation once, use it everywhere. Your verified transaction history travels with you across institutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Real-Time Trust Scores</h4>
                    <p className="text-sm text-slate-600">
                      Watch your creditworthiness improve in real-time as you conduct business, with transparent scoring that you control and understand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Control Your Narrative</h4>
                    <p className="text-sm text-slate-600">
                      Decide what to share, when to share it, and revoke access anytime. Your data, your rules, your financial future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                <div className="flex items-center space-x-2 text-blue-900">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-semibold">Mobile-First Progressive Web App</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Access your financial profile anywhere, anytime—no app store required
                </p>
              </div>
            </div>
          </div>

          {/* MFIs Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-slate-400 transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">For MFIs</h3>
                  <p className="text-slate-300">Capital Allocation Actors</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="relative rounded-xl overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638687095222-c7897398d16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZGlnaXRhbCUyMGZpbmFuY2lhbCUyMHRydXN0fGVufDF8fHx8MTc3MTc2MDkxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital financial technology infrastructure"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Structured Financial Documentation</h4>
                    <p className="text-sm text-slate-600">
                      Receive standardized, machine-readable financial profiles that eliminate manual data entry and reduce processing time by 80%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Reduced Verification Friction</h4>
                    <p className="text-sm text-slate-600">
                      Cryptographically verified data means instant validation. Move from weeks of due diligence to minutes of verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Real-Time Risk Assessment</h4>
                    <p className="text-sm text-slate-600">
                      Access live financial metrics and behavioral patterns to make informed lending decisions with unprecedented accuracy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
                <div className="flex items-center space-x-2 text-slate-900">
                  <Building className="w-5 h-5" />
                  <span className="font-semibold">Enterprise Web Dashboard</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Powerful analytics and workflow tools designed for institutional scale
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-slate-200">
            <div className="text-3xl font-bold text-blue-900 mb-2">75%</div>
            <div className="text-sm text-slate-600">Faster Loan Processing</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-slate-200">
            <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
            <div className="text-sm text-slate-600">Lower Default Rates</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-slate-200">
            <div className="text-3xl font-bold text-amber-600 mb-2">3x</div>
            <div className="text-sm text-slate-600">Portfolio Growth</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-slate-200">
            <div className="text-3xl font-bold text-blue-900 mb-2">99.8%</div>
            <div className="text-sm text-slate-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
