'use client';

import * as React from 'react';
import { GalleryVerticalEnd, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { SearchForm } from '@/contexts/shared/presentation/components/search-form';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/contexts/shared/presentation/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/contexts/shared/presentation/components/ui/sidebar';
import {
  getNavigationConfig,
  getActiveNavigationItem,
  getActiveNavigationSection,
} from '@/contexts/shared/domain/navigation/routes';
import { useSidebarSearch } from '@/contexts/shared/presentation/hooks/use-sidebar-search';
import { TeamSwitcherSection } from '@/contexts/shared/presentation/components/organisms/team-switcher/TeamSwitcherSection';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useFarm } from '@/contexts/farms/presentation/hooks/use-farm';
import { useAuthStore } from '@/contexts/auth/presentation/store/auth-store';

/**
 * AppSidebar component using DDD navigation configuration
 * Automatically handles translations, active states, and search functionality
 */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const pathname = usePathname();
  const navigationConfig = getNavigationConfig();
  const activeItemId = getActiveNavigationItem(pathname);
  const activeSectionId = getActiveNavigationSection(pathname);
  const { currentUser } = useAuthStore();
  // Use the search hook for filtering navigation
  const {
    searchQuery,
    setSearchQuery,
    filteredNavigation,
    expandedSections,
    clearSearch,
    hasResults,
    isSearching,
  } = useSidebarSearch(navigationConfig);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcherSection farms={currentUser?.farms || []} loading={false} />
        <SearchForm
          value={searchQuery}
          onValueChange={setSearchQuery}
          onClear={clearSearch}
          placeholder={t('common.search')}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* Show "no results" message when searching but no results found */}
          {isSearching && !hasResults && (
            <div className="px-2 py-4 text-sm text-muted-foreground text-center">
              {t('common.noResults')} "{searchQuery}"
            </div>
          )}

          <SidebarMenu>
            {filteredNavigation.main.map((item) => {
              // Determine if this section should be open by default (for normal navigation)
              const shouldBeOpenByDefault = activeSectionId === item.id;

              // When searching, force sections open if they have matching children
              const shouldBeOpenDuringSearch = expandedSections.includes(
                item.id,
              );

              // Determine if this section or any of its children are active
              const isSectionActive =
                activeItemId === item.id ||
                (activeSectionId === item.id && !isSearching);

              // Render simple items (like Home) without collapsible
              if (!item.items?.length) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItemId === item.id}
                    >
                      <a href={item.url}>{t(item.titleKey)}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // Render collapsible items (like Garden, Coop, etc. with subitems)
              return (
                <Collapsible
                  key={item.id}
                  // Use controlled mode during search, uncontrolled during normal navigation
                  {...(isSearching
                    ? { open: shouldBeOpenDuringSearch }
                    : { defaultOpen: shouldBeOpenByDefault })}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isSectionActive}>
                        {t(item.titleKey)}{' '}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={activeItemId === subItem.id}
                              className="h-auto min-h-8 py-2 whitespace-normal leading-tight"
                            >
                              <a href={subItem.url} className="block">
                                {t(subItem.titleKey)}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
