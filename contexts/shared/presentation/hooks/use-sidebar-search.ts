import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  NavigationConfig,
  NavigationItem,
} from '@/contexts/shared/domain/navigation/types';

/**
 * Custom hook to handle sidebar search functionality
 * Filters navigation items while preserving parent sections when children match
 */
export function useSidebarSearch(navigationConfig: NavigationConfig) {
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations();

  /**
   * Filter navigation items based on search query
   * Preserves parent sections when children match the search
   */
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) {
      return navigationConfig;
    }

    const query = searchQuery.toLowerCase().trim();
    const filteredItems: NavigationItem[] = [];

    for (const item of navigationConfig.main) {
      const itemTitle = t(item.titleKey).toLowerCase();
      const itemMatches = itemTitle.includes(query);

      // Check if any child items match
      const matchingChildren = item.items?.filter((child) => {
        const childTitle = t(child.titleKey).toLowerCase();
        return childTitle.includes(query);
      });

      // Include item if:
      // 1. The item itself matches the search
      // 2. Any of its children match the search
      if (itemMatches || (matchingChildren && matchingChildren.length > 0)) {
        const filteredItem: NavigationItem = {
          ...item,
          // If the parent doesn't match but children do, only show matching children
          // If parent matches, show all children
          items: itemMatches ? item.items : matchingChildren,
        };

        filteredItems.push(filteredItem);
      }
    }

    return {
      main: filteredItems,
    };
  }, [searchQuery, navigationConfig, t]);

  /**
   * Get sections that should be expanded based on search results
   * Returns array of section IDs that should be open
   */
  const expandedSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const expanded: string[] = [];
    const query = searchQuery.toLowerCase().trim();

    for (const item of navigationConfig.main) {
      const itemTitle = t(item.titleKey).toLowerCase();

      // If parent matches, don't auto-expand (let user decide)
      if (itemTitle.includes(query)) {
        continue;
      }

      // Check if any children match
      const hasMatchingChildren = item.items?.some((child) => {
        const childTitle = t(child.titleKey).toLowerCase();
        return childTitle.includes(query);
      });

      // If children match but parent doesn't, expand this section
      if (hasMatchingChildren) {
        expanded.push(item.id);
      }
    }

    return expanded;
  }, [searchQuery, navigationConfig, t]);

  /**
   * Clear the search query
   */
  const clearSearch = () => {
    setSearchQuery('');
  };

  /**
   * Check if search has results
   */
  const hasResults = filteredNavigation.main.length > 0;

  /**
   * Check if search is active
   */
  const isSearching = searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    filteredNavigation,
    expandedSections,
    clearSearch,
    hasResults,
    isSearching,
  };
}
