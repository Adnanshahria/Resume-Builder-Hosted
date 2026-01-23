import React from 'react';
import { ResumeData } from '../types';
import { MapPin, Mail, Phone, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, scale = 1 }) => {
  return (
    <div
      className="bg-white text-black shadow-2xl mx-auto origin-top transition-transform duration-200"
      style={{
        width: '210mm',
        minHeight: '297mm',
        transform: `scale(${scale})`,
        marginBottom: `-${(1 - scale) * 297}mm`
      }}
    >
      <div className="p-10 h-full flex flex-col gap-6">

        {/* Header */}
        <header className="border-b-2 border-gray-800 pb-6">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900 mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 font-medium mb-4">
            {data.personalInfo.title || 'Professional Title'}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-3 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-4 pb-1">
              Experience
            </h2>
            <div className="flex flex-col gap-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-1">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer / Skills (Static example for structure) */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 mb-3 pb-1">
            Skills
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed">
            {data.skills.length > 0 ? data.skills.join(" • ") : "Add skills to see them here..."}
          </div>
        </section>
      </div>
    </div>
  );
};