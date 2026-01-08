import React, { useState, useEffect } from 'react';
import { RefreshCw, Loader2, AlertCircle, Database, TrendingUp, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobStore } from '@/hooks/useJobStore';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { Resume, JobMatch } from '@/types';

interface DashboardPageProps {
  resume: Resume;
  onJobClick: (jobId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ resume, onJobClick }) => {
  const {
    jobs,
    matches,
    filteredMatches,
    savedJobs,
    appliedJobs,
    filters,
    setFilters,
    toggleSaveJob,
    markAsApplied,
    isLoading,
    error,
    fetchJobs,
    matchJobs
  } = useJobStore();

  const [sourceStats, setSourceStats] = useState<Record<string, number>>({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      loadJobs();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  const loadJobs = async () => {
    const result = await fetchJobs();
    if (result?.jobs?.length > 0) {
      setSourceStats(result.sourceStats || {});
      await matchJobs(result.jobs);
    }
  };

  const handleRefresh = async () => {
    await loadJobs();
  };

  const stats = {
    totalJobs: matches.length,
    excellentMatches: matches.filter(m => m.overall_score >= 80).length,
    goodMatches: matches.filter(m => m.overall_score >= 60 && m.overall_score < 80).length,
    savedCount: savedJobs.length,
    appliedCount: appliedJobs.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Job Matches</h1>
            <p className="text-slate-400 mt-1">
              AI-matched opportunities for {resume.name}
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh Jobs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalJobs}</div>
                  <div className="text-xs text-slate-400">Total Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">{stats.excellentMatches}</div>
                  <div className="text-xs text-slate-400">Excellent (80%+)</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{stats.goodMatches}</div>
                  <div className="text-xs text-slate-400">Good (60-79%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">{stats.savedCount}</div>
                  <div className="text-xs text-slate-400">Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{stats.appliedCount}</div>
                  <div className="text-xs text-slate-400">Applied</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Source Stats */}
        {Object.keys(sourceStats).length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(sourceStats)
                .filter(([_, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([source, count]) => (
                  <Badge key={source} variant="outline" className="border-slate-600 text-slate-300">
                    {source}: {count}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <JobFilters
            filters={filters}
            onFiltersChange={setFilters}
            totalJobs={matches.length}
            filteredCount={filteredMatches.length}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error loading jobs</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && matches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-slate-400">Fetching jobs from 40+ sources...</p>
            <p className="text-sm text-slate-500 mt-2">This may take a moment</p>
          </div>
        )}

        {/* Job List */}
        {!isLoading && filteredMatches.length > 0 && (
          <div className="grid gap-4">
            {filteredMatches.map((match) => (
              <JobCard
                key={match.job.id}
                match={match}
                isSaved={savedJobs.includes(match.job.id)}
                isApplied={appliedJobs.includes(match.job.id)}
                onToggleSave={() => toggleSaveJob(match.job.id)}
                onApply={() => markAsApplied(match.job.id)}
                onClick={() => onJobClick(match.job.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && matches.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-slate-400 mb-6">
              Click refresh to fetch jobs from our 40+ sources
            </p>
            <Button onClick={handleRefresh} className="bg-emerald-500 hover:bg-emerald-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Fetch Jobs
            </Button>
          </div>
        )}

        {/* No Results After Filter */}
        {!isLoading && matches.length > 0 && filteredMatches.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No matching jobs</h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({})}
              className="border-slate-600 text-slate-300"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
