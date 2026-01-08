import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const ResumeParser = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [skills, setSkills] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  // Extract text from PDF files client-side
  const extractTextFromPDF = useCallback(async (file) => {
    try {
      if (file.type !== 'application/pdf') {
        throw new Error('Only PDF files are supported');
      }

      // Load pdf.js dynamically to avoid build issues
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
      const pdfWorker = await import('pdfjs-dist/legacy/build/pdf.worker.entry');
      
      // Set up worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;

      // Read file as ArrayBuffer
      const reader = new FileReader();
      const arrayBuffer = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });

      // Load PDF document
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';

      // Extract text from first 5 pages maximum
      const maxPages = Math.min(pdf.numPages, 5);
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        fullText += pageText + '\n';
        
        // Stop if we have enough content
        if (fullText.length > 10000) break;
      }

      pdf.destroy();
      
      if (fullText.length < 100) {
        throw new Error('PDF content appears to be empty or corrupted');
      }

      return fullText.trim();
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error(`Failed to process PDF: ${error.message}`);
    }
  }, []);

  // Handle file upload and processing
  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setError('');
    setIsLoading(true);
    setUploadStatus('Extracting text from your resume...');

    try {
      // Reset previous results
      setJobs([]);
      setSkills([]);

      // Extract text based on file type
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain') {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type. Please upload PDF or TXT files only.');
      }

      setResumeText(text.substring(0, 500) + (text.length > 500 ? '...' : ''));
      setUploadStatus('Analyzing your skills and searching for matching jobs...');

      // Get Supabase URL from environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Missing Supabase URL configuration');
      }

      // Call Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/parse-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({ resumeText: text })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned status ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Resume processing failed');
      }

      // Update state with results
      setJobs(result.matching_jobs || []);
      setSkills(result.parsed_data?.skills || []);
      
      if (result.db_warning) {
        console.warn(result.db_warning);
      }

      setUploadStatus('Success! Found matching jobs for your skills.');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message || 'An unexpected error occurred while processing your resume');
      setUploadStatus('');
    } finally {
      setIsLoading(false);
    }
  }, [extractTextFromPDF]);

  // Format match score as percentage
  const formatMatchScore = (score) => {
    return Math.round(score * 100) + '%';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Smart Job Matcher
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Upload your resume and we'll find jobs that match your skills. 
          Powered by AI analysis of your experience and qualifications.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 md:p-8">
          <div className="mb-8 text-center">
            <div className="mb-4">
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
                  {resumeFile ? (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-green-600 font-medium">{resumeFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 font-medium">Click to upload your resume</p>
                      <p className="text-sm text-gray-500 mt-1">PDF or TXT files only (max 5MB)</p>
                    </div>
                  )}
                </div>
              </label>
              <input 
                id="resume-upload" 
                type="file" 
                accept=".pdf,.txt" 
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {uploadStatus && (
            <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg text-center">
              {uploadStatus}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}

          {resumeText && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Resume Preview</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">{resumeText}</p>
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Detected Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Processing your resume...</p>
              <p className="text-gray-500 text-sm mt-2">This may take up to 30 seconds</p>
            </div>
          ) : jobs.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Matching Jobs ({jobs.length})
              </h2>
              
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div 
                    key={job.id || index} 
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Match: {formatMatchScore(job.match_score)}
                          </span>
                          {job.matched_skills && job.matched_skills.length > 0 && (
                            <div className="ml-3 flex flex-wrap gap-1">
                              {job.matched_skills.slice(0, 3).map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex} 
                                  className="text-xs text-green-700 bg-green-50 px-1.5 py-0.5 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                              {job.matched_skills.length > 3 && (
                                <span className="text-xs text-gray-500">+{job.matched_skills.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                        
                        <div className="flex flex-wrap gap-3 mb-4">
                          {job.location && (
                            <div className="flex items-center text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{job.location}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {job.description && (
                          <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : resumeText && !isLoading && !error ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No matching jobs found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find jobs matching your skills. Try uploading a different resume or check back later as new jobs are added daily.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>RealTech Labs Job Hunter &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ResumeParser;
