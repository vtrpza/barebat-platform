'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  title: string | ReactNode
  subtitle?: string | ReactNode
  centered?: boolean
  className?: string
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  centered = true,
  className = ''
}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
} 