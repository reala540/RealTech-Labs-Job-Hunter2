import React from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobFilter } from '@/types';
import { JOB_SOURCES } from '@/lib/jobSources';

interface JobFiltersProps {
  filters: JobFilter;
  onFiltersChange: (filters: JobFilter) => void;
  totalJobs: number;
  filteredCount: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFiltersChange,
  totalJobs,
  filteredCount
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const workTypes = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' },
  ];

  const jobTypes = [
    { value: 'full_time', label: 'Full-time' },
    { value: 'part_time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];

  const seniorityLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'executive', label: 'Executive' },
  ];

  const postedWithinOptions = [
    { value: 'all', label: 'All Time' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  const handleCheckboxChange = (key: keyof JobFilter, value: string, checked: boolean) => {
    const currentValues = (filters[key] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onFiltersChange({ ...filters, [key]: newValues.length > 0 ? newValues : undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(v => 
    v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search jobs, companies, skills..."
            value={filters.keywords || ''}
            onChange={(e) => onFiltersChange({ ...filters, keywords: e.target.value || undefined })}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-emerald-500 text-white text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-slate-900 border-slate-800 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-white">Filter Jobs</SheetTitle>
              <SheetDescription className="text-slate-400">
                Showing {filteredCount} of {totalJobs} jobs
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Match Score */}
              <div className="space-y-3">
                <Label className="text-white">Minimum Match Score: {filters.min_match_score || 0}%</Label>
                <Slider
                  value={[filters.min_match_score || 0]}
                  onValueChange={([value]) => onFiltersChange({ ...filters, min_match_score: value > 0 ? value : undefined })}
                  max={100}
                  step={5}
                  className="py-4"
                />
              </div>

              {/* Work Type */}
              <div className="space-y-3">
                <Label className="text-white">Work Type</Label>
                <div className="space-y-2">
                  {workTypes.map(type => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`work-${type.value}`}
                        checked={(filters.work_type || []).includes(type.value)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('work_type', type.value, checked as boolean)
                        }
                        className="border-slate-600 data-[state=checked]:bg-emerald-500"
                      />
                      <label htmlFor={`work-${type.value}`} className="text-sm text-slate-300">
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <Label className="text-white">Job Type</Label>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`job-${type.value}`}
                        checked={(filters.job_type || []).includes(type.value)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('job_type', type.value, checked as boolean)
                        }
                        className="border-slate-600 data-[state=checked]:bg-emerald-500"
                      />
                      <label htmlFor={`job-${type.value}`} className="text-sm text-slate-300">
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seniority */}
              <div className="space-y-3">
                <Label className="text-white">Seniority Level</Label>
                <div className="space-y-2">
                  {seniorityLevels.map(level => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`seniority-${level.value}`}
                        checked={(filters.seniority || []).includes(level.value)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('seniority', level.value, checked as boolean)
                        }
                        className="border-slate-600 data-[state=checked]:bg-emerald-500"
                      />
                      <label htmlFor={`seniority-${level.value}`} className="text-sm text-slate-300">
                        {level.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posted Within */}
              <div className="space-y-3">
                <Label className="text-white">Posted Within</Label>
                <Select
                  value={filters.posted_within || 'all'}
                  onValueChange={(value) => onFiltersChange({ 
                    ...filters, 
                    posted_within: value === 'all' ? undefined : value 
                  })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {postedWithinOptions.map(option => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-white hover:bg-slate-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label className="text-white">Salary Range (USD)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.salary_min || ''}
                    onChange={(e) => onFiltersChange({ 
                      ...filters, 
                      salary_min: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.salary_max || ''}
                    onChange={(e) => onFiltersChange({ 
                      ...filters, 
                      salary_max: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Job Sources */}
              <div className="space-y-3">
                <Label className="text-white">Job Sources</Label>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {JOB_SOURCES.filter(s => s.enabled).slice(0, 15).map(source => (
                    <div key={source.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`source-${source.id}`}
                        checked={(filters.sources || []).includes(source.name)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('sources', source.name, checked as boolean)
                        }
                        className="border-slate-600 data-[state=checked]:bg-emerald-500"
                      />
                      <label htmlFor={`source-${source.id}`} className="text-sm text-slate-300">
                        {source.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.keywords && (
            <Badge variant="secondary" className="bg-slate-700 text-slate-200">
              Search: {filters.keywords}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, keywords: undefined })}
              />
            </Badge>
          )}
          {filters.min_match_score && (
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
              Min Score: {filters.min_match_score}%
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, min_match_score: undefined })}
              />
            </Badge>
          )}
          {filters.work_type?.map(type => (
            <Badge key={type} variant="secondary" className="bg-slate-700 text-slate-200">
              {type}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCheckboxChange('work_type', type, false)}
              />
            </Badge>
          ))}
          {filters.job_type?.map(type => (
            <Badge key={type} variant="secondary" className="bg-slate-700 text-slate-200">
              {type.replace('_', ' ')}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCheckboxChange('job_type', type, false)}
              />
            </Badge>
          ))}
          {filters.seniority?.map(level => (
            <Badge key={level} variant="secondary" className="bg-slate-700 text-slate-200">
              {level}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCheckboxChange('seniority', level, false)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobFilters;
