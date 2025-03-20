'use client';

import { Builder } from '@builder.io/react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  celebrantName: string;
  eventDate: string;
  location?: string;
}

export const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  celebrantName,
  eventDate,
  location,
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{celebrantName}</h1>
        <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
        {subtitle && <p className="text-xl md:text-2xl mb-8">{subtitle}</p>}
        <div className="text-2xl space-y-2">
          <p>{eventDate}</p>
          {location && <p>{location}</p>}
        </div>
      </div>
    </div>
  );
};

// Register the component with Builder.io
Builder.registerComponent(HeroSection, {
  name: 'Hero Section',
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: 'Bar Mitzvah Celebration',
    },
    {
      name: 'subtitle',
      type: 'string',
    },
    {
      name: 'backgroundImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      required: true,
    },
    {
      name: 'celebrantName',
      type: 'string',
      required: true,
      defaultValue: 'David Cohen',
    },
    {
      name: 'eventDate',
      type: 'string',
      required: true,
      defaultValue: 'December 15, 2024',
    },
    {
      name: 'location',
      type: 'string',
    },
  ],
}); 