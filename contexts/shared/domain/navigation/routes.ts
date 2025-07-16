import { NavigationConfig } from './types';

/**
 * Main navigation configuration for GreenHub application
 * Uses translation keys that will be resolved in the UI components
 */
export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: 'home',
      titleKey: 'navigation.home',
      url: '/',
    },
    {
      id: 'garden',
      titleKey: 'navigation.garden.title',
      url: '/garden',
      items: [
        {
          id: 'plots',
          titleKey: 'navigation.garden.plots',
          url: '/garden/plots',
        },
        {
          id: 'crops',
          titleKey: 'navigation.garden.crops',
          url: '/garden/crops',
        },
        {
          id: 'irrigation',
          titleKey: 'navigation.garden.irrigation',
          url: '/garden/irrigation',
        },
        {
          id: 'planting-planner',
          titleKey: 'navigation.garden.plantingPlanner',
          url: '/garden/planting-planner',
        },
        {
          id: 'rotation',
          titleKey: 'navigation.garden.rotation',
          url: '/garden/rotation',
        },
      ],
    },
    {
      id: 'coop',
      titleKey: 'navigation.coop.title',
      url: '/coop',
      items: [
        {
          id: 'chickens',
          titleKey: 'navigation.coop.chickens',
          url: '/coop/chickens',
        },
        {
          id: 'egg-production',
          titleKey: 'navigation.coop.eggProduction',
          url: '/coop/egg-production',
        },
        {
          id: 'environment',
          titleKey: 'navigation.coop.environment',
          url: '/coop/environment',
        },
        {
          id: 'door-control',
          titleKey: 'navigation.coop.doorControl',
          url: '/coop/door-control',
        },
        {
          id: 'feed-water',
          titleKey: 'navigation.coop.feedWater',
          url: '/coop/feed-water',
        },
      ],
    },
    {
      id: 'monitoring',
      titleKey: 'navigation.monitoring.title',
      url: '/monitoring',
      items: [
        {
          id: 'sensors',
          titleKey: 'navigation.monitoring.sensors',
          url: '/monitoring/sensors',
        },
        {
          id: 'alerts',
          titleKey: 'navigation.monitoring.alerts',
          url: '/monitoring/alerts',
        },
        {
          id: 'weather',
          titleKey: 'navigation.monitoring.weather',
          url: '/monitoring/weather',
        },
        {
          id: 'cameras',
          titleKey: 'navigation.monitoring.cameras',
          url: '/monitoring/cameras',
        },
        {
          id: 'history',
          titleKey: 'navigation.monitoring.history',
          url: '/monitoring/history',
        },
      ],
    },
    {
      id: 'automation',
      titleKey: 'navigation.automation.title',
      url: '/automation',
      items: [
        {
          id: 'irrigation-rules',
          titleKey: 'navigation.automation.irrigationRules',
          url: '/automation/irrigation-rules',
        },
        {
          id: 'schedules',
          titleKey: 'navigation.automation.schedules',
          url: '/automation/schedules',
        },
        {
          id: 'valves',
          titleKey: 'navigation.automation.valves',
          url: '/automation/valves',
        },
        {
          id: 'manual-control',
          titleKey: 'navigation.automation.manualControl',
          url: '/automation/manual-control',
        },
      ],
    },
    {
      id: 'analytics',
      titleKey: 'navigation.analytics.title',
      url: '/analytics',
      items: [
        {
          id: 'predictions',
          titleKey: 'navigation.analytics.predictions',
          url: '/analytics/predictions',
        },
        {
          id: 'yield-estimation',
          titleKey: 'navigation.analytics.yieldEstimation',
          url: '/analytics/yield-estimation',
        },
        {
          id: 'performance',
          titleKey: 'navigation.analytics.performance',
          url: '/analytics/performance',
        },
        {
          id: 'ai-assistant',
          titleKey: 'navigation.analytics.aiAssistant',
          url: '/analytics/ai-assistant',
        },
        {
          id: 'reports',
          titleKey: 'navigation.analytics.reports',
          url: '/analytics/reports',
        },
      ],
    },
    {
      id: 'energy',
      titleKey: 'navigation.energy.title',
      url: '/energy',
      items: [
        {
          id: 'solar-panels',
          titleKey: 'navigation.energy.solarPanels',
          url: '/energy/solar-panels',
        },
        {
          id: 'batteries',
          titleKey: 'navigation.energy.batteries',
          url: '/energy/batteries',
        },
        {
          id: 'consumption',
          titleKey: 'navigation.energy.consumption',
          url: '/energy/consumption',
        },
        {
          id: 'optimization',
          titleKey: 'navigation.energy.optimization',
          url: '/energy/optimization',
        },
      ],
    },
    {
      id: 'gamification',
      titleKey: 'navigation.gamification.title',
      url: '/gamification',
      items: [
        {
          id: 'challenges',
          titleKey: 'navigation.gamification.challenges',
          url: '/gamification/challenges',
        },
        {
          id: 'achievements',
          titleKey: 'navigation.gamification.achievements',
          url: '/gamification/achievements',
        },
        {
          id: 'yearly-stats',
          titleKey: 'navigation.gamification.yearlyStats',
          url: '/gamification/yearly-stats',
        },
        {
          id: 'photo-album',
          titleKey: 'navigation.gamification.photoAlbum',
          url: '/gamification/photo-album',
        },
      ],
    },
    {
      id: 'settings',
      titleKey: 'navigation.settings.title',
      url: '/settings',
      items: [
        {
          id: 'farm',
          titleKey: 'navigation.settings.farm',
          url: '/settings/farm',
        },
        {
          id: 'profile',
          titleKey: 'navigation.settings.profile',
          url: '/settings/profile',
        },
        {
          id: 'users',
          titleKey: 'navigation.settings.users',
          url: '/settings/users',
        },
        {
          id: 'notifications',
          titleKey: 'navigation.settings.notifications',
          url: '/settings/notifications',
        },
        {
          id: 'integrations',
          titleKey: 'navigation.settings.integrations',
          url: '/settings/integrations',
        },
        {
          id: 'system',
          titleKey: 'navigation.settings.system',
          url: '/settings/system',
        },
      ],
    },
  ],
};

/**
 * Helper function to get navigation config
 * Can be extended later for dynamic navigation based on user roles
 */
export const getNavigationConfig = (): NavigationConfig => {
  return navigationConfig;
};

/**
 * Helper function to normalize pathname by removing locale prefix
 * Handles paths like /en/garden/plots -> /garden/plots
 */
const normalizePathname = (pathname: string): string => {
  // Remove locale prefix (e.g., /en, /es)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
  // Ensure it starts with /
  return pathWithoutLocale === '' ? '/' : pathWithoutLocale;
};

/**
 * Helper function to find active navigation item by current path
 * Returns both the active item ID and parent section ID
 */
export const getActiveNavigationItem = (currentPath: string): string | null => {
  const normalizedPath = normalizePathname(currentPath);

  for (const section of navigationConfig.main) {
    if (section.url === normalizedPath) {
      return section.id;
    }

    if (section.items) {
      for (const item of section.items) {
        if (item.url === normalizedPath) {
          return item.id;
        }
      }
    }
  }

  return null;
};

/**
 * Helper function to find which navigation section should be open
 * Based on the current path
 */
export const getActiveNavigationSection = (
  currentPath: string,
): string | null => {
  const normalizedPath = normalizePathname(currentPath);

  for (const section of navigationConfig.main) {
    // Check if we're directly on the section page
    if (section.url === normalizedPath) {
      return section.id;
    }

    // Check if we're on any of the section's subpages
    if (section.items) {
      for (const item of section.items) {
        if (item.url === normalizedPath) {
          return section.id;
        }
      }
    }
  }

  return null;
};
