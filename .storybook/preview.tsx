import React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/nextjs-vite';
import '../app/globals.css';
import enMessages from '../locales/en.json'; // Importa el archivo de mensajes
import { NextIntlClientProvider } from 'next-intl';

// Decorador global para Storybook
const withNextIntl = (Story, context) => (
  <NextIntlClientProvider locale="en" messages={enMessages}>
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
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

export const decorators = [withNextIntl];

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
