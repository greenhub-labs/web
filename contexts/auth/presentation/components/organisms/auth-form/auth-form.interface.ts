export interface AuthFormProps extends React.ComponentProps<'form'> {
  mode: 'login' | 'signup';
  /**
   * URL to navigate to when switching between login/signup
   */
  switchUrl: string;
  /**
   * Text for the switch link (e.g., 'Sign up' or 'Login')
   */
  switchText: string;
}
