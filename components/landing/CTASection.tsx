'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block">Pronto para começar?</span>
            <span className="block text-indigo-200 mt-2 text-3xl sm:text-4xl">
              Crie seu site gratuitamente hoje.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-indigo-200">
            Junte-se a centenas de famílias que já criaram sites incríveis para suas celebrações.
            Comece gratuitamente e só pague se gostar.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/auth/entrar"
              className="inline-flex items-center px-8 py-4 border-2 border-white rounded-xl text-xl font-semibold text-white hover:bg-white hover:text-indigo-600 transform transition-all duration-200 hover:scale-105"
            >
              Comece Gratuitamente
            </Link>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-white opacity-5 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full bg-white opacity-5 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 