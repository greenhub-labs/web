import React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/nextjs-vite';
import '../app/globals.css';
import enMessages from '../locales/en.json'; // Importa el archivo de mensajes
import { NextIntlClientProvider } from 'next-intl';

// Decorador global para Storybook
const withNextIntl = (Story, context) => (
  <NextIntlClientProvider locale="en" messages={enMessages}>
    {Story(context)}
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
