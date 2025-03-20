export type SiteStatus = 'draft' | 'published';

export interface Site {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  eventDate?: string;
  status: SiteStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  template: string;
  customDomain?: string;
  settings: {
    theme: string;
    fonts: string[];
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
} 