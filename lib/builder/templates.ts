import { Builder } from '@builder.io/react';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  data: any; // Builder.io content data
}

export const defaultTemplates: Template[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'A clean and modern design perfect for contemporary celebrations',
    thumbnail: '/templates/modern-minimal.jpg',
    isPremium: false,
    data: {
      blocks: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Hero Section',
            options: {
              title: 'Bar Mitzvah Celebration',
              subtitle: 'Join us for this special moment',
              backgroundImage: '/templates/hero-bg.jpg',
              celebrantName: '[Celebrant Name]',
              eventDate: '[Event Date]',
              location: '[Location]'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Countdown Timer',
            options: {
              eventDate: '2024-12-15',
              backgroundColor: '#f8fafc',
              accentColor: '#2563eb'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'RSVP Form',
            options: {
              backgroundColor: '#ffffff',
              accentColor: '#2563eb'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Gift Registry',
            options: {
              backgroundColor: '#f8fafc',
              accentColor: '#2563eb'
            }
          }
        }
      ]
    }
  },
  {
    id: 'traditional-elegant',
    name: 'Traditional Elegant',
    description: 'A timeless design that honors Jewish traditions',
    thumbnail: '/templates/traditional-elegant.jpg',
    isPremium: true,
    data: {
      blocks: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Hero Section',
            options: {
              title: 'Bar Mitzvah',
              subtitle: 'Celebrating the Journey to Jewish Adulthood',
              backgroundImage: '/templates/traditional-bg.jpg',
              celebrantName: '[Celebrant Name]',
              eventDate: '[Event Date]',
              location: '[Location]'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Countdown Timer',
            options: {
              eventDate: '2024-12-15',
              backgroundColor: '#f5eee6',
              accentColor: '#8b4513'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'RSVP Form',
            options: {
              backgroundColor: '#ffffff',
              accentColor: '#8b4513'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Gift Registry',
            options: {
              backgroundColor: '#f5eee6',
              accentColor: '#8b4513'
            }
          }
        }
      ]
    }
  }
]; 