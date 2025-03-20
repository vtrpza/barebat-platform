'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;

      if (!email) {
        setError('Por favor, insira seu e-mail.');
        return;
      }

      // TODO: Implement password reset logic with Supabase
      
      setSuccess(true);
    } catch (err) {
      setError('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="E-mail enviado!"
        subtitle="Verifique sua caixa de entrada para redefinir sua senha"
      >
        <div className="space-y-6">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            Enviamos um link para redefinir sua senha. Por favor, verifique seu e-mail.
          </div>

          <Link href="/auth/entrar">
            <AuthButton variant="outline">
              Voltar para o login
            </AuthButton>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Digite seu e-mail para receber um link de redefinição"
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

        <AuthButton type="submit" isLoading={isLoading}>
          Enviar link de redefinição
        </AuthButton>

        <p className="text-center text-sm text-gray-600">
          Lembrou sua senha?{' '}
          <Link
            href="/auth/entrar"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Volte para o login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
} 