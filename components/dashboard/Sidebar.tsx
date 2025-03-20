import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Visão Geral', href: '/dashboard', icon: '📊' },
  { name: 'Meus Sites', href: '/dashboard/sites', icon: '🌐' },
  { name: 'Editor', href: '/dashboard/editor', icon: '✏️' },
  { name: 'Presentes', href: '/dashboard/gifts', icon: '🎁' },
  { name: 'Configurações', href: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm h-screen fixed">
      <div className="px-4 py-6">
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-2 mb-8"
        >
          <span className="text-2xl">🎉</span>
          <span className="text-xl font-bold">BAREBAT</span>
        </Link>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 