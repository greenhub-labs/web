"use client";

import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/contexts/shared/presentation/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/contexts/shared/presentation/components/ui/collapsible";
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
} from "@/contexts/shared/presentation/components/ui/sidebar";
import {
  getNavigationConfig,
  getActiveNavigationItem,
} from "@/contexts/shared/domain/navigation";

/**
 * AppSidebar component using DDD navigation configuration
 * Automatically handles translations and active states
 */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const pathname = usePathname();
  const navigationConfig = getNavigationConfig();
  const activeItemId = getActiveNavigationItem(pathname);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{t("common.appName")}</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationConfig.main.map((item, index) => {
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

              // Render collapsible items (like Analytics with subitems)
              return (
                <Collapsible
                  key={item.id}
                  defaultOpen={index === 2} // Monitoring section open by default
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {t(item.titleKey)}{" "}
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
