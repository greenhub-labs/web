/**
 * Navigation item interface for the application sidebar
 */
export interface NavigationItem {
  /**
   * Unique identifier for the navigation item
   */
  id: string;

  /**
   * Translation key for the item title (will be translated)
   */
  titleKey: string;

  /**
   * URL path for the navigation item
   */
  url: string;

  /**
   * Whether this item is currently active
   */
  isActive?: boolean;

  /**
   * Child navigation items (for collapsible sections)
   */
  items?: NavigationSubItem[];
}

/**
 * Sub-navigation item interface
 */
export interface NavigationSubItem {
  /**
   * Unique identifier for the sub-navigation item
   */
  id: string;

  /**
   * Translation key for the item title
   */
  titleKey: string;

  /**
   * URL path for the sub-navigation item
   */
  url: string;

  /**
   * Whether this sub-item is currently active
   */
  isActive?: boolean;
}

/**
 * Main navigation configuration structure
 */
export interface NavigationConfig {
  /**
   * Main navigation sections
   */
  main: NavigationItem[];
}
