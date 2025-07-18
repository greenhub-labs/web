import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FarmPageComponent from './farm-page';
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
const mockHandleEdit = () => {
  console.log('Edit clicked');
};
const mockHandleCancel = () => {
  console.log('Cancel clicked');
};
const mockHandleSave = () => {
  console.log('Save clicked');
};

const meta: Meta<typeof FarmPageComponent> = {
  title: 'Farms/Pages/FarmPage',
  component: FarmPageComponent,
  parameters: {
    docs: {
      description: {
        component: `
**FarmPageComponent** displays the farm settings page, including the editable farm info section and page actions.

- Pass a farm object and formData for the form state.
- Use isEditing to toggle between read-only and edit mode.
- Provide handlers for edit, cancel, save, and input changes.
- Pass errors for validation feedback.
- Use isLoading to disable actions during save.

**Usage:**
~~~tsx
<FarmPageComponent
  farm={farm}
  formData={formData}
  isEditing={false}
  handleEdit={fn}
  handleCancel={fn}
  handleSave={fn}
  handleInputChange={fn}
  errors={{}}
  isLoading={false}
/>
~~~
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FarmPageComponent>;

export const Default: Story = {
  args: {
    farm: mockFarm,
    formData: mockFarm,
    isEditing: false,
    handleEdit: mockHandleEdit,
    handleCancel: mockHandleCancel,
    handleSave: mockHandleSave,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isLoading: false,
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
    farm: mockFarm,
    formData: mockFarm,
    isEditing: true,
    handleEdit: mockHandleEdit,
    handleCancel: mockHandleCancel,
    handleSave: mockHandleSave,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'All fields are editable and Save/Cancel actions are shown.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    farm: mockFarm,
    formData: mockFarm,
    isEditing: false,
    handleEdit: mockHandleEdit,
    handleCancel: mockHandleCancel,
    handleSave: mockHandleSave,
    handleInputChange: mockHandleInputChange,
    errors: {},
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Buttons are disabled while loading.',
      },
    },
  },
};

export const WithErrors: Story = {
  args: {
    farm: mockFarm,
    formData: { ...mockFarm, name: '', country: '' },
    isEditing: true,
    handleEdit: mockHandleEdit,
    handleCancel: mockHandleCancel,
    handleSave: mockHandleSave,
    handleInputChange: mockHandleInputChange,
    errors: {
      name: 'Name is required',
      country: 'Country is required',
    },
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows validation errors for name and country fields in edit mode.',
      },
    },
  },
};
