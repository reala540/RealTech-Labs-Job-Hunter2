import { useState, useEffect, useCallback } from 'react';
import { Resume, Job, JobMatch, JobFilter } from '@/types';
import { supabase } from '@/lib/supabase';

const STORAGE_KEYS = {
  RESUME: 'job_hunter_resume',
  SAVED_JOBS: 'job_hunter_saved_jobs',
  APPLIED_JOBS: 'job_hunter_applied_jobs',
  FILTERS: 'job_hunter_filters',
};

export function useJobStore() {
  const [resume, setResumeState] = useState<Resume | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [filters, setFiltersState] = useState<JobFilter>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedResume = localStorage.getItem(STORAGE_KEYS.RESUME);
      if (storedResume) {
        setResumeState(JSON.parse(storedResume));
      }

      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (storedSaved) {
        setSavedJobs(JSON.parse(storedSaved));
      }

      const storedApplied = localStorage.getItem(STORAGE_KEYS.APPLIED_JOBS);
      if (storedApplied) {
        setAppliedJobs(JSON.parse(storedApplied));
      }

      const storedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);
      if (storedFilters) {
        setFiltersState(JSON.parse(storedFilters));
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
  }, []);

  // Save resume to localStorage
  const setResume = useCallback((newResume: Resume | null) => {
    setResumeState(newResume);
    if (newResume) {
      localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(newResume));
    } else {
      localStorage.removeItem(STORAGE_KEYS.RESUME);
    }
  }, []);

  // Clear resume
  const clearResume = useCallback(() => {
    setResumeState(null);
    setMatches([]);
    localStorage.removeItem(STORAGE_KEYS.RESUME);
  }, []);

  // Fetch jobs from all sources
  const fetchJobs = useCallback(async (query?: string, sources?: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke('fetch-jobs', {
        body: { query, sources, limit: 200 }
      });

      if (fetchError) throw fetchError;

      if (data?.jobs) {
        setJobs(data.jobs);
        return data;
      }

      return { jobs: [], total: 0, sourceStats: {} };
    } catch (e: any) {
      console.error('Error fetching jobs:', e);
      setError(e.message || 'Failed to fetch jobs');
      return { jobs: [], total: 0, sourceStats: {} };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Match jobs with resume
  const matchJobs = useCallback(async (jobsToMatch?: Job[]) => {
    if (!resume) {
      setError('No resume uploaded');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const targetJobs = jobsToMatch || jobs;
      
      const { data, error: matchError } = await supabase.functions.invoke('match-jobs', {
        body: { resume, jobs: targetJobs }
      });

      if (matchError) throw matchError;

      if (data?.matches) {
        setMatches(data.matches);
        return data.matches;
      }

      return [];
    } catch (e: any) {
      console.error('Error matching jobs:', e);
      setError(e.message || 'Failed to match jobs');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [resume, jobs]);

  // Save/unsave job
  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(newSaved));
      return newSaved;
    });
  }, []);

  // Mark job as applied
  const markAsApplied = useCallback((jobId: string) => {
    setAppliedJobs(prev => {
      if (prev.includes(jobId)) return prev;
      const newApplied = [...prev, jobId];
      localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(newApplied));
      return newApplied;
    });
  }, []);

  // Update filters
  const setFilters = useCallback((newFilters: JobFilter) => {
    setFiltersState(newFilters);
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(newFilters));
  }, []);

  // Filter matches based on current filters
  const filteredMatches = matches.filter(match => {
    const job = match.job;

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      const searchText = `${job.title} ${job.company} ${job.description} ${job.skills_required?.join(' ')}`.toLowerCase();
      if (!searchText.includes(keywords)) return false;
    }

    if (filters.work_type?.length && !filters.work_type.includes(job.work_type)) {
      return false;
    }

    if (filters.job_type?.length && !filters.job_type.includes(job.job_type)) {
      return false;
    }

    if (filters.seniority?.length && !filters.seniority.includes(job.seniority)) {
      return false;
    }

    if (filters.sources?.length && !filters.sources.includes(job.source)) {
      return false;
    }

    if (filters.min_match_score && match.overall_score < filters.min_match_score) {
      return false;
    }

    if (filters.salary_min && job.salary_max && job.salary_max < filters.salary_min) {
      return false;
    }

    if (filters.salary_max && job.salary_min && job.salary_min > filters.salary_max) {
      return false;
    }

    if (filters.posted_within && filters.posted_within !== 'all') {
      const postedDate = new Date(job.posted_date);
      const now = new Date();
      const diffHours = (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60);

      switch (filters.posted_within) {
        case '24h':
          if (diffHours > 24) return false;
          break;
        case '7d':
          if (diffHours > 168) return false;
          break;
        case '30d':
          if (diffHours > 720) return false;
          break;
      }
    }

    return true;
  });

  return {
    resume,
    setResume,
    clearResume,
    jobs,
    setJobs,
    matches,
    setMatches,
    filteredMatches,
    savedJobs,
    toggleSaveJob,
    appliedJobs,
    markAsApplied,
    filters,
    setFilters,
    isLoading,
    error,
    setError,
    fetchJobs,
    matchJobs,
  };
}
