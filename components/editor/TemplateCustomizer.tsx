'use client';

import { useState } from 'react';
import { Template } from '@/lib/builder/templates';

interface CustomizationOption {
  id: string;
  label: string;
  type: 'color' | 'text' | 'image' | 'select';
  value: string;
  options?: string[];
}

interface TemplateCustomizerProps {
  template: Template;
  onUpdate: (updatedData: any) => void;
}

export default function TemplateCustomizer({ template, onUpdate }: TemplateCustomizerProps) {
  const [customizations, setCustomizations] = useState<Record<string, string>>({});

  const defaultOptions: CustomizationOption[] = [
    {
      id: 'primaryColor',
      label: 'Primary Color',
      type: 'color',
      value: '#000000'
    },
    {
      id: 'fontFamily',
      label: 'Font Style',
      type: 'select',
      value: 'modern',
      options: ['modern', 'classic', 'playful', 'elegant']
    },
    {
      id: 'celebrantName',
      label: 'Celebrant Name',
      type: 'text',
      value: ''
    }
  ];

  const handleCustomizationChange = (optionId: string, value: string) => {
    const newCustomizations = {
      ...customizations,
      [optionId]: value
    };
    setCustomizations(newCustomizations);
    
    // Update template data with new customizations
    const updatedData = {
      ...template.data,
      customizations: newCustomizations
    };
    onUpdate(updatedData);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Customize Template</h3>
      <div className="space-y-4">
        {defaultOptions.map((option) => (
          <div key={option.id} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {option.label}
            </label>
            {option.type === 'select' ? (
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={customizations[option.id] || option.value}
                onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              >
                {option.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            ) : option.type === 'color' ? (
              <input
                type="color"
                className="mt-1 block w-full h-10 rounded-md border-gray-300"
                value={customizations[option.id] || option.value}
                onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={customizations[option.id] || option.value}
                onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                placeholder={`Enter ${option.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 