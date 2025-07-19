import type { Meta, StoryObj } from '@storybook/react';
import { PlotCardHeader } from './plot-card-header';

const meta: Meta<typeof PlotCardHeader> = {
  title: 'Plots/Atoms/PlotCardHeader',
  component: PlotCardHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Header component for plot cards with name, description, and status badge.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Bancal A',
    description: 'Plot for vegetables and herbs',
    status: 'active',
  },
};

export const LongName: Story = {
  args: {
    name: 'Bancal con nombre muy largo que debería truncarse correctamente',
    description:
      'Esta es una descripción muy larga que también debería truncarse para mantener el diseño limpio y organizado',
    status: 'active',
  },
};

export const Inactive: Story = {
  args: {
    name: 'Bancal B',
    description: 'Temporarily out of use',
    status: 'inactive',
  },
};

export const Preparing: Story = {
  args: {
    name: 'Bancal C',
    description: 'Preparing for new planting',
    status: 'preparing',
  },
};

export const Resting: Story = {
  args: {
    name: 'Bancal D',
    description: 'Resting for soil recovery',
    status: 'resting',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <PlotCardHeader
        name="Bancal Activo"
        description="En uso activo con cultivos"
        status="active"
      />
      <PlotCardHeader
        name="Bancal Inactivo"
        description="Temporalmente fuera de uso"
        status="inactive"
      />
      <PlotCardHeader
        name="Bancal Preparando"
        description="En preparación para nueva siembra"
        status="preparing"
      />
      <PlotCardHeader
        name="Bancal Descansando"
        description="En barbecho para recuperación del suelo"
        status="resting"
      />
    </div>
  ),
};
