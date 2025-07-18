import React from 'react';
import { AuthForm } from '../../organisms/auth-form/auth-form';
import AuthTemplate from '../../templates/auth-template/auth-template';

import { useTranslations } from 'next-intl';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';

export interface LoginPageComponentProps {
  handleLogin: (data: AuthFormType) => Promise<void>;
  isLoading: boolean;
}

const LoginPageComponent = ({
  handleLogin,
  isLoading,
}: LoginPageComponentProps) => {
  const t = useTranslations();

  return (
    <AuthTemplate>
      <AuthForm
        mode="login"
        switchUrl="/auth/register"
        switchText={t('pages.auth.login.register')}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </AuthTemplate>
  );
};

export default LoginPageComponent;
