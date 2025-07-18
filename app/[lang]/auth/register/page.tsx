'use client';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import RegisterPageComponent from '@/contexts/auth/presentation/components/pages/register-page/register-page';
import { toast } from 'sonner';

const RegisterPage = () => {
  const t = useTranslations();
  const { register, registerStatus } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = useCallback(
    async (data: AuthFormType) => {
      setIsLoading(true);
      await register({ email: data.email, password: data.password });
      setIsLoading(false);
    },
    [register],
  );

  useEffect(() => {
    switch (registerStatus) {
      case 'success':
        router.push('/');
        break;
      case 'error':
        toast.error(t('pages.auth.register.error'));
        break;
    }
  }, [registerStatus, router]);

  return (
    <RegisterPageComponent
      handleRegister={handleRegister}
      isLoading={isLoading}
    />
  );
};

export default RegisterPage;
