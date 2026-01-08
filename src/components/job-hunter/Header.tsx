import React from 'react';
import { Briefcase, Upload, LayoutDashboard, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: 'landing' | 'upload' | 'dashboard') => void;
  hasResume: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, hasResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Briefcase },
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    ...(hasResume ? [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">RealTech Labs</h1>
              <p className="text-xs text-slate-400">Job Hunter</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(item.id as any)}
                className={currentPage === item.id 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    onNavigate(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`justify-start ${currentPage === item.id 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
