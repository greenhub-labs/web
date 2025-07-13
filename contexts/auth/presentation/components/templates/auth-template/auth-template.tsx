import React from 'react';

export interface AuthTemplateProps extends React.PropsWithChildren {}

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
