'use client';

import { Template } from '@/lib/builder/templates';
import Image from 'next/image';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelect: (template: Template) => void;
}

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg border-2 transition-all ${
              selectedTemplate?.id === template.id
                ? 'border-primary ring-2 ring-primary ring-opacity-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(template)}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                className="object-cover"
              />
              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                  Premium
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 