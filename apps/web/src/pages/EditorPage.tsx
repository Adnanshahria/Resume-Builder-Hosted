import React, { useEffect } from 'react';
import { ResumeForm } from '../components/ResumeForm';
import { ResumeTemplate } from '../components/ResumeTemplate';
import { TemplateSelector } from '../components/TemplateSelector';
import { Pencil, Eye, Download, AlertTriangle, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead, SEO_CONFIG } from '../components/SEOHead';
import { useEditor } from '../contexts/EditorContext';
import { TemplateType, getTemplateConfig } from '../lib/template-configs';

interface EditorPageProps {
    lockedTemplate?: TemplateType;
}

export const EditorPage: React.FC<EditorPageProps> = ({ lockedTemplate }) => {
    const {
        data,
        setData,
        selectedTemplate,
        setSelectedTemplate,
        showTemplates,
        setShowTemplates,
        handleDownloadPDF,
        exportingPDF,
        previewScale,
        mobileView,
        setMobileView,
        containerRef,
        showPdfWarning,
        setShowPdfWarning,
        emptySectionsWarning,
        confirmPdfDownload,
        getPreviewData,
        hasUserEdited,
        markAsEdited,
        enabledSections,
    } = useEditor();

    // Set template when locked (from route parameter)
    useEffect(() => {
        if (lockedTemplate && lockedTemplate !== selectedTemplate) {
            setSelectedTemplate(lockedTemplate);
        }
    }, [lockedTemplate, selectedTemplate, setSelectedTemplate]);

    // Get template configuration (for locked templates)
    const templateConfig = lockedTemplate ? getTemplateConfig(lockedTemplate) : null;

    // Wrap setData to mark as edited
    const handleDataChange = (newData: typeof data) => {
        markAsEdited();
        setData(newData);
    };

    // Get data for preview (placeholder or real)
    const previewData = getPreviewData();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-foreground flex flex-col">
            <SEOHead
                title={SEO_CONFIG.editor.title}
                description={SEO_CONFIG.editor.description}
                canonicalPath={SEO_CONFIG.editor.path}
            />

            {/* PDF Warning Modal */}
            {showPdfWarning && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center no-print" onClick={() => setShowPdfWarning(false)}>
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-slate-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Empty Sections Detected</h3>
                                <button onClick={() => setShowPdfWarning(false)} className="ml-auto text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                The following sections are enabled but have no data:
                            </p>

                            <div className="space-y-2 mb-6">
                                {emptySectionsWarning.map((section, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <span className="text-amber-600 dark:text-amber-400">⚠</span>
                                        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">{section}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                You can either add content to these sections or disable them in the editor to hide them from your resume.
                            </p>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
                            <Button variant="outline" onClick={() => setShowPdfWarning(false)} className="flex-1">
                                Go Back & Edit
                            </Button>
                            <Button onClick={confirmPdfDownload} className="flex-1 bg-amber-600 hover:bg-amber-700">
                                Download Anyway
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Template Selector Modal - Only show when not locked to a template */}
            {showTemplates && !lockedTemplate && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center no-print" onClick={() => setShowTemplates(false)}>
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <TemplateSelector
                                selectedTemplate={selectedTemplate}
                                onSelectTemplate={(template) => {
                                    setSelectedTemplate(template);
                                    setShowTemplates(false);
                                }}
                            />
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex justify-end bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
                            <Button variant="outline" onClick={() => setShowTemplates(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-0 sm:px-4 md:p-6 lg:p-8 no-print">
                {/* Mobile: Edit/Preview toggle bar */}
                <div className="lg:hidden flex items-center justify-between flex-wrap gap-2 px-3 py-2 mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-[76px] z-40 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center">
                        <button
                            onClick={() => setMobileView('edit')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-l-lg transition-all border-2 ${mobileView === 'edit'
                                ? 'bg-teal-500 text-white border-teal-500'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                                }`}
                        >
                            <Pencil className="w-4 h-4 inline mr-1" />
                            Editor
                        </button>
                        <button
                            onClick={() => setMobileView('preview')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-r-lg transition-all border-2 border-l-0 ${mobileView === 'preview'
                                ? 'bg-teal-500 text-white border-teal-500'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                                }`}
                        >
                            <Eye className="w-4 h-4 inline mr-1" />
                            Preview
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={exportingPDF}
                            className="px-2 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all flex items-center gap-1 text-sm font-medium disabled:opacity-50"
                            title="Download PDF with clickable links"
                        >
                            <Download className={`w-4 h-4 ${exportingPDF ? 'animate-pulse' : ''}`} />
                            PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full">

                    {/* Left: Editor */}
                    <div className={`space-y-4 sm:space-y-6 overflow-y-auto lg:max-h-[calc(100vh-100px)] scrollbar-hide pb-6 lg:pb-20 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'
                        }`}>
                        <ResumeForm data={data} onChange={handleDataChange} template={selectedTemplate} templateConfig={templateConfig} />
                    </div>

                    {/* Right: Preview */}
                    <div className={`relative bg-white dark:bg-slate-800/50 rounded-xl lg:rounded-2xl border-2 border-teal-500 lg:border lg:border-slate-200 dark:lg:border-slate-700 overflow-hidden flex flex-col min-h-[80vh] lg:min-h-0 shadow-lg mx-3 lg:mx-0 ${mobileView === 'edit' ? 'hidden lg:flex' : 'flex'
                        }`}>

                        {/* Placeholder indicator */}
                        {!hasUserEdited && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium z-10">
                                📝 Sample Preview - Start typing to see your resume
                            </div>
                        )}

                        <div
                            ref={containerRef}
                            className={`flex-1 overflow-y-auto overflow-x-hidden p-0 sm:p-2 lg:p-6 flex justify-center items-start bg-slate-50 dark:bg-slate-900 ${!hasUserEdited ? 'pt-12' : ''}`}
                        >
                            <ResumeTemplate
                                data={previewData}
                                template={selectedTemplate}
                                scale={previewScale}
                                enabledSections={enabledSections}
                            />
                        </div>
                    </div>

                </div>
            </main>

            {/* Print View */}
            <div className="hidden print-only">
                <ResumeTemplate data={data} template={selectedTemplate} scale={1} enabledSections={enabledSections} />
            </div>
        </div>
    );
};

export default EditorPage;
