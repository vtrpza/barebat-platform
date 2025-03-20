import { Builder, useIsPreviewing } from '@builder.io/react';
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/builder/custom/HeroSection';
import { CountdownTimer } from '@/components/builder/custom/CountdownTimer';

// Initialize the Builder SDK with your public API key
export const initBuilder = () => {
  Builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');
};

// Custom hook to fetch and manage Builder.io content
export const useBuilderContent = (modelName: string) => {
  const [content, setContent] = useState<any>(null);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    async function fetchContent() {
      const content = await Builder.get(modelName, {
        previewMode: isPreviewing,
      }).promise();
      setContent(content);
    }

    fetchContent();
  }, [modelName, isPreviewing]);

  return content;
};

// Register custom components
export const registerComponents = () => {
  // Components will be registered in their own files
  // This function is kept for potential future global registration needs
};

// Initialize on the client side
if (typeof window !== 'undefined') {
  initBuilder();
}

// Configure Builder.io space settings
Builder.settings({
  customInsertMenu: true,
  hideStyleTab: false,
  hideMainTabs: false,
  hideDataTab: false,
  hideComponentsTab: false,
});

export { Builder as builder }; 