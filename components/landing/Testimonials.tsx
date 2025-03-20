import Image from 'next/image'

const testimonials = [
  {
    content:
      'O BAREBAT tornou a criação do site do Bar Mitzvah do meu filho super fácil. O assistente de IA ajudou muito com os textos e a organização dos presentes foi perfeita!',
    author: {
      name: 'Rachel Cohen',
      role: 'Mãe do Gabriel',
      imageUrl: '/testimonials/avatar-1.jpg',
    },
  },
  {
    content:
      'Adorei como o site ficou moderno e personalizado. Os convidados elogiaram muito a facilidade de confirmar presença e escolher presentes.',
    author: {
      name: 'Daniel Stern',
      role: 'Pai da Sarah',
      imageUrl: '/testimonials/avatar-2.jpg',
    },
  },
  {
    content:
      'A plataforma é incrível! Consegui criar um site lindo para minha Bat Mitzvah em poucos minutos. O suporte foi muito atencioso quando precisei de ajuda.',
    author: {
      name: 'Sofia Goldstein',
      role: 'Bat Mitzvah',
      imageUrl: '/testimonials/avatar-3.jpg',
    },
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            O que as famílias dizem sobre nós
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Junte-se a centenas de famílias que já criaram sites incríveis com BAREBAT.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author.name}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <blockquote className="flex-grow">
                <p className="text-lg text-gray-600">{testimonial.content}</p>
              </blockquote>
              <div className="mt-8 flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={testimonial.author.imageUrl}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 