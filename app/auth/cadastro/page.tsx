'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submission started');
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      console.log('Form data collected:', { name, email, password: '***', confirmPassword: '***' });

      if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos.');
        console.log('Validation failed: missing required fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        console.log('Validation failed: passwords do not match');
        return;
      }

      console.log('Starting Supabase signup...');
      // Register with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      console.log('Supabase signup response:', { user: authData?.user?.id, error: signUpError?.message });

      if (signUpError) {
        if (signUpError.message.includes('rate limit')) {
          throw new Error('Muitas tentativas de cadastro. Por favor, aguarde alguns minutos e tente novamente.');
        }
        throw signUpError;
      }

      if (authData.user) {
        console.log('Creating profile...');
        // Create profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: authData.user.email,
              full_name: name,
              subscription_tier: 'free',
            },
          ]);

        console.log('Profile creation response:', { error: profileError?.message });

        if (profileError) throw profileError;

        setSuccess(true);
        setEmail(email);
        
        // If there's a redirectedFrom parameter, use it, otherwise go to dashboard
        const redirectTo = searchParams.get('redirectedFrom') || '/dashboard';
        console.log('Redirecting to:', redirectTo);
        router.push(redirectTo);
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        if (err.message.includes('unique constraint')) {
          setError('Este e-mail já está cadastrado. Por favor, use outro e-mail ou faça login.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Ocorreu um erro ao criar sua conta. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
      console.log('Form submission completed');
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Verifique seu e-mail"
        subtitle="Enviamos um link de confirmação para seu e-mail"
      >
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-green-50 text-green-600 text-sm">
            <p className="mb-2">
              Enviamos um link de confirmação para <strong>{email}</strong>
            </p>
            <p>
              Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
              Se não encontrar o e-mail, verifique também sua pasta de spam.
            </p>
          </div>
          <Link
            href="/auth/entrar"
            className="block w-full text-center text-sm text-gray-600 hover:text-gray-900"
          >
            Voltar para o login
          </Link>
        </div>
      </AuthLayout>
    );
  }

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