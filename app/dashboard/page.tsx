import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sites Ativos</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total de Presentes</h3>
          <p className="text-3xl font-bold text-purple-600">R$ 0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Visualizações</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Bem-vindo ao BAREBAT</h2>
          <p className="text-gray-600 mb-4">
            Olá {user?.email}, bem-vindo à sua área administrativa. Aqui você pode:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Criar e gerenciar seus sites de Bar/Bat Mitzvah</li>
            <li>Personalizar templates usando nosso editor visual</li>
            <li>Acompanhar presentes e mensagens dos convidados</li>
            <li>Visualizar estatísticas e relatórios</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 