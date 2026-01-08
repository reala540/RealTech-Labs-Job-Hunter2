import React from 'react';
import { MapPin, Clock, DollarSign, Building2, Bookmark, BookmarkCheck, ExternalLink, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobMatch } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  match: JobMatch;
  isSaved: boolean;
  isApplied: boolean;
  onToggleSave: () => void;
  onApply: () => void;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  match,
  isSaved,
  isApplied,
  onToggleSave,
  onApply,
  onClick
}) => {
  const { job, overall_score, matched_skills, missing_skills } = match;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 60) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
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
    <Card 
      className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Company Logo & Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              {job.company_logo ? (
                <img 
                  src={job.company_logo} 
                  alt={job.company}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-slate-400">${job.company.charAt(0)}</span>`;
                  }}
                />
              ) : (
                <span className="text-lg font-bold text-slate-400">{job.company.charAt(0)}</span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-sm text-slate-400 truncate">{job.company}</span>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className={cn(
            "flex flex-col items-center px-3 py-2 rounded-xl border",
            getScoreColor(overall_score)
          )}>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xl font-bold">{overall_score}%</span>
            </div>
            <span className="text-xs opacity-80">{getScoreLabel(overall_score)}</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo}
          </span>
          {formatSalary() && (
            <span className="flex items-center gap-1 text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
              {formatSalary()}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
            {job.work_type}
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
            {job.job_type?.replace('_', ' ')}
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
            {job.seniority}
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
            {job.source}
          </Badge>
        </div>

        {/* Matched Skills */}
        {matched_skills && matched_skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1.5">
              {matched_skills.slice(0, 5).map((skill, i) => (
                <Badge 
                  key={i} 
                  className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {matched_skills.length > 5 && (
                <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                  +{matched_skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={cn(
              "text-slate-400 hover:text-white",
              isSaved && "text-amber-400 hover:text-amber-300"
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 mr-1.5" />
            ) : (
              <Bookmark className="w-4 h-4 mr-1.5" />
            )}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (job.application_url) {
                window.open(job.application_url, '_blank');
                onApply();
              }
            }}
            disabled={isApplied || !job.application_url}
            className={cn(
              "ml-auto",
              isApplied 
                ? "bg-slate-700 text-slate-400" 
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            )}
          >
            {isApplied ? (
              'Applied'
            ) : (
              <>
                Apply
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
