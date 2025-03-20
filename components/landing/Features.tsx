import { 
  SparklesIcon, 
  GiftIcon, 
  UserGroupIcon,
  PencilSquareIcon,
  CameraIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Assistente de IA',
    description: 'Crie textos e personalize seu site com ajuda da nossa IA especializada em Bar e Bat Mitzvah.',
    icon: SparklesIcon,
  },
  {
    name: 'Lista de Presentes Inteligente',
    description: 'Gerencie presentes e contribuições monetárias de forma simples e segura.',
    icon: GiftIcon,
  },
  {
    name: 'Gestão de Convidados',
    description: 'Sistema de RSVP integrado com confirmações automáticas e lembretes.',
    icon: UserGroupIcon,
  },
  {
    name: 'Editor Visual',
    description: 'Interface intuitiva para personalizar seu site sem conhecimento técnico.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Galeria de Fotos',
    description: 'Compartilhe momentos especiais com uma galeria de fotos moderna e responsiva.',
    icon: CameraIcon,
  },
  {
    name: 'Pagamentos Seguros',
    description: 'Receba contribuições monetárias com total segurança através do Stripe.',
    icon: CreditCardIcon,
  },
]

export default function Features() {
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Ferramentas poderosas para criar um site único e memorável para sua celebração.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:border-indigo-500 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="ml-3 text-xl font-medium text-gray-900">{feature.name}</h3>
                </div>
                <p className="text-gray-500 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 