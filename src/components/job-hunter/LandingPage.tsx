import React from 'react';
import { 
  Upload, Search, Target, Zap, Globe, Shield, Clock, 
  CheckCircle, ArrowRight, Sparkles, Database, Brain, 
  TrendingUp, Users, Building2, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JOB_SOURCES, getSourceStats } from '@/lib/jobSources';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const stats = getSourceStats();

  const features = [
    {
      icon: Database,
      title: '40+ Job Sources',
      description: 'Aggregate jobs from RemoteOK, We Work Remotely, Jobicy, Remotive, and 36+ more free sources globally.',
      color: 'emerald'
    },
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms analyze your skills, experience, and preferences to find the perfect match.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Jobs are fetched in real-time from RSS feeds and APIs, ensuring you never miss an opportunity.',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your resume data is processed securely. We never share your information with third parties.',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Find remote jobs worldwide or filter by specific regions, countries, and time zones.',
      color: 'cyan'
    },
    {
      icon: Target,
      title: 'Smart Filters',
      description: '12+ filters including salary, seniority, job type, skills, and minimum match score.',
      color: 'rose'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Upload Your Resume',
      description: 'Upload PDF, DOCX, or paste your resume text. Our AI extracts skills, experience, and qualifications.',
      icon: Upload
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our matching engine analyzes your profile against thousands of job listings in real-time.',
      icon: Brain
    },
    {
      step: 3,
      title: 'Get Matched',
      description: 'Receive personalized job recommendations with match scores and actionable insights.',
      icon: Target
    }
  ];

  const sourceCategories = [
    { name: 'Remote', count: stats.byCategory['Remote'] || 0, icon: Globe },
    { name: 'Tech', count: stats.byCategory['Tech'] || 0, icon: Database },
    { name: 'Startup', count: stats.byCategory['Startup'] || 0, icon: TrendingUp },
    { name: 'Design', count: stats.byCategory['Design'] || 0, icon: Sparkles },
    { name: 'Government', count: stats.byCategory['Government'] || 0, icon: Building2 },
    { name: 'AI/ML', count: (stats.byCategory['AI/ML'] || 0) + (stats.byCategory['Data'] || 0), icon: Brain },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI-Powered Job Matching
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Dream Job with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                AI Precision
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Upload your resume and instantly match with opportunities from{' '}
              <span className="text-emerald-400 font-semibold">{stats.enabled}+ job sources</span>{' '}
              worldwide. Our AI analyzes your skills and experience to find the perfect fit.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.enabled}+</div>
                <div className="text-sm text-slate-400">Job Sources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-slate-400">Jobs Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-slate-400">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Free</div>
                <div className="text-sm text-slate-400">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Sources Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Aggregating Jobs from {stats.enabled}+ Sources
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We pull jobs from the best free APIs, RSS feeds, and job boards worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {sourceCategories.map(cat => (
              <Card key={cat.name} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <cat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{cat.count}</div>
                  <div className="text-xs text-slate-400">{cat.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {JOB_SOURCES.slice(0, 20).map(source => (
              <Badge 
                key={source.id} 
                variant="outline" 
                className="border-slate-700 text-slate-400 bg-slate-800/50"
              >
                {source.name}
              </Badge>
            ))}
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
              +{JOB_SOURCES.length - 20} more
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Powerful tools and AI-driven insights to supercharge your job search
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors group"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-950" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three Simple Steps to Your Next Job
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our streamlined process gets you matched with relevant opportunities in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent -translate-x-1/2" />
                )}
                <Card className="bg-slate-800/50 border-slate-700 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-slate-700/50">
                      {step.step}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 md:p-12 border border-emerald-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Job?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of job seekers who have found their dream positions using our AI-powered platform.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25"
            >
              Upload Your Resume Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
