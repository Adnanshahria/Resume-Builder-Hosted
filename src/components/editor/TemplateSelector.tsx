import React from 'react';
import { TemplateType, TEMPLATES, TemplateInfo } from '../../config/templates';
import { ResumeTemplate } from '../resume/ResumeTemplate';
import { PLACEHOLDER_DATA } from '../../contexts/EditorContext';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
    selectedTemplate: TemplateType;
    onSelectTemplate: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    selectedTemplate,
    onSelectTemplate,
}) => {
    return (
        <div className="template-selector">
            <h3 className="text-2xl font-bold text-center mb-2 text-slate-800 dark:text-white">
                Choose Your Template
            </h3>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
                Pick a design that matches your profession
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TEMPLATES.map((template) => (
                    <TemplatePreviewCard
                        key={template.id}
                        template={template}
                        isSelected={selectedTemplate === template.id}
                        onSelect={() => onSelectTemplate(template.id)}
                    />
                ))}
            </div>
        </div>
    );
};

interface TemplatePreviewCardProps {
    template: TemplateInfo;
    isSelected: boolean;
    onSelect: () => void;
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({ template, isSelected, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className={`group relative flex flex-col items-center transition-all duration-300 
                ${isSelected
                    ? 'scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
        >
            {/* CV Preview Container */}
            <div className={`relative w-full bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300
                ${isSelected
                    ? 'border-teal-500 shadow-xl shadow-teal-500/20 dark:shadow-teal-900/40 ring-4 ring-teal-500/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-xl'
                }`}
                style={{ aspectRatio: '8.5/11' }} // A4 ratio
            >
                {/* Mini Resume Preview */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="origin-top-left"
                        style={{
                            transform: 'scale(0.22)',
                            width: '816px',
                            height: '1056px',
                        }}
                    >
                        <ResumeTemplate
                            data={PLACEHOLDER_DATA}
                            template={template.id}
                            scale={1}
                        />
                    </div>
                </div>

                {/* Selection Overlay */}
                {isSelected && (
                    <div className="absolute inset-0 bg-teal-500/10 flex items-center justify-center">
                        <div className="absolute top-2 right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    </div>
                )}

                {/* Hover Overlay */}
                {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-sm font-medium px-4 py-1.5 bg-teal-500 rounded-full">
                            Select Template
                        </span>
                    </div>
                )}
            </div>

            {/* Template Name */}
            <div className="mt-3 text-center">
                <h4 className={`font-bold text-lg transition-colors duration-300
                    ${isSelected
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400'
                    }`}>
                    {template.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-2 line-clamp-2">
                    {template.description}
                </p>
            </div>
        </button>
    );
};

export default TemplateSelector;
