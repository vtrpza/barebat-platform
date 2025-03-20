import { Builder } from '@builder.io/react';

export const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';

export const initBuilder = () => {
  Builder.init(BUILDER_API_KEY);

  // Configure global settings
  Builder.set({
    customInsertMenu: true,
    canTrack: false,
    env: process.env.NODE_ENV,
    userAttributes: {
      // Add user attributes for targeting if needed
      platform: 'barebat',
    },
  });

  // Register custom targeting attributes
  Builder.setUserAttributes({
    // Example: subscription tier for premium templates
    subscriptionTier: 'free',
  });
};

export const builderConfig = {
  // Site URL for previews
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Default preview URL
  previewUrl: '/preview',
  
  // Restrict editing to specific paths
  allowedPaths: ['/sites/*'],
  
  // Custom components location
  componentsPath: 'components/builder/custom',
  
  // Editor settings
  editor: {
    settings: {
      hideStyleTab: false,
      hideMainTabs: false,
      hideDataTab: false,
      hideAnimateTab: true,
      hideActionsTab: true,
    },
    presets: {
      responsiveBreakpoints: [
        { name: 'Mobile', width: 320, height: 568 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1280, height: 800 },
      ],
    },
  },
  
  // Content models
  models: {
    'bar-mitzvah-site': {
      name: 'Bar Mitzvah Site',
      hideFromUI: false,
      defaults: {
        title: 'New Bar Mitzvah Site',
      },
    },
    'bat-mitzvah-site': {
      name: 'Bat Mitzvah Site',
      hideFromUI: false,
      defaults: {
        title: 'New Bat Mitzvah Site',
      },
    },
  },
}; 