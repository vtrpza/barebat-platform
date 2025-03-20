'use client';

import { Builder } from '@builder.io/react';
import { useState } from 'react';
import Image from 'next/image';

interface Photo {
  url: string;
  caption?: string;
  alt?: string;
}

interface PhotoGalleryProps {
  title?: string;
  subtitle?: string;
  photos: Photo[];
  columns?: 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  showCaptions?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const gapSizes = {
  small: 'gap-2',
  medium: 'gap-4',
  large: 'gap-6',
};

const columnClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export const PhotoGallery = ({
  title = 'Photo Gallery',
  subtitle,
  photos = [],
  columns = 3,
  gap = 'medium',
  rounded = true,
  showCaptions = true,
  backgroundColor = '#ffffff',
  textColor = '#1f2937',
}: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
        </div>

        <div className={`grid grid-cols-1 ${columnClasses[columns]} ${gapSizes[gap]}`}>
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div
                className={`relative aspect-square overflow-hidden ${
                  rounded ? 'rounded-lg' : ''
                }`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt || `Photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              {showCaptions && photo.caption && (
                <p className="mt-2 text-sm text-center">{photo.caption}</p>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-7xl max-h-[90vh] mx-4">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt || 'Selected photo'}
                width={1200}
                height={800}
                className="object-contain"
              />
              {selectedPhoto.caption && (
                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
                  {selectedPhoto.caption}
                </p>
              )}
              <button
                className="absolute top-4 right-4 text-white text-4xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Register the component with Builder.io
Builder.registerComponent(PhotoGallery, {
  name: 'Photo Gallery',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Photo Gallery',
    },
    {
      name: 'subtitle',
      type: 'string',
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      subFields: [
        {
          name: 'url',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
          required: true,
        },
        {
          name: 'caption',
          type: 'string',
        },
        {
          name: 'alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'columns',
      type: 'number',
      enum: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
      ],
      defaultValue: 3,
    },
    {
      name: 'gap',
      type: 'string',
      enum: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'rounded',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showCaptions',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#ffffff',
    },
    {
      name: 'textColor',
      type: 'color',
      defaultValue: '#1f2937',
    },
  ],
}); 