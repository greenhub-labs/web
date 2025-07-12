import React from 'react';
import { AuthTemplateProps } from './auth-template.interface';

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div
      id="auth-template"
      className="flex flex-col items-center justify-center h-screen p-4 md:p-8"
    >
      {children}
    </div>
  );
};

export default AuthTemplate;
