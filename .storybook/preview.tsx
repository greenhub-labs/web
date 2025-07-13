import React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/nextjs-vite';
import '../app/globals.css';
import enMessages from '../locales/en.json'; // Importa el archivo de mensajes
import { NextIntlClientProvider } from 'next-intl';
import { SidebarProvider } from '@/contexts/shared/presentation/components/ui/sidebar';

// Decorador global para Storybook
const withProviders = (Story, context) => {
  // Detecta si la story es de Auth (ajusta el prefijo si es necesario)
  const kind = context.kind || context.title || '';
  const isAuthStory = kind.toLowerCase().startsWith('auth');

  const content = (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent', // o el color que prefieras
        }}
      >
        {Story(context)}
      </div>
    </NextIntlClientProvider>
  );

  if (isAuthStory) {
    return content;
  }
  return <SidebarProvider>{content}</SidebarProvider>;
};

export const decorators = [withProviders];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
