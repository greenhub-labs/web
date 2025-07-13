import React from 'react';
import { AuthForm } from '../../organisms/auth-form/auth-form';
import AuthTemplate from '../../templates/auth-template/auth-template';

import { useTranslations } from 'next-intl';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';

export interface RegisterPageComponentProps {
  handleRegister: (data: AuthFormType) => Promise<void>;
  isLoading: boolean;
}

const RegisterPageComponent = ({
  handleRegister,
  isLoading,
}: RegisterPageComponentProps) => {
  const t = useTranslations();

  return (
    <AuthTemplate>
      <AuthForm
        mode="signup"
        switchUrl="/auth/login"
        switchText={t('pages.auth.register.login')}
        onSubmit={handleRegister}
        isLoading={isLoading}
      />
    </AuthTemplate>
  );
};

export default RegisterPageComponent;
