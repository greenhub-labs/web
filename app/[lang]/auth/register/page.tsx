'use client';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const RegisterPage = () => {
  const t = useTranslations();
  const { register, registerStatus } = useAuth();
  const router = useRouter();

  const handleRegister = async (data: AuthFormType) => {
    await register({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (registerStatus === 'success') {
      router.push('/');
    }
  }, [registerStatus, router]);

  return (
    <AuthTemplate>
      <AuthForm
        mode="signup"
        switchUrl="/auth/login"
        switchText={t('pages.auth.register.login')}
        onSubmit={handleRegister}
        isLoading={registerStatus === 'pending'}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;
