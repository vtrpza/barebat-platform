import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
  containerClassName?: string
  as?: 'section' | 'div'
  containerId?: string
  id?: string
  initial?: any
  animate?: any
  whileInView?: any
  viewport?: any
  transition?: any
}

export default function SectionContainer({
  children,
  className,
  containerClassName,
  as = 'section',
  containerId,
  id,
  ...props
}: Props) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden py-24',
        className
      )}
      id={id}
      {...props}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          containerClassName
        )}
        id={containerId}
      >
        {children}
      </div>
    </Component>
  )
} 