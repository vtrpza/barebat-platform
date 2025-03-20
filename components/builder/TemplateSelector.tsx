'use client';

import { useState } from 'react';
import { Template, defaultTemplates } from '@/lib/builder/templates';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  userTier: 'free' | 'premium' | 'professional';
}

export const TemplateSelector = ({ onSelect, userTier }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const canAccessTemplate = (template: Template) => {
    if (!template.isPremium) return true;
    return userTier === 'premium' || userTier === 'professional';
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h2>
          <p className="text-lg text-gray-600">
            Select a template to start creating your Bar/Bat Mitzvah website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative rounded-lg overflow-hidden border transition-all duration-200 ${
                selectedTemplate?.id === template.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  {template.isPremium && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Premium
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{template.description}</p>

                <button
                  onClick={() => {
                    setSelectedTemplate(template);
                    onSelect(template);
                  }}
                  disabled={!canAccessTemplate(template)}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                    canAccessTemplate(template)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAccessTemplate(template)
                    ? 'Use Template'
                    : 'Upgrade to Access'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {userTier === 'free' && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Want access to premium templates and more features?
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 