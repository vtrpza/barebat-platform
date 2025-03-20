import Link from 'next/link';
import { Site } from '@/types/site';

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        {site.thumbnail ? (
          <img
            src={site.thumbnail}
            alt={site.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">🎉</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{site.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{site.eventDate ? new Date(site.eventDate).toLocaleDateString('pt-BR') : 'Data não definida'}</p>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${
            site.status === 'published' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {site.status === 'published' ? 'Publicado' : 'Rascunho'}
          </span>
          <div className="space-x-2">
            <Link
              href={`/dashboard/editor/${site.id}`}
              className="inline-flex items-center px-3 py-1 border border-purple-600 text-sm text-purple-600 rounded-md hover:bg-purple-50"
            >
              Editar
            </Link>
            <Link
              href={`/sites/${site.slug}`}
              target="_blank"
              className="inline-flex items-center px-3 py-1 bg-purple-600 text-sm text-white rounded-md hover:bg-purple-700"
            >
              Visualizar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 