import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import type { Meta, StoryObj } from '@storybook/react';
import PlotsPageComponent from './plots-page';

/**
 * PlotsPageComponent displays a grid of plot cards for a farm.
 *
 * This component handles the presentation layer for the plots page, showing:
 * - A grid of plot cards with different statuses
 * - Create plot dialog functionality
 * - Loading states with skeleton
 * - Empty states when no plots exist
 * - Responsive design for mobile and desktop
 *
 * The component is pure and receives all data and callbacks as props,
 * making it easy to test and reuse in different contexts.
 */
const meta: Meta<typeof PlotsPageComponent> = {
  title: 'Plots/Pages/PlotsPage',
  component: PlotsPageComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component: `
## Overview
The PlotsPageComponent is responsible for displaying and managing plots within a farm.

## Features
- **Grid Layout**: Responsive grid showing plot cards
- **Create Plot**: Integration with CreatePlotDialog component (controlled via props)
- **Plot Management**: View details and delete plots
- **Loading States**: Skeleton loading while data loads
- **Empty States**: Handles farms with no plots
- **Responsive Design**: Adapts to mobile and desktop

## Props
- \`plots\`: Array of plot data to display
- \`isLoading\`: Boolean indicating if data is loading
- \`currentFarm\`: Current farm information
- \`isCreateDialogOpen\`: Controls CreatePlotDialog visibility (separate component)
- \`onViewDetails\`: Callback when viewing plot details
- \`onDelete\`: Callback when deleting a plot
- \`onCreatePlot\`: Callback when creating a new plot
- \`onOpenCreateDialog\`: Callback to control dialog state

## Note
The CreatePlotDialog is a separate component that appears as an overlay when \`isCreateDialogOpen\` is true.
The dialog component has its own story and documentation.
         `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background w-full max-w-none">
        <div className="w-full max-w-7xl mx-auto p-6">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    plots: {
      description: 'Array of plot data to display in the grid',
      control: 'object',
    },
    isLoading: {
      description: 'Whether the plots data is currently loading',
      control: 'boolean',
    },
    currentFarm: {
      description: 'Current farm information, null if no farm is selected',
      control: 'object',
    },
    isCreateDialogOpen: {
      description: 'Controls the visibility of the create plot dialog overlay',
      control: 'boolean',
    },
    onViewDetails: {
      description: 'Callback triggered when user clicks to view plot details',
      action: 'viewDetails',
    },
    onDelete: {
      description: 'Callback triggered when user deletes a plot',
      action: 'delete',
    },
    onCreatePlot: {
      description: 'Callback triggered when user creates a new plot',
      action: 'createPlot',
    },
    onOpenCreateDialog: {
      description: 'Callback to control the create dialog open state',
      action: 'openCreateDialog',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for stories
const mockFarm: Farm = {
  id: 'farm-1',
  name: 'Green Valley Farm',
  description:
    'A sustainable farm focused on organic produce and sustainable agriculture practices.',
  country: 'United States',
  state: 'California',
  city: 'Green Valley',
  postalCode: '95616',
  street: '123 Farm Road',
  latitude: 38.5816,
  longitude: -121.4944,
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-03-20T00:00:00Z',
  deletedAt: '',
  members: [],
  plots: [],
};

const mockPlots: Plot[] = [
  {
    id: 'plot-1',
    name: 'Vegetable Garden A',
    description:
      'A productive vegetable garden with mixed crops including tomatoes, lettuce, and herbs. Located in the north section of the farm.',
    status: 'active',
    soilType: 'loamy',
    soilPh: 6.8,
    farmId: 'farm-1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    deletedAt: '',
    dimensions: {
      width: 10,
      length: 5,
      height: 0.3,
      area: 50,
      perimeter: 30,
      volume: 15,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
  {
    id: 'plot-2',
    name: 'Herb Garden',
    description:
      'A small herb garden with aromatic plants for culinary use. Features basil, rosemary, thyme, and mint.',
    status: 'active',
    soilType: 'sandy',
    soilPh: 7.2,
    farmId: 'farm-1',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-18T16:45:00Z',
    deletedAt: '',
    dimensions: {
      width: 3,
      length: 4,
      height: 0.2,
      area: 12,
      perimeter: 14,
      volume: 2.4,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
  {
    id: 'plot-3',
    name: 'Resting Plot',
    description:
      'This plot is currently resting between growing seasons to restore soil nutrients and prevent crop diseases.',
    status: 'resting',
    soilType: 'clay',
    soilPh: 6.5,
    farmId: 'farm-1',
    createdAt: '2023-11-10T14:20:00Z',
    updatedAt: '2024-03-15T11:30:00Z',
    deletedAt: '',
    dimensions: {
      width: 8,
      length: 6,
      height: 0.4,
      area: 48,
      perimeter: 28,
      volume: 19.2,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
  {
    id: 'plot-4',
    name: 'New Plot',
    description:
      'A new plot being prepared for the upcoming growing season. Currently undergoing soil preparation and testing.',
    status: 'preparing',
    soilType: 'loamy',
    soilPh: 6.0,
    farmId: 'farm-1',
    createdAt: '2024-03-25T08:15:00Z',
    updatedAt: '2024-03-25T08:15:00Z',
    deletedAt: '',
    dimensions: {
      width: 12,
      length: 7,
      height: 0.3,
      area: 84,
      perimeter: 38,
      volume: 25.2,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
  {
    id: 'plot-5',
    name: 'Large Commercial Plot',
    description:
      'A large commercial plot used for extensive crop production. Features advanced irrigation systems and monitoring equipment.',
    status: 'active',
    soilType: 'loamy',
    soilPh: 6.9,
    farmId: 'farm-1',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-03-22T10:20:00Z',
    deletedAt: '',
    dimensions: {
      width: 20,
      length: 15,
      height: 0.5,
      area: 300,
      perimeter: 70,
      volume: 150,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
  {
    id: 'plot-6',
    name: 'Greenhouse Plot',
    description:
      'A controlled environment plot for year-round growing. Features temperature and humidity controls.',
    status: 'active',
    soilType: 'sandy',
    soilPh: 7.0,
    farmId: 'farm-1',
    createdAt: '2024-02-15T15:30:00Z',
    updatedAt: '2024-03-19T14:10:00Z',
    deletedAt: '',
    dimensions: {
      width: 6,
      length: 8,
      height: 0.3,
      area: 48,
      perimeter: 28,
      volume: 14.4,
      unitMeasurement: 'm',
      unitMeasurementCategory: 'metric',
    },
  },
];

/**
 * Default state showing multiple plots with different statuses.
 * This represents the typical view when a farm has several plots in various states.
 */
export const Default: Story = {
  args: {
    plots: mockPlots,
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default state showing multiple plots with different statuses (active, resting, preparing). This is the typical view when a farm has several plots in various states.',
      },
    },
  },
};

/**
 * Loading state showing the skeleton while data is being fetched.
 * This provides visual feedback to users during data loading.
 */
export const Loading: Story = {
  args: {
    plots: undefined,
    isLoading: true,
    currentFarm: null,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the skeleton loading state while plots data is being fetched. This provides visual feedback to users during data loading operations.',
      },
    },
  },
};

/**
 * Empty state when a farm has no plots yet.
 * This encourages users to create their first plot.
 */
export const Empty: Story = {
  args: {
    plots: [],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the empty state when a farm has no plots yet. This encourages users to create their first plot and provides a clear call-to-action.',
      },
    },
  },
};

/**
 * State when no farm is selected.
 * Shows the skeleton as no farm context is available.
 */
export const NoFarmSelected: Story = {
  args: {
    plots: undefined,
    isLoading: false,
    currentFarm: null,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the skeleton state when no farm is selected. This occurs when the user has not yet selected a farm or when farm data is not available.',
      },
    },
  },
};

/**
 * Single plot view showing how the grid looks with just one plot.
 * Useful for farms that are just starting out.
 */
export const SinglePlot: Story = {
  args: {
    plots: [mockPlots[0]],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the grid looks with just one plot. This is useful for farms that are just starting out or have limited plots.',
      },
    },
  },
};

/**
 * Many plots state showing a farm with extensive plot management.
 * Demonstrates how the grid handles many plots efficiently.
 */
export const ManyPlots: Story = {
  args: {
    plots: [
      ...mockPlots,
      {
        id: 'plot-7',
        name: 'Experimental Plot',
        description:
          'Testing new growing techniques and crop varieties. Used for research and development.',
        status: 'active',
        soilType: 'loamy',
        soilPh: 6.7,
        farmId: 'farm-1',
        createdAt: '2024-03-10T09:00:00Z',
        updatedAt: '2024-03-20T16:00:00Z',
        deletedAt: '',
        dimensions: {
          width: 5,
          length: 5,
          height: 0.3,
          area: 25,
          perimeter: 20,
          volume: 7.5,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
      {
        id: 'plot-8',
        name: 'Orchard Plot',
        description:
          'Dedicated to fruit trees and perennial crops. Features apple, pear, and cherry trees.',
        status: 'active',
        soilType: 'clay',
        soilPh: 6.8,
        farmId: 'farm-1',
        createdAt: '2024-01-20T11:00:00Z',
        updatedAt: '2024-03-18T13:00:00Z',
        deletedAt: '',
        dimensions: {
          width: 15,
          length: 10,
          height: 0.4,
          area: 150,
          perimeter: 50,
          volume: 60,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
      {
        id: 'plot-9',
        name: 'Inactive Plot',
        description:
          'This plot is temporarily out of service due to maintenance and soil restoration.',
        status: 'inactive',
        soilType: 'sandy',
        soilPh: 6.5,
        farmId: 'farm-1',
        createdAt: '2023-10-01T10:00:00Z',
        updatedAt: '2024-03-01T12:00:00Z',
        deletedAt: '',
        dimensions: {
          width: 7,
          length: 5,
          height: 0.3,
          area: 35,
          perimeter: 24,
          volume: 10.5,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
    ],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the grid handles many plots efficiently. This demonstrates the scalability of the interface for farms with extensive plot management.',
      },
    },
  },
};

/**
 * Mixed status plots showing various plot states.
 * Demonstrates how different plot statuses are visually represented.
 */
export const MixedStatusPlots: Story = {
  args: {
    plots: [
      mockPlots[0], // active
      mockPlots[2], // resting
      mockPlots[3], // preparing
      {
        id: 'plot-10',
        name: 'Inactive Plot',
        description:
          'This plot is temporarily out of service due to maintenance and soil restoration.',
        status: 'inactive',
        soilType: 'sandy',
        soilPh: 6.5,
        farmId: 'farm-1',
        createdAt: '2023-10-01T10:00:00Z',
        updatedAt: '2024-03-01T12:00:00Z',
        deletedAt: '',
        dimensions: {
          width: 7,
          length: 5,
          height: 0.3,
          area: 35,
          perimeter: 24,
          volume: 10.5,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
    ],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows plots with different statuses (active, resting, preparing, inactive) to demonstrate how various plot states are visually represented in the interface.',
      },
    },
  },
};

/**
 * Large plots state showing plots with significant dimensions.
 * Demonstrates how the interface handles plots with large areas and volumes.
 */
export const LargePlots: Story = {
  args: {
    plots: [
      {
        id: 'plot-11',
        name: 'Commercial Field A',
        description:
          'Large commercial field for extensive crop production. Features advanced irrigation and monitoring systems.',
        status: 'active',
        soilType: 'loamy',
        soilPh: 6.9,
        farmId: 'farm-1',
        createdAt: '2024-01-05T12:00:00Z',
        updatedAt: '2024-03-22T10:20:00Z',
        deletedAt: '',
        dimensions: {
          width: 50,
          length: 30,
          height: 0.5,
          area: 1500,
          perimeter: 160,
          volume: 750,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
      {
        id: 'plot-12',
        name: 'Mega Greenhouse',
        description:
          'Large controlled environment for year-round production. Features climate control and automated systems.',
        status: 'active',
        soilType: 'sandy',
        soilPh: 7.0,
        farmId: 'farm-1',
        createdAt: '2024-02-15T15:30:00Z',
        updatedAt: '2024-03-19T14:10:00Z',
        deletedAt: '',
        dimensions: {
          width: 25,
          length: 20,
          height: 0.4,
          area: 500,
          perimeter: 90,
          volume: 200,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
    ],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows plots with significant dimensions to demonstrate how the interface handles large plots with substantial areas and volumes.',
      },
    },
  },
};

/**
 * Small plots state showing compact plot management.
 * Demonstrates the interface with smaller, more focused plots.
 */
export const SmallPlots: Story = {
  args: {
    plots: [
      {
        id: 'plot-13',
        name: 'Micro Garden',
        description:
          'Small intensive garden for herbs and small vegetables. Perfect for urban farming.',
        status: 'active',
        soilType: 'loamy',
        soilPh: 6.8,
        farmId: 'farm-1',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-03-20T14:30:00Z',
        deletedAt: '',
        dimensions: {
          width: 2,
          length: 3,
          height: 0.2,
          area: 6,
          perimeter: 10,
          volume: 1.2,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
      {
        id: 'plot-14',
        name: 'Window Box',
        description:
          'Compact growing space for small herbs and flowers. Ideal for limited space gardening.',
        status: 'active',
        soilType: 'sandy',
        soilPh: 7.2,
        farmId: 'farm-1',
        createdAt: '2024-02-01T09:00:00Z',
        updatedAt: '2024-03-18T16:45:00Z',
        deletedAt: '',
        dimensions: {
          width: 1,
          length: 2,
          height: 0.15,
          area: 2,
          perimeter: 6,
          volume: 0.3,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        },
      },
    ],
    isLoading: false,
    currentFarm: mockFarm,
    isCreateDialogOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows compact plot management with smaller plots. Demonstrates how the interface handles intensive gardening and small-scale farming.',
      },
    },
  },
};
