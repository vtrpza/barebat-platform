'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.svg"
              alt="BAREBAT Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 