'use client';

import { ReactNode, useEffect } from 'react';
import { builder, Builder } from '@builder.io/react';

export function BuilderProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize the Builder SDK with your public API key
    builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

    // Configure Builder.io space settings
    Builder.settings({
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
  }, []);

  return <>{children}</>;
} 