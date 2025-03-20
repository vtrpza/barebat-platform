'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const tiers = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    commission: '8%',
    description: 'Perfeito para começar seu site.',
    features: [
      'Templates básicos',
      'Personalização limitada',
      'Suporte padrão',
      'Lista de presentes',
      'Sistema de RSVP',
      'Galeria de fotos básica',
    ],
    cta: 'Começar Grátis',
    href: '/auth/signin',
  },
  {
    name: 'Premium',
    price: 'R$ 99',
    commission: '5%',
    description: 'Recursos avançados para um site único.',
    features: [
      'Todos os templates',
      'Personalização completa',
      'Suporte prioritário',
      'Domínio personalizado',
      'Galeria avançada',
      'Assistente de IA avançado',
    ],
    cta: 'Escolher Premium',
    href: '/auth/signin?plan=premium',
    mostPopular: true,
  },
  {
    name: 'Profissional',
    price: 'R$ 199',
    commission: '3%',
    description: 'Máxima personalização e suporte.',
    features: [
      'Tudo do Premium',
      'Consultoria de design',
      'Múltiplos sites',
      'Analytics avançado',
      'Suporte VIP',
      'Menor taxa de comissão',
    ],
    cta: 'Escolher Profissional',
    href: '/auth/signin?plan=pro',
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planos para cada necessidade
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Escolha o plano ideal para criar o site perfeito para sua celebração.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border ${
                tier.mostPopular
                  ? 'border-indigo-600 shadow-md'
                  : 'border-gray-200'
              } p-8 bg-white`}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-gray-500">{tier.description}</p>
                <div className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">/mês</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Taxa de {tier.commission} sobre presentes monetários
                </p>
              </div>

              <ul className="space-y-4 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckIcon
                        className={`h-6 w-6 ${
                          tier.mostPopular ? 'text-indigo-600' : 'text-green-500'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-3 text-base text-gray-500">{feature}</p>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 block w-full rounded-md border ${
                  tier.mostPopular
                    ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                } px-6 py-3 text-center text-base font-medium transform transition-all duration-200 hover:scale-105`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 