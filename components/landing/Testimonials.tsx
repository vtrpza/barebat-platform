'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import SectionContainer from './SectionContainer'
import SectionHeading from './SectionHeading'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Ana Goldstein',
    role: 'Mãe da Sarah',
    content: 'O BAREBAT foi essencial para organizar o Bat Mitzvah da minha filha. A plataforma é intuitiva e o suporte é excelente!',
    seed: 'ana123',
  },
  {
    name: 'Daniel Cohen',
    role: 'Pai do Gabriel',
    content: 'Conseguimos criar um site lindo para o Bar Mitzvah do nosso filho em poucos minutos. A lista de presentes integrada é fantástica!',
    seed: 'daniel456',
  },
  {
    name: 'Raquel Levy',
    role: 'Mãe do David',
    content: 'A gestão de convidados e os lembretes automáticos tornaram todo o processo muito mais fácil. Recomendo muito!',
    seed: 'raquel789',
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

export default function Testimonials() {
  return (
    <SectionContainer className="bg-white">
      <SectionHeading
        title="O que as famílias dizem"
        subtitle="Descubra por que centenas de famílias escolheram o BAREBAT para criar seus sites."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 grid gap-8 lg:grid-cols-3 sm:grid-cols-2"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            variants={item}
            className="relative group"
          >
            <div className="h-full rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      'h-5 w-5 transition-colors duration-300',
                      'text-yellow-400 group-hover:text-yellow-500'
                    )}
                  />
                ))}
              </div>
              <blockquote className="relative">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {testimonial.content}
                </p>
              </blockquote>
              <div className="relative mt-8 flex items-center gap-4">
                <div className="overflow-hidden rounded-full bg-gray-100 ring-4 ring-white transition-all duration-300 group-hover:ring-indigo-50 relative h-12 w-12">
                  <Image
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${testimonial.seed}&backgroundColor=b6e3f4`}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
} 