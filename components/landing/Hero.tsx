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
            <Link
              href="/sites/new"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Comece Gratuitamente
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-200 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-100 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Como Funciona
            </Link>
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
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=user-${i}&backgroundColor=indigo`}
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