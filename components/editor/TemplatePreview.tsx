'use client';

import { useState, useEffect } from 'react';
import { BuilderComponent } from '@builder.io/react';
import { useBuilderContent } from '@/lib/builder/client';
import { Template } from '@/lib/builder/templates';

interface TemplatePreviewProps {
  template: Template;
  onCustomize?: () => void;
}

export default function TemplatePreview({ template, onCustomize }: TemplatePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const content = useBuilderContent(template.id);

  useEffect(() => {
    if (content) {
      setIsLoading(false);
    }
  }, [content]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      <div className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <BuilderComponent
          model={template.id}
          content={template.data}
        />
        
        {onCustomize && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={onCustomize}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Customize Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 