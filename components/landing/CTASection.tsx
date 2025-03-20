import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20"
          >
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Pronto para começar?</span>
                <span className="block">Crie seu site gratuitamente hoje.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
                Junte-se a centenas de famílias que já criaram sites incríveis para suas celebrações.
                Comece gratuitamente e só pague se gostar.
              </p>
              <Link
                href="/sites/new"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50 transform transition-transform duration-200 hover:scale-105"
              >
                Criar Meu Site
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative -mt-6 aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/2] lg:mt-0"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1522158073024-e3c8e3e8a151?auto=format&fit=crop&q=80"
                alt="Família celebrando Bar Mitzvah"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-700 opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 