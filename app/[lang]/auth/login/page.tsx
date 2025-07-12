'use client';

import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const t = useTranslations();
  return (
    <AuthTemplate>
      <AuthForm
        mode="login"
        switchUrl="/auth/register"
        switchText={t('pages.auth.login.register')}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
