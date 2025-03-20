'use client'

import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  GiftIcon, 
  UserGroupIcon,
  PencilSquareIcon,
  CameraIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline'
import SectionContainer from './SectionContainer'
import SectionHeading from './SectionHeading'

const features = [
  {
    name: 'Assistente de IA',
    description: 'Crie textos e personalize seu site com ajuda da nossa IA especializada em Bar e Bat Mitzvah.',
    icon: SparklesIcon,
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'Lista de Presentes Inteligente',
    description: 'Gerencie presentes e contribuições monetárias de forma simples e segura.',
    icon: GiftIcon,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Gestão de Convidados',
    description: 'Sistema de RSVP integrado com confirmações automáticas e lembretes.',
    icon: UserGroupIcon,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Editor Visual',
    description: 'Interface intuitiva para personalizar seu site sem conhecimento técnico.',
    icon: PencilSquareIcon,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    name: 'Galeria de Fotos',
    description: 'Compartilhe momentos especiais com uma galeria de fotos moderna e responsiva.',
    icon: CameraIcon,
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    name: 'Pagamentos Seguros',
    description: 'Receba contribuições monetárias com total segurança através do Stripe.',
    icon: CreditCardIcon,
    gradient: 'from-emerald-500 to-green-500',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <SectionContainer
      id="como-funciona"
      className="bg-gray-50"
    >
      <SectionHeading
        title="Tudo que você precisa em um só lugar"
        subtitle="Ferramentas poderosas para criar um site único e memorável para sua celebração."
      />

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.name}
            variants={item}
            className="relative group"
          >
            <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} group-hover:shadow-lg transition-all duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.name}
                </h3>
              </div>
              <p className="text-gray-500 flex-grow leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
} 