import Image from 'next/image'
import { motion } from 'framer-motion'

const testimonials = [
  {
    content:
      'O BAREBAT tornou a criação do site do Bar Mitzvah do meu filho super fácil. O assistente de IA ajudou muito com os textos e a organização dos presentes foi perfeita!',
    author: {
      name: 'Rachel Cohen',
      role: 'Mãe do Gabriel',
      seed: 'rachel-cohen',
    },
  },
  {
    content:
      'Adorei como o site ficou moderno e personalizado. Os convidados elogiaram muito a facilidade de confirmar presença e escolher presentes.',
    author: {
      name: 'Daniel Stern',
      role: 'Pai da Sarah',
      seed: 'daniel-stern',
    },
  },
  {
    content:
      'A plataforma é incrível! Consegui criar um site lindo para minha Bat Mitzvah em poucos minutos. O suporte foi muito atencioso quando precisei de ajuda.',
    author: {
      name: 'Sofia Goldstein',
      role: 'Bat Mitzvah',
      seed: 'sofia-goldstein',
    },
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            O que as famílias dizem sobre nós
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Junte-se a centenas de famílias que já criaram sites incríveis com BAREBAT.
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author.name}
              variants={item}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-md"
            >
              <blockquote className="flex-grow">
                <p className="text-lg text-gray-600">{testimonial.content}</p>
              </blockquote>
              <div className="mt-8 flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${testimonial.author.seed}&backgroundColor=indigo`}
                    alt={testimonial.author.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.author.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 