'use client';

import { builder } from '@builder.io/react';
import { useEffect, useState } from 'react';

// Custom hook to fetch and manage Builder.io content
export function useBuilderContent(model: string, options: any = {}) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get(model, {
          userAttributes: {
            urlPath: window?.location?.pathname || '',
          },
          ...options,
        })
        .promise();

      setContent(content);
    }

    fetchContent();
  }, [model, options]);

  return content;
}

// Register custom components
export const registerComponents = () => {
  // Components will be registered in their own files
  // This function is kept for potential future global registration needs
};

export { builder }; 