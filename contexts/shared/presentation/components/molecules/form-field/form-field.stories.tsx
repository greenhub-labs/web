import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './form-field';

const meta: Meta<typeof FormField> = {
  title: 'Shared/Molecules/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component: `
**FormField** is a flexible input component supporting text, textarea, number, and select types.

- Use  label for the field label.
- Use  type to select the input type ('text', 'email', 'number', 'textarea', 'select').
- Use  placeholder and  helperText for guidance.
- Use  error to show validation errors.
- Use  required to mark the field as mandatory.
- Use  options for select type.
- Use  disabled to disable the field.

**Usage:**
~~~tsx
<FormField label="Name" name="name" value={value} onChange={fn} />
~~~
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Text: Story = {
  args: {
    label: 'Name',
    name: 'name',
    value: 'Example value',
    onChange: () => {},
    placeholder: 'Enter your name',
    helperText: 'This is your full name.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard text input with helper text and placeholder.',
      },
    },
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    name: 'age',
    value: '25',
    onChange: () => {},
    type: 'number',
    placeholder: 'Enter your age',
    helperText: 'You must be at least 18.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Number input with helper text.',
      },
    },
  },
};

export const Textarea: Story = {
  args: {
    label: 'Bio',
    name: 'bio',
    value: 'Example bio',
    onChange: () => {},
    type: 'textarea',
    placeholder: 'Tell us about yourself',
    helperText: 'Max 200 characters.',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea input with custom rows and helper text.',
      },
    },
  },
};

export const Select: Story = {
  args: {
    label: 'Country',
    name: 'country',
    value: 'Spain',
    onChange: () => {},
    type: 'select',
    options: [
      { value: 'select', label: 'Select a country' },
      { value: 'es', label: 'Spain' },
      { value: 'fr', label: 'France' },
      { value: 'it', label: 'Italy' },
    ],
    helperText: 'Choose your country.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select input with options and helper text.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    name: 'email',
    value: 'example@example.com',
    onChange: () => {},
    type: 'email',
    error: 'Email is required',
    placeholder: 'Enter your email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a validation error below the input.',
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    name: 'password',
    value: 'password123',
    onChange: () => {},
    type: 'text',
    required: true,
    placeholder: 'Enter your password',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the required asterisk next to the label.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: 'readonlyuser',
    onChange: () => {},
    disabled: true,
    helperText: 'This field is disabled.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input field.',
      },
    },
  },
};
