import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LocationMap from './location-map';

const meta: Meta<typeof LocationMap> = {
  title: 'Shared/Molecules/LocationMap',
  component: LocationMap,
  parameters: {
    docs: {
      description: {
        component: `
**LocationMap** displays a static Google Maps iframe centered at the given coordinates.

- Pass lat and lng as numbers or strings.
- Optionally set height (number or string, default: 250) and zoom (default: 15).
- If lat or lng are missing, the map is not rendered.
- You can pass a className for custom styling.

**Usage:**
~~~tsx
<LocationMap lat={40.4168} lng={-3.7038} />
~~~
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocationMap>;

export const Default: Story = {
  args: {
    lat: 40.4168, // Madrid
    lng: -3.7038,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default map centered on Madrid (zoom 15, height 250px).',
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    lat: 51.5074, // London
    lng: -0.1278,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map with custom height (400px).',
      },
    },
  },
};

export const CustomZoom: Story = {
  args: {
    lat: 48.8566, // Paris
    lng: 2.3522,
    zoom: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map with custom zoom (10).',
      },
    },
  },
};

export const NoCoordinates: Story = {
  args: {
    lat: undefined,
    lng: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'If lat or lng are missing, nothing is rendered.',
      },
    },
  },
};
