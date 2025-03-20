'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      const remember = formData.get('remember') === 'on';

      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      console.log('Attempting to sign in...');
      
      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('E-mail ou senha incorretos.');
        }
        throw signInError;
      }

      console.log('Sign in successful');

      // Get the redirect URL
      const redirectTo = searchParams.get('redirectedFrom') || '/dashboard';
      console.log('Redirecting to:', redirectTo);

      // Wait a moment for the session to be fully established
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use replace instead of push to avoid back button issues
      router.replace(redirectTo);
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      }
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

        {searchParams.get('reset') === 'success' && (
          <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            Sua senha foi redefinida com sucesso! Você já pode fazer login.
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