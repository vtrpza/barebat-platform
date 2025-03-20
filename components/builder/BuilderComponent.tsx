import { BuilderComponent as BuilderComponentBase, useIsPreviewing } from '@builder.io/react';
import { builder } from '@/lib/builder/client';
import { FC } from 'react';

interface BuilderPageProps {
  model: string;
  content?: any;
}

export const BuilderComponent: FC<BuilderPageProps> = ({ model, content }) => {
  const isPreviewing = useIsPreviewing();

  // If there's no content and we're not in preview mode, show nothing
  if (!content && !isPreviewing) {
    return null;
  }

  return (
    <BuilderComponentBase
      model={model}
      content={content}
      builder={builder}
    />
  );
}; 