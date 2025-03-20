import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewSiteForm from '@/components/dashboard/NewSiteForm';

export default async function NewSitePage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    redirect('/auth/entrar');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Criar Novo Site</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <NewSiteForm userId={session.user.id} />
      </div>
    </div>
  );
} 