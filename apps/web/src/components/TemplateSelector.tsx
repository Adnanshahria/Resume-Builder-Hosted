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

            <div className="template-grid">
                {TEMPLATES.map((template) => (
                    <TemplateCard
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

interface TemplateCardProps {
    template: TemplateInfo;
    isSelected: boolean;
    onSelect: () => void;
}

// Layout-specific preview component
const LayoutPreview: React.FC<{ template: TemplateInfo }> = ({ template }) => {
    const { layout, primaryColor, accentColor } = template;

    if (layout === 'two-column' || layout === 'sidebar') {
        // Two-column layout preview
        return (
            <div className="template-card-preview template-card-preview--two-column">
                {/* Sidebar */}
                <div className="preview-sidebar" style={{ backgroundColor: primaryColor }}>
                    <div className="preview-avatar"></div>
                    <div className="preview-sidebar-lines">
                        <div className="preview-line preview-line--light"></div>
                        <div className="preview-line preview-line--light preview-line--short"></div>
                    </div>
                    <div className="preview-sidebar-section">
                        <div className="preview-line preview-line--light preview-line--short"></div>
                        <div className="preview-line preview-line--light"></div>
                        <div className="preview-line preview-line--light"></div>
                    </div>
                </div>
                {/* Main content */}
                <div className="preview-main">
                    <div className="preview-section">
                        <div className="preview-line preview-line--title" style={{ backgroundColor: accentColor }}></div>
                        <div className="preview-line"></div>
                        <div className="preview-line preview-line--long"></div>
                    </div>
                    <div className="preview-section">
                        <div className="preview-line preview-line--title" style={{ backgroundColor: accentColor }}></div>
                        <div className="preview-line preview-line--medium"></div>
                        <div className="preview-line"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Single column layout preview
    return (
        <div className="template-card-preview template-card-preview--single">
            {/* Header */}
            <div className="preview-header" style={{ backgroundColor: primaryColor }}>
                <div className="preview-header-lines">
                    <div className="preview-line preview-line--light preview-line--title"></div>
                    <div className="preview-line preview-line--light preview-line--short"></div>
                </div>
            </div>
            {/* Body */}
            <div className="preview-body">
                <div className="preview-section">
                    <div className="preview-line preview-line--title" style={{ backgroundColor: accentColor }}></div>
                    <div className="preview-line"></div>
                    <div className="preview-line preview-line--long"></div>
                </div>
                <div className="preview-section">
                    <div className="preview-line preview-line--title" style={{ backgroundColor: accentColor }}></div>
                    <div className="preview-line preview-line--medium"></div>
                </div>
            </div>
        </div>
    );
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className={`template-card ${isSelected ? 'template-card--selected' : ''}`}
            style={{
                '--template-primary': template.primaryColor,
                '--template-accent': template.accentColor,
            } as React.CSSProperties}
        >
            <LayoutPreview template={template} />

            <div className="template-card-info">
                <span className="template-icon">{template.icon}</span>
                <h4 className="template-name">{template.name}</h4>
                <p className="template-description">{template.description}</p>
            </div>

            {isSelected && (
                <div className="template-selected-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </button>
    );
};

export default TemplateSelector;
