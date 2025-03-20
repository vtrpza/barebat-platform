'use client';

import { Builder } from '@builder.io/react';
import { useState } from 'react';

interface RSVPFormProps {
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
  showDietaryRestrictions?: boolean;
  showAdditionalGuests?: boolean;
  maxAdditionalGuests?: number;
}

export const RSVPForm = ({
  backgroundColor = '#ffffff',
  accentColor = '#2563eb',
  textColor = '#1f2937',
  title = 'RSVP',
  subtitle = 'Please let us know if you can join us in this special moment',
  submitButtonText = 'Confirm Attendance',
  showDietaryRestrictions = true,
  showAdditionalGuests = true,
  maxAdditionalGuests = 4,
}: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    additionalGuests: 0,
    dietaryRestrictions: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be handled by the site's backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-8 rounded-lg"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-80">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="attending" className="block text-sm font-medium mb-2">
              Will you attend? *
            </label>
            <select
              id="attending"
              name="attending"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
              value={formData.attending}
              onChange={handleChange}
            >
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>

          {showAdditionalGuests && formData.attending === 'yes' && (
            <div>
              <label htmlFor="additionalGuests" className="block text-sm font-medium mb-2">
                Additional Guests
              </label>
              <select
                id="additionalGuests"
                name="additionalGuests"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
                value={formData.additionalGuests}
                onChange={handleChange}
              >
                {Array.from({ length: maxAdditionalGuests + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showDietaryRestrictions && formData.attending === 'yes' && (
            <div>
              <label htmlFor="dietaryRestrictions" className="block text-sm font-medium mb-2">
                Dietary Restrictions
              </label>
              <input
                type="text"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                placeholder="Kosher, vegetarian, allergies, etc."
              />
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: accentColor, backgroundColor: 'white', color: '#1f2937' }}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: accentColor }}
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

// Register the component with Builder.io
Builder.registerComponent(RSVPForm, {
  name: 'RSVP Form',
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#ffffff',
    },
    {
      name: 'accentColor',
      type: 'color',
      defaultValue: '#2563eb',
    },
    {
      name: 'textColor',
      type: 'color',
      defaultValue: '#1f2937',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'RSVP',
    },
    {
      name: 'subtitle',
      type: 'string',
      defaultValue: 'Please let us know if you can join us in this special moment',
    },
    {
      name: 'submitButtonText',
      type: 'string',
      defaultValue: 'Confirm Attendance',
    },
    {
      name: 'showDietaryRestrictions',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showAdditionalGuests',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'maxAdditionalGuests',
      type: 'number',
      defaultValue: 4,
    },
  ],
}); 