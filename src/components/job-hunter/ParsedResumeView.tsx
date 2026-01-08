import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Languages, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Resume } from '@/types';

interface ParsedResumeViewProps {
  resume: Resume;
}

export const ParsedResumeView: React.FC<ParsedResumeViewProps> = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white truncate">{resume.name || 'Your Name'}</h2>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
                {resume.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    {resume.email}
                  </span>
                )}
                {resume.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    {resume.phone}
                  </span>
                )}
                {resume.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {resume.location}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {resume.summary && (
            <p className="mt-4 text-slate-300 leading-relaxed">
              {resume.summary}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <Card className="border-0 shadow-md bg-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Code className="w-5 h-5 text-emerald-400" />
              Skills ({resume.skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <Card className="border-0 shadow-md bg-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              Experience ({resume.experience.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resume.experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-emerald-500/30">
                <div className="absolute -left-1.5 top-1 w-3 h-3 bg-emerald-500 rounded-full" />
                <h4 className="font-semibold text-white">{exp.title}</h4>
                <p className="text-emerald-400 font-medium">{exp.company}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {exp.start_date} – {exp.end_date || 'Present'}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <Card className="border-0 shadow-md bg-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{edu.degree}</h4>
                  <p className="text-emerald-400">{edu.institution}</p>
                  <p className="text-sm text-slate-400">
                    {edu.graduation_date}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <Card className="border-0 shadow-md bg-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Award className="w-5 h-5 text-emerald-400" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resume.certifications.map((cert, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {cert}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Languages */}
      {resume.languages?.length > 0 && (
        <Card className="border-0 shadow-md bg-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Languages className="w-5 h-5 text-emerald-400" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resume.languages.map((lang, i) => (
                <Badge key={i} variant="outline" className="border-slate-600 text-slate-300">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParsedResumeView;
