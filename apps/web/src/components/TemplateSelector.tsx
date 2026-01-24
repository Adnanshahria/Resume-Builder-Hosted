import React from 'react';
import { TemplateType, TEMPLATES, TemplateInfo } from '../lib/templates';

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
            <h3 className="template-selector-title">Choose Your Template</h3>
            <p className="template-selector-subtitle">Pick a design that matches your profession</p>

            <div className="template-grid-simple">
                {TEMPLATES.map((template) => (
                    <TemplateBlock
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

interface TemplateBlockProps {
    template: TemplateInfo;
    isSelected: boolean;
    onSelect: () => void;
}

const TemplateBlock: React.FC<TemplateBlockProps> = ({ template, isSelected, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className={`template-block ${isSelected ? 'template-block--selected' : ''}`}
            style={{
                '--template-primary': template.primaryColor,
                '--template-accent': template.accentColor,
            } as React.CSSProperties}
        >
            <div className="template-block-icon">{template.icon}</div>
            <div className="template-block-name">{template.name}</div>

            {isSelected && (
                <div className="template-block-check">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </button>
    );
};

export default TemplateSelector;
