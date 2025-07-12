'use client';
import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useTranslations } from 'next-intl';

const RegisterPage = () => {
  const t = useTranslations();
  return (
    <AuthTemplate>
      <AuthForm
        mode="signup"
        switchUrl="/auth/login"
        switchText={t('pages.auth.register.login')}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;
