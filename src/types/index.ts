// Job Hunter Types

export interface Resume {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications?: string[];
  languages?: string[];
  rawText: string;
  keywords?: string[];
  createdAt: string;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  graduation_date?: string;
  gpa?: string;
}

export interface Job {
  id: string;
  external_id?: string;
  source: string;
  title: string;
  company: string;
  company_logo?: string;
  location: string;
  work_type: 'remote' | 'hybrid' | 'onsite';
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary';
  seniority: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  skills_required: string[];
  posted_date: string;
  application_url?: string;
  is_active: boolean;
}

export interface JobMatch {
  job: Job;
  overall_score: number;
  skills_score: number;
  experience_score: number;
  matched_skills: string[];
  missing_skills: string[];
  experience_matches?: ExperienceMatch[];
  keyword_matches?: string[];
  recommendation?: string;
}

export interface ExperienceMatch {
  job_requirement: string;
  resume_experience: string;
  relevance: 'High' | 'Medium' | 'Low';
}

export interface JobFilter {
  keywords?: string;
  title?: string;
  location?: string;
  work_type?: string[];
  job_type?: string[];
  seniority?: string[];
  salary_min?: number;
  salary_max?: number;
  sources?: string[];
  posted_within?: string;
  min_match_score?: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: JobFilter;
  is_alert_enabled: boolean;
  created_at: string;
}

export interface ParsingProgress {
  stage: 'uploading' | 'parsing' | 'analyzing' | 'matching' | 'complete' | 'error';
  progress: number;
  message: string;
}

export interface SourceStats {
  total: number;
  enabled: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
}
