'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/auth/shared/AuthLayout';
import AuthInput from '@/components/auth/shared/AuthInput';
import AuthButton from '@/components/auth/shared/AuthButton';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the token from URL query parameters
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      if (!token) {
        setError('Link de redefinição inválido ou expirado.');
        return;
      }

      // TODO: Implement password reset logic with Supabase
      
      router.push('/auth/entrar?reset=success');
    } catch (err) {
      setError('Ocorreu um erro ao redefinir sua senha. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout
        title="Link inválido"
        subtitle="Este link de redefinição de senha é inválido ou expirou"
      >
        <div className="space-y-6">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            Por favor, solicite um novo link de redefinição de senha.
          </div>

          <AuthButton
            variant="outline"
            onClick={() => router.push('/auth/esqueci-senha')}
          >
            Solicitar novo link
          </AuthButton>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Digite sua nova senha"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <AuthInput
          label="Nova senha"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
        />

        <AuthInput
          label="Confirme sua nova senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Redefinir senha
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Carregando..."
        subtitle="Por favor, aguarde"
      >
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
} 