'use client';

import { BuilderComponent as BuilderComponentBase, useIsPreviewing, BuilderContent } from '@builder.io/react';

interface BuilderPageProps {
  model: string;
  content?: BuilderContent;
}

export default function BuilderComponent({ model, content }: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  // Return null if there is no content and not previewing
  if (!content && !isPreviewing) {
    return null;
  }

  return (
    <BuilderComponentBase
      model={model}
      content={content as any} // Type assertion needed due to Builder.io types mismatch
    />
  );
} 