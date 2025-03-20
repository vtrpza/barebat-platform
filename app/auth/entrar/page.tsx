'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // TODO: Implement login logic with Supabase
      
      router.push('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      subtitle="Entre com sua conta para continuar"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

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
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
          </label>

          <Link
            href="/auth/esqueci-senha"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <AuthButton type="submit" isLoading={isLoading}>
          Entrar
        </AuthButton>

        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link
            href="/auth/cadastro"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
} 