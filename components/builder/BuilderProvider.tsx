'use client';

import { ReactNode, useEffect } from 'react';
import { builder, Builder } from '@builder.io/react';

export function BuilderProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    try {
      // Initialize the Builder SDK with your public API key
      const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
      if (!apiKey) {
        console.warn('No Builder API key found. Please add your public API key to .env.local');
        return;
      }

      // Initialize Builder instance
      builder.init(apiKey);

      // Configure Builder.io settings
      Builder.set({
        customInsertMenu: true,
        hideStyleTab: false,
        hideMainTabs: false,
        hideDataTab: false,
        hideComponentsTab: false,
        canTrack: false,
        env: process.env.NODE_ENV,
        userAttributes: {
          platform: 'barebat',
        },
      });

      // Register custom targeting attributes
      builder.setUserAttributes({
        subscriptionTier: 'free',
      });
    } catch (error) {
      console.error('Error initializing Builder.io:', error);
    }
  }, []);

  return <>{children}</>;
} 