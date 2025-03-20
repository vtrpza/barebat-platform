'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TemplateSelector from '@/components/editor/TemplateSelector';
import TemplatePreview from '@/components/editor/TemplatePreview';
import TemplateCustomizer from '@/components/editor/TemplateCustomizer';
import { Template, defaultTemplates } from '@/lib/builder/templates';

export default function NewSitePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customizedData, setCustomizedData] = useState<any>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCustomizedData(template.data);
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleCustomizationUpdate = (updatedData: any) => {
    setCustomizedData(updatedData);
  };

  const handleCreateSite = async () => {
    try {
      const response = await fetch('/api/sites/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate?.id,
          data: customizedData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create site');
      }

      const data = await response.json();
      router.push(`/editor/${data.siteId}`);
    } catch (error) {
      console.error('Error creating site:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Site</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <TemplateSelector
            templates={defaultTemplates}
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
          />
        </div>

        {selectedTemplate && (
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">{selectedTemplate.name}</h2>
              <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <TemplatePreview
                    template={{
                      ...selectedTemplate,
                      data: customizedData || selectedTemplate.data,
                    }}
                    onCustomize={handleCustomize}
                  />
                </div>

                {isCustomizing && (
                  <div>
                    <TemplateCustomizer
                      template={selectedTemplate}
                      onUpdate={handleCustomizationUpdate}
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCreateSite}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  disabled={!selectedTemplate}
                >
                  Create Site
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 