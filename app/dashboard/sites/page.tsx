import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import SiteCard from '@/components/dashboard/SiteCard';
import { Site } from '@/types/site';

export default async function SitesPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Meus Sites</h2>
        <Link
          href="/dashboard/sites/new"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Criar Novo Site
        </Link>
      </div>

      {sites && sites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site: Site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">🎉</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum site criado ainda
          </h3>
          <p className="text-gray-500 mb-6">
            Comece criando seu primeiro site de Bar/Bat Mitzvah
          </p>
          <Link
            href="/dashboard/sites/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Criar Meu Primeiro Site
          </Link>
        </div>
      )}
    </div>
  );
} 