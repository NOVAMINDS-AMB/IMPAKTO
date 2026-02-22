import { Lock, CheckCircle, FileCheck } from 'lucide-react';

const philosophyPillars = [
  {
    icon: Lock,
    title: 'Data Sovereignty',
    description: 'The user owns their financial story',
    details: 'Every data point generated belongs to the individual or business that created it. We provide the infrastructure for secure storage and management, but ownership always remains with you.',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    icon: CheckCircle,
    title: 'Consent Before Capital',
    description: 'Access to user data must be explicitly authorized',
    details: 'Financial institutions can only access your data with your explicit, granular consent. You control who sees what, when, and for how long—shifting the power dynamic in your favor.',
    color: 'from-amber-500 to-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    icon: FileCheck,
    title: 'Proof Over Paper',
    description: 'Reducing dependency on manual audits',
    details: 'Replace subjective manual reviews with cryptographically verifiable proof of financial activity. Real-time data validation means faster decisions and reduced friction for everyone.',
    color: 'from-green-600 to-green-800',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

export function CorePhilosophy() {
  return (
    <section id="philosophy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Core Philosophy
          </h2>
          <p className="text-lg text-slate-600">
            Impakto is built on three fundamental pillars that reshape the relationship between individuals, businesses, and capital providers
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {philosophyPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`relative group ${pillar.bgColor} border-2 ${pillar.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-semibold text-slate-700 mb-4 italic">
                  "{pillar.description}"
                </p>

                {/* Details */}
                <p className="text-slate-600 leading-relaxed">
                  {pillar.details}
                </p>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-slate-900 border border-slate-200">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-700">
              Algorithmic Governance Ensures Fair & Transparent Operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
