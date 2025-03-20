import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-100 to-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
            Crie o Site Perfeito para sua{' '}
            <span className="text-indigo-600">
              Bar ou Bat Mitzvah
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Com BAREBAT, você cria um site incrível em minutos usando IA. 
            Compartilhe momentos especiais, gerencie presentes e RSVPs em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sites/new"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
            >
              Comece Gratuitamente
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg"
            >
              Como Funciona
            </Link>
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-gradient-to-b from-indigo-100 to-white text-lg text-gray-500">
              Usado e aprovado por centenas de famílias
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 