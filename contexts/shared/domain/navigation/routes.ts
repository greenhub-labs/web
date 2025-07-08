import { NavigationConfig } from "./types";

/**
 * Main navigation configuration for GreenHub application
 * Uses translation keys that will be resolved in the UI components
 */
export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: "home",
      titleKey: "navigation.home",
      url: "/",
    },
    {
      id: "analytics",
      titleKey: "navigation.analytics.title",
      url: "/analytics",
      items: [
        {
          id: "dashboard",
          titleKey: "navigation.analytics.dashboard",
          url: "/analytics/dashboard",
        },
        {
          id: "predictions",
          titleKey: "navigation.analytics.predictions",
          url: "/analytics/predictions",
        },
        {
          id: "insights",
          titleKey: "navigation.analytics.insights",
          url: "/analytics/insights",
        },
        {
          id: "reports",
          titleKey: "navigation.analytics.reports",
          url: "/analytics/reports",
        },
        {
          id: "trends",
          titleKey: "navigation.analytics.trends",
          url: "/analytics/trends",
        },
        {
          id: "comparative",
          titleKey: "navigation.analytics.comparative",
          url: "/analytics/comparative",
        },
      ],
    },
    {
      id: "plants",
      titleKey: "navigation.plants.title",
      url: "/plants",
      items: [
        {
          id: "my-plants",
          titleKey: "navigation.plants.myPlants",
          url: "/plants",
        },
        {
          id: "plant-catalog",
          titleKey: "navigation.plants.catalog",
          url: "/plants/catalog",
        },
        {
          id: "add-plant",
          titleKey: "navigation.plants.addNew",
          url: "/plants/new",
        },
      ],
    },
    {
      id: "gardens",
      titleKey: "navigation.gardens.title",
      url: "/gardens",
      items: [
        {
          id: "my-gardens",
          titleKey: "navigation.gardens.myGardens",
          url: "/gardens",
        },
        {
          id: "garden-planner",
          titleKey: "navigation.gardens.planner",
          url: "/gardens/planner",
        },
        {
          id: "create-garden",
          titleKey: "navigation.gardens.create",
          url: "/gardens/new",
        },
      ],
    },
    {
      id: "care",
      titleKey: "navigation.care.title",
      url: "/care",
      items: [
        {
          id: "care-schedule",
          titleKey: "navigation.care.schedule",
          url: "/care/schedule",
        },
        {
          id: "care-tasks",
          titleKey: "navigation.care.tasks",
          url: "/care/tasks",
        },
        {
          id: "care-history",
          titleKey: "navigation.care.history",
          url: "/care/history",
        },
      ],
    },
    {
      id: "crops",
      titleKey: "navigation.crops.title",
      url: "/crops",
      items: [
        {
          id: "active-crops",
          titleKey: "navigation.crops.active",
          url: "/crops",
        },
        {
          id: "harvest-calendar",
          titleKey: "navigation.crops.harvest",
          url: "/crops/harvest",
        },
        {
          id: "crop-rotation",
          titleKey: "navigation.crops.rotation",
          url: "/crops/rotation",
        },
      ],
    },
    {
      id: "community",
      titleKey: "navigation.community.title",
      url: "/community",
      items: [
        {
          id: "forums",
          titleKey: "navigation.community.forums",
          url: "/community/forums",
        },
        {
          id: "events",
          titleKey: "navigation.community.events",
          url: "/community/events",
        },
        {
          id: "marketplace",
          titleKey: "navigation.community.marketplace",
          url: "/community/marketplace",
        },
      ],
    },
    {
      id: "profile",
      titleKey: "navigation.profile.title",
      url: "/profile",
      items: [
        {
          id: "my-profile",
          titleKey: "navigation.profile.myProfile",
          url: "/profile",
        },
        {
          id: "settings",
          titleKey: "navigation.profile.settings",
          url: "/profile/settings",
        },
        {
          id: "preferences",
          titleKey: "navigation.profile.preferences",
          url: "/profile/preferences",
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
 * Helper function to find active navigation item by current path
 */
export const getActiveNavigationItem = (currentPath: string): string | null => {
  for (const section of navigationConfig.main) {
    if (section.url === currentPath) {
      return section.id;
    }

    if (section.items) {
      for (const item of section.items) {
        if (item.url === currentPath) {
          return item.id;
        }
      }
    }
  }

  return null;
};
