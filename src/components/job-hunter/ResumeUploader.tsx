import React, { useState } from 'react';
import {
  Upload,
  Loader2,
  AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Resume } from '@/types';

interface ResumeUploaderProps {
  onResumeReady: (resume: Resume) => void;
  existingResume?: Resume | null;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onResumeReady
}) => {
  const [pastedText, setPastedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔒 TEMPORARY SAFE HANDLER — PASTE ONLY, JSON ONLY
  const handleUpload = async () => {
    setError(null);

    try {
      setLoading(true);

      if (!pastedText.trim()) {
        setError('Please paste resume text');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke(
        'parse-resume',
        {
          body: {
            resumeText: pastedText.trim(),
          },
        }
      );

      if (error) throw error;
      if (!data?.success) throw new Error('Parsing failed');

      const resume: Resume = {
        id: crypto.randomUUID(),
        ...data.resume,
        createdAt: new Date().toISOString(),
      };

      onResumeReady(resume);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to process resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-0 shadow-xl">
      <CardContent className="p-6">
        {loading ? (
          <div className="flex flex-col items-center text-white gap-4">
            <Loader2 className="animate-spin w-8 h-8" />
            <p>Processing your resume…</p>
          </div>
        ) : (
          <>
            <Textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your resume text here…"
              className="min-h-[200px]"
            />

            {error && (
              <div className="mt-4 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              className="w-full mt-6"
              onClick={handleUpload}
            >
              <Upload className="mr-2 w-4 h-4" />
              Analyze Resume
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;
