import { SignInForm } from '@/components/shared/SignInForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <a href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
              crie uma nova conta
            </a>
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
} 