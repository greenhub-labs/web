import type { Meta, StoryObj } from '@storybook/react';
import { PlotCardActions } from './plot-card-actions';

const meta: Meta<typeof PlotCardActions> = {
  title: 'Plots/Atoms/PlotCardActions',
  component: PlotCardActions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Action buttons for plot cards with view details and delete functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onViewDetails: { action: 'view-details' },
    onDelete: { action: 'delete' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    plotId: 'plot-1',
  },
};

export const WithCustomHandlers: Story = {
  args: {
    plotId: 'plot-2',
    onViewDetails: (plotId) => console.log('View details for:', plotId),
    onDelete: (plotId) => console.log('Delete plot:', plotId),
  },
};

export const MultipleActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Plot 1</h3>
        <PlotCardActions
          plotId="plot-1"
          onViewDetails={(plotId) => console.log('View details for:', plotId)}
          onDelete={(plotId) => console.log('Delete plot:', plotId)}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Plot 2</h3>
        <PlotCardActions
          plotId="plot-2"
          onViewDetails={(plotId) => console.log('View details for:', plotId)}
          onDelete={(plotId) => console.log('Delete plot:', plotId)}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Plot 3</h3>
        <PlotCardActions
          plotId="plot-3"
          onViewDetails={(plotId) => console.log('View details for:', plotId)}
          onDelete={(plotId) => console.log('Delete plot:', plotId)}
        />
      </div>
    </div>
  ),
};
