import React, { useState } from 'react';
import { SelectField } from './select-field';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SelectField> = {
  title: 'Shared/Molecules/SelectField',
  component: SelectField,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    options: { control: 'object' },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof SelectField>;

const exampleOptions = [
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
  { value: 'it', label: 'Italia' },
];

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        {...args}
        value={value}
        onChange={setValue}
        options={args.options || exampleOptions}
      />
    );
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Choose your country',
    options: exampleOptions,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        {...args}
        value={value}
        onChange={setValue}
        options={args.options || exampleOptions}
        error="This field is required"
      />
    );
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: exampleOptions,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        {...args}
        value={value}
        onChange={setValue}
        options={args.options || exampleOptions}
        disabled
      />
    );
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: exampleOptions,
  },
};
