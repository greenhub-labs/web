import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FarmInfoSection, { FarmInfoSectionProps } from './farm-info-section';
import { Farm } from '@/contexts/farms/domain/entities/farm.entity';

const mockFarm: Farm = {
  id: '1',
  name: 'Green Valley Farm',
  description: 'A beautiful organic farm in Andalusia.',
  country: 'Spain',
  state: 'Andalusia',
  city: 'Seville',
  street: 'Olive Road 123',
  postalCode: '41001',
  latitude: 37.3886,
  longitude: -5.9823,
  isActive: true,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z',
  deletedAt: null,
  members: [],
};

const mockHandleInputChange = (field: string, value: string) => {
  // eslint-disable-next-line no-console
  console.log(`Changed ${field}: ${value}`);
};

const meta: Meta<typeof FarmInfoSection> = {
  title: 'Farms/Molecules/FarmInfoSection',
  component: FarmInfoSection,
  parameters: {
    docs: {
      description: {
        component: `
**FarmInfoSection** displays and edits general, location, and coordinates information for a farm.

- Pass a  formData  object (Farm) and a  handleInputChange  callback.
- Use  isEditing  to toggle between read-only and editable states.
- Pass  errors  as a map of field names to error messages.

**Usage:**
~~~tsx
<FarmInfoSection formData={farm} handleInputChange={fn} errors={{}} isEditing={false} />
~~~
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FarmInfoSection>;

export const Default: Story = {
  args: {
    formData: mockFarm,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isEditing: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default view with all farm data in read-only mode.',
      },
    },
  },
};

export const Editing: Story = {
  args: {
    formData: mockFarm,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All fields are editable.',
      },
    },
  },
};

export const WithErrors: Story = {
  args: {
    formData: { ...mockFarm, name: '', country: '' },
    handleInputChange: mockHandleInputChange,
    errors: {
      name: 'Name is required',
      country: 'Country is required',
    },
    isEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows validation errors for name and country fields.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    formData: null,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isEditing: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state (no farm data).',
      },
    },
  },
};
