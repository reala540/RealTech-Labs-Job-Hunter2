import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, MapPin, Clock, DollarSign, Building2, ExternalLink, 
  Bookmark, BookmarkCheck, Share2, TrendingUp, CheckCircle, XCircle,
  Briefcase, Target, Sparkles, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useJobStore } from '@/hooks/useJobStore';
import { Resume, JobMatch } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface JobDetailPageProps {
  jobId: string;
  resume: Resume;
  onBack: () => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, resume, onBack }) => {
  const { matches, savedJobs, appliedJobs, toggleSaveJob, markAsApplied } = useJobStore();
  const [match, setMatch] = useState<JobMatch | null>(null);

  useEffect(() => {
    const foundMatch = matches.find(m => m.job.id === jobId);
    setMatch(foundMatch || null);
  }, [jobId, matches]);

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white">Job not found</h2>
            <p className="text-slate-400 mt-2">This job may no longer be available</p>
          </div>
        </div>
      </div>
    );
  }

  const { job, overall_score, skills_score, experience_score, matched_skills, missing_skills, recommendation } = match;
  const isSaved = savedJobs.includes(job.id);
  const isApplied = appliedJobs.includes(job.id);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-slate-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-slate-500';
  };

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null;
    const currency = job.salary_currency || 'USD';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    });
    
    if (job.salary_min && job.salary_max) {
      return `${formatter.format(job.salary_min)} - ${formatter.format(job.salary_max)}`;
    }
    if (job.salary_min) return `From ${formatter.format(job.salary_min)}`;
    if (job.salary_max) return `Up to ${formatter.format(job.salary_max)}`;
    return null;
  };

  const postedDate = job.posted_date ? new Date(job.posted_date) : new Date();
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {job.company_logo ? (
                    <img 
                      src={job.company_logo} 
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-slate-400">{job.company.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{job.company}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {timeAgo}
                    </span>
                    {formatSalary() && (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <DollarSign className="w-4 h-4" />
                        {formatSalary()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Match Score */}
              <div className="flex flex-col items-center bg-slate-900/50 rounded-xl p-4 min-w-[140px]">
                <div className={cn("text-4xl font-bold", getScoreColor(overall_score))}>
                  {overall_score}%
                </div>
                <div className="text-sm text-slate-400 mt-1">Match Score</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={cn("w-4 h-4", getScoreColor(overall_score))} />
                  <span className={cn("text-sm font-medium", getScoreColor(overall_score))}>
                    {overall_score >= 80 ? 'Excellent' : overall_score >= 60 ? 'Good' : overall_score >= 40 ? 'Fair' : 'Low'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {job.work_type}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {job.job_type?.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {job.seniority}
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                {job.source}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700">
              <Button
                onClick={() => {
                  if (job.application_url) {
                    window.open(job.application_url, '_blank');
                    markAsApplied(job.id);
                  }
                }}
                disabled={isApplied || !job.application_url}
                className={cn(
                  "flex-1 sm:flex-none",
                  isApplied 
                    ? "bg-slate-700 text-slate-400" 
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                )}
              >
                {isApplied ? 'Applied' : 'Apply Now'}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleSaveJob(job.id)}
                className={cn(
                  "border-slate-600",
                  isSaved ? "text-amber-400 border-amber-500/30" : "text-slate-300"
                )}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                ) : (
                  <Bookmark className="w-4 h-4 mr-2" />
                )}
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300"
                onClick={() => {
                  navigator.share?.({
                    title: job.title,
                    text: `Check out this job: ${job.title} at ${job.company}`,
                    url: job.application_url || window.location.href
                  });
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* AI Recommendation */}
            {recommendation && (
              <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    AI Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{recommendation}</p>
                </CardContent>
              </Card>
            )}

            {/* Job Description */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {job.description || 'No description available.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Target className="w-5 h-5 text-emerald-400" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Breakdown */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Match Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Skills Match</span>
                    <span className={getScoreColor(skills_score)}>{skills_score}%</span>
                  </div>
                  <Progress value={skills_score} className={cn("h-2", getProgressColor(skills_score))} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Experience Match</span>
                    <span className={getScoreColor(experience_score)}>{experience_score}%</span>
                  </div>
                  <Progress value={experience_score} className={cn("h-2", getProgressColor(experience_score))} />
                </div>
              </CardContent>
            </Card>

            {/* Matched Skills */}
            {matched_skills && matched_skills.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Matched Skills ({matched_skills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {matched_skills.map((skill, i) => (
                      <Badge 
                        key={i}
                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Missing Skills */}
            {missing_skills && missing_skills.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <XCircle className="w-5 h-5 text-amber-400" />
                    Skills to Develop ({missing_skills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {missing_skills.map((skill, i) => (
                      <Badge 
                        key={i}
                        variant="outline"
                        className="border-amber-500/30 text-amber-400"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
