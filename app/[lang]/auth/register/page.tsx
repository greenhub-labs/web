'use client';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import RegisterPageComponent from '@/contexts/auth/presentation/components/pages/register-page/register-page';

const RegisterPage = () => {
  const t = useTranslations();
  const { register, registerStatus } = useAuth();
  const router = useRouter();

  const handleRegister = useCallback(
    async (data: AuthFormType) => {
      await register({ email: data.email, password: data.password });
    },
    [register],
  );

  useEffect(() => {
    if (registerStatus === 'success') {
      router.push('/');
    }
  }, [registerStatus, router]);

  return (
    <RegisterPageComponent
      handleRegister={handleRegister}
      registerStatus={registerStatus}
    />
  );
};

export default RegisterPage;
