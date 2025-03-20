'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface NewSiteFormProps {
  userId: string;
}

export default function NewSiteForm({ userId }: NewSiteFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const eventDate = formData.get('eventDate') as string;
    const template = formData.get('template') as string;

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const { error: insertError } = await supabase.from('sites').insert({
        title,
        slug,
        eventDate,
        template,
        userId,
        status: 'draft',
        settings: {
          theme: 'default',
          fonts: ['Inter'],
          colors: {
            primary: '#6B46C1',
            secondary: '#4A5568',
            accent: '#ED64A6',
          },
        },
      });

      if (insertError) throw insertError;

      router.push('/dashboard/sites');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Site
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ex: Bar Mitzvah do David"
        />
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data do Evento
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
          Template
        </label>
        <select
          id="template"
          name="template"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="modern">Moderno</option>
          <option value="classic">Clássico</option>
          <option value="minimal">Minimalista</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Site'}
        </button>
      </div>
    </form>
  );
} 