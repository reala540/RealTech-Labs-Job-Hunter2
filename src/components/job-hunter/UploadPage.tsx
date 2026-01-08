import React from 'react';
import { ArrowRight, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeUploader } from './ResumeUploader';
import { ParsedResumeView } from './ParsedResumeView';
import { Resume } from '@/types';

interface UploadPageProps {
  onResumeReady: (resume: Resume) => void;
  existingResume?: Resume | null;
  onClearResume: () => void;
  onContinue: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  onResumeReady,
  existingResume,
  onClearResume,
  onContinue
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {existingResume ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Your Resume</h1>
              <p className="text-slate-400">
                Review your parsed resume data below
              </p>
            </div>

            <ParsedResumeView resume={existingResume} />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                variant="outline"
                onClick={onClearResume}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Upload New Resume
              </Button>
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8"
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Upload Your Resume</h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                Our AI will analyze your resume and extract skills, experience, and qualifications
                to match you with the best opportunities.
              </p>
            </div>

            <ResumeUploader 
              onResumeReady={onResumeReady}
              existingResume={existingResume}
            />

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">What we extract:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Contact Info',
                  'Skills',
                  'Experience',
                  'Education',
                  'Certifications',
                  'Languages',
                  'Summary',
                  'Keywords'
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
