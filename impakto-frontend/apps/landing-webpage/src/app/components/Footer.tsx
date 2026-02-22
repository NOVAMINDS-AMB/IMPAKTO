import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold">Impakto</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building trust infrastructure to bridge the informal economy with formal capital across Africa.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  MSME Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  MFI Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Integration Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal & Governance</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Algorithmic Governance Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Compliance & Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@impakto.africa" className="text-slate-400 hover:text-blue-400 transition-colors">
                  info@impakto.africa
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">+254 700 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">Nairobi, Kenya</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} Impakto. All rights reserved.
            </div>

            {/* NOVAMINDS Credit */}
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Prepared by</span>
              <span className="font-semibold text-blue-400">NOVAMINDS</span>
            </div>

            {/* Compliance Badge */}
            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-400">ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
