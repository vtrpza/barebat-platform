'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionContainer from './SectionContainer'

export default function Hero() {
  return (
    <SectionContainer
      className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-indigo-50 via-white to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 blur-3xl opacity-50" />
      </div>

      <div className="relative">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
              Crie o Site Perfeito para sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                Bar ou Bat Mitzvah
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Com BAREBAT, você cria um site incrível em minutos usando IA. 
            Compartilhe momentos especiais, gerencie presentes e RSVPs em um só lugar.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link
                  href="/auth/entrar"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transform transition-all duration-200 hover:scale-105"
                >
                  Comece Gratuitamente
                </Link>
                <Link
                  href="#como-funciona"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transform transition-all duration-200 hover:scale-105"
                >
                  Como Funciona
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <div className="flex items-center justify-center space-x-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-12 w-12">
                    <Image
                      className="h-12 w-12 rounded-full ring-4 ring-white"
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=user-${i}&backgroundColor=b6e3f4`}
                      alt={`User ${i}`}
                      width={48}
                      height={48}
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900">+500 famílias</p>
                <p className="text-sm text-gray-500">já criaram seus sites</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  )
} 