'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      // TODO: Implement signup logic with Supabase
      
      router.push('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao criar sua conta. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece a criar seu site de Bar/Bat Mitzvah"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <AuthInput
          label="Nome completo"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Seu nome completo"
        />

        <AuthInput
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
        />

        <AuthInput
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
        />

        <AuthInput
          label="Confirme sua senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Criar conta
        </AuthButton>

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link
            href="/auth/entrar"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Entre aqui
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
} 