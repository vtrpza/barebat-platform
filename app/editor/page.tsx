'use client';

import BuilderComponent from '@/components/builder/BuilderComponent';

export default function EditorPage() {
  return (
    <div className="w-full min-h-screen">
      <BuilderComponent model="page" />
    </div>
  );
} 