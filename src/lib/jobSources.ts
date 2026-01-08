// Comprehensive Free Job Sources Configuration
// 40+ Free APIs, RSS Feeds, and Public Connectors for Global Job Aggregation

export interface JobSource {
  id: string;
  name: string;
  type: 'api' | 'rss' | 'scraper';
  url: string;
  enabled: boolean;
  category: string;
  countries?: string[];
  description: string;
}

// All 40+ free job sources
export const JOB_SOURCES: JobSource[] = [
  // === FREE APIs ===
  { id: 'remoteok', name: 'RemoteOK', type: 'api', url: 'https://remoteok.com/api', enabled: true, category: 'Remote', description: 'Remote jobs worldwide' },
  { id: 'arbeitnow', name: 'Arbeitnow', type: 'api', url: 'https://www.arbeitnow.com/api/job-board-api', enabled: true, category: 'Tech', description: 'European tech jobs' },
  { id: 'jobicy', name: 'Jobicy', type: 'api', url: 'https://jobicy.com/api/v2/remote-jobs', enabled: true, category: 'Remote', description: 'Remote job listings' },
  { id: 'himalayas', name: 'Himalayas', type: 'api', url: 'https://himalayas.app/jobs/api', enabled: true, category: 'Remote', description: 'Remote tech jobs' },
  { id: 'remotive', name: 'Remotive', type: 'api', url: 'https://remotive.com/api/remote-jobs', enabled: true, category: 'Remote', description: 'Remote job board' },
  { id: 'cryptojobs', name: 'Crypto Jobs', type: 'api', url: 'https://api.cryptojobslist.com/jobs', enabled: true, category: 'Crypto', description: 'Blockchain & crypto jobs' },
  { id: 'web3career', name: 'Web3 Career', type: 'api', url: 'https://web3.career/api/v1/jobs', enabled: true, category: 'Web3', description: 'Web3 & DeFi jobs' },
  { id: 'devitjobs', name: 'DevIT Jobs', type: 'api', url: 'https://devitjobs.uk/api/jobs', enabled: true, category: 'Tech', description: 'UK developer jobs' },
  { id: 'nofluffjobs', name: 'No Fluff Jobs', type: 'api', url: 'https://nofluffjobs.com/api/search/posting', enabled: true, category: 'Tech', description: 'IT jobs in Europe' },
  { id: 'usajobs', name: 'USAJobs', type: 'api', url: 'https://data.usajobs.gov/api/search', enabled: true, category: 'Government', description: 'US Government jobs' },
  { id: 'angellist', name: 'AngelList/Wellfound', type: 'api', url: 'https://api.angel.co/1/jobs', enabled: true, category: 'Startup', description: 'Startup jobs' },
  
  // === RSS FEEDS ===
  { id: 'weworkremotely', name: 'We Work Remotely', type: 'rss', url: 'https://weworkremotely.com/remote-jobs.rss', enabled: true, category: 'Remote', description: 'Largest remote work community' },
  { id: 'workingnomads', name: 'Working Nomads', type: 'rss', url: 'https://www.workingnomads.com/jobs/feed', enabled: true, category: 'Remote', description: 'Digital nomad jobs' },
  { id: 'authenticjobs', name: 'Authentic Jobs', type: 'rss', url: 'https://authenticjobs.com/rss/custom.rss', enabled: true, category: 'Design', description: 'Design & creative jobs' },
  { id: 'dribbble', name: 'Dribbble Jobs', type: 'rss', url: 'https://dribbble.com/jobs.rss', enabled: true, category: 'Design', description: 'Designer jobs' },
  { id: 'justremote', name: 'Just Remote', type: 'rss', url: 'https://justremote.co/remote-jobs/rss', enabled: true, category: 'Remote', description: 'Remote job listings' },
  { id: 'remoteco', name: 'Remote.co', type: 'rss', url: 'https://remote.co/remote-jobs/feed/', enabled: true, category: 'Remote', description: 'Remote work resources' },
  { id: 'skipthedrive', name: 'Skip The Drive', type: 'rss', url: 'https://www.skipthedrive.com/feed/', enabled: true, category: 'Remote', description: 'Work from home jobs' },
  { id: 'nodesk', name: 'Nodesk', type: 'rss', url: 'https://nodesk.co/remote-jobs/rss/', enabled: true, category: 'Remote', description: 'Remote job resources' },
  { id: 'dynamitejobs', name: 'Dynamite Jobs', type: 'rss', url: 'https://dynamitejobs.com/feed', enabled: true, category: 'Remote', description: 'Remote jobs for digital nomads' },
  { id: 'remoteleaf', name: 'Remote Leaf', type: 'rss', url: 'https://remoteleaf.com/feed', enabled: true, category: 'Remote', description: 'Curated remote jobs' },
  { id: 'euremotejobs', name: 'EU Remote Jobs', type: 'rss', url: 'https://euremotejobs.com/feed/', enabled: true, category: 'Remote', description: 'European remote jobs' },
  { id: 'remote4me', name: 'Remote4Me', type: 'rss', url: 'https://remote4me.com/feed', enabled: true, category: 'Remote', description: 'Remote job aggregator' },
  
  // === TECH-SPECIFIC RSS ===
  { id: 'pythonjobs', name: 'Python Jobs', type: 'rss', url: 'https://www.python.org/jobs/feed/rss/', enabled: true, category: 'Python', description: 'Python developer jobs' },
  { id: 'rubyjobs', name: 'Ruby Jobs', type: 'rss', url: 'https://jobs.rubynow.com/rss', enabled: true, category: 'Ruby', description: 'Ruby on Rails jobs' },
  { id: 'golangjobs', name: 'Golang Jobs', type: 'rss', url: 'https://golang.cafe/rss', enabled: true, category: 'Go', description: 'Go developer jobs' },
  { id: 'rustjobs', name: 'Rust Jobs', type: 'rss', url: 'https://rustjobs.dev/feed.xml', enabled: true, category: 'Rust', description: 'Rust developer jobs' },
  { id: 'phpjobs', name: 'Laravel Jobs', type: 'rss', url: 'https://larajobs.com/feed', enabled: true, category: 'PHP', description: 'PHP & Laravel jobs' },
  { id: 'iosjobs', name: 'iOS Jobs', type: 'rss', url: 'https://iosdevjobs.com/feed/', enabled: true, category: 'Mobile', description: 'iOS developer jobs' },
  { id: 'androidjobs', name: 'Android Jobs', type: 'rss', url: 'https://androidjobs.io/feed/', enabled: true, category: 'Mobile', description: 'Android developer jobs' },
  
  // === INDUSTRY-SPECIFIC ===
  { id: 'aijobs', name: 'AI Jobs', type: 'rss', url: 'https://ai-jobs.net/feed/', enabled: true, category: 'AI/ML', description: 'AI & Machine Learning jobs' },
  { id: 'datajobs', name: 'Data Jobs', type: 'rss', url: 'https://datajobs.com/rss', enabled: true, category: 'Data', description: 'Data science jobs' },
  { id: 'ycombinator', name: 'Y Combinator', type: 'rss', url: 'https://news.ycombinator.com/jobs.rss', enabled: true, category: 'Startup', description: 'YC startup jobs' },
  { id: 'startupers', name: 'Startupers', type: 'rss', url: 'https://www.startupers.com/feed', enabled: true, category: 'Startup', description: 'Startup job listings' },
  
  // === DESIGN/CREATIVE ===
  { id: 'designerjobs', name: 'Designer Jobs', type: 'rss', url: 'https://designerjobs.co/feed', enabled: true, category: 'Design', description: 'Designer job board' },
  { id: 'uxjobs', name: 'UX Jobs', type: 'rss', url: 'https://www.uxjobsboard.com/feed', enabled: true, category: 'Design', description: 'UX designer jobs' },
  
  // === MARKETING/GROWTH ===
  { id: 'growthhackers', name: 'Growth Hackers', type: 'rss', url: 'https://growthhackers.com/jobs/feed', enabled: true, category: 'Marketing', description: 'Growth & marketing jobs' },
  { id: 'marketingjobs', name: 'Marketing Jobs', type: 'rss', url: 'https://www.marketingjobs.io/feed', enabled: true, category: 'Marketing', description: 'Marketing positions' },
  
  // === GOVERNMENT/INTERNATIONAL ===
  { id: 'eujobs', name: 'EU Jobs', type: 'rss', url: 'https://epso.europa.eu/job-opportunities/feed', enabled: true, category: 'Government', description: 'European Union jobs' },
  { id: 'unjobs', name: 'UN Jobs', type: 'rss', url: 'https://unjobs.org/rss', enabled: true, category: 'Government', description: 'United Nations jobs' },
];

// Get all enabled sources
export function getEnabledSources(): JobSource[] {
  return JOB_SOURCES.filter(source => source.enabled);
}

// Get sources by category
export function getSourcesByCategory(category: string): JobSource[] {
  return JOB_SOURCES.filter(source => source.category === category && source.enabled);
}

// Get all categories
export function getCategories(): string[] {
  return [...new Set(JOB_SOURCES.map(source => source.category))];
}

// Get source statistics
export function getSourceStats(): { total: number; enabled: number; byType: Record<string, number>; byCategory: Record<string, number> } {
  const enabled = JOB_SOURCES.filter(s => s.enabled);
  const byType: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  
  enabled.forEach(source => {
    byType[source.type] = (byType[source.type] || 0) + 1;
    byCategory[source.category] = (byCategory[source.category] || 0) + 1;
  });
  
  return {
    total: JOB_SOURCES.length,
    enabled: enabled.length,
    byType,
    byCategory
  };
}

// Time interval filter options
export const TIME_INTERVALS = {
  '3h': { label: 'Last 3 hours', hours: 3 },
  '24h': { label: 'Last 24 hours', hours: 24 },
  '7d': { label: 'Last 7 days', hours: 168 },
  '30d': { label: 'Last 30 days', hours: 720 },
  'all': { label: 'All time', hours: null }
};

// Filter jobs by time interval
export function filterByTimeInterval(jobs: any[], intervalKey: string): any[] {
  if (!intervalKey || intervalKey === 'all') return jobs;
  
  const interval = TIME_INTERVALS[intervalKey as keyof typeof TIME_INTERVALS];
  if (!interval?.hours) return jobs;
  
  const cutoffDate = new Date(Date.now() - interval.hours * 60 * 60 * 1000);
  
  return jobs.filter(job => {
    const postedDate = job.posted_date ? new Date(job.posted_date) : new Date(job.created_at);
    return postedDate >= cutoffDate;
  });
}
