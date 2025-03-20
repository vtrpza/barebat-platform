import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import SectionContainer from './SectionContainer'
import { cn } from '@/lib/utils'

export default function CTA() {
  return (
    <SectionContainer className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="Background"
          className="h-full w-full object-cover brightness-[0.2]"
        />
      </div>

      {/* Content */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para criar o site perfeito?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Comece agora mesmo e crie um site incrível para o Bar ou Bat Mitzvah da sua família.
            Experimente gratuitamente por 14 dias!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group relative flex items-center gap-2 rounded-xl bg-white px-6 py-3',
                'text-base font-semibold text-gray-900 transition-all duration-300',
                'hover:bg-gray-50 hover:shadow-lg'
              )}
            >
              Comece Gratuitamente
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <a
              href="#como-funciona"
              className="text-base font-semibold leading-6 text-white hover:text-gray-300 transition-colors duration-300"
            >
              Saiba mais <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
} 