'use client';
import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/contexts/shared/presentation/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/contexts/shared/presentation/components/ui/sidebar';
import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { FarmMembership } from '@/contexts/users/domain/entities/user.entity';
import { useFarm } from '@/contexts/farms/presentation/hooks/use-farm';

export interface TeamSwitcherProps {
  farms: FarmMembership[];
}

export function TeamSwitcher({ farms }: TeamSwitcherProps) {
  // Estado local para el farmId seleccionado

  const { currentFarm, setCurrentFarm } = useFarmStore();
  const [selectedFarmId, setSelectedFarmId] = React.useState(
    currentFarm?.id || farms?.[0]?.farmId || '',
  );
  const { isMobile } = useSidebar();

  // Hook para hacer fetch de la farm seleccionada
  const { getFarmByIdQuery } = useFarm(selectedFarmId);

  // Cuando el fetch termina, guarda la farm en el store
  React.useEffect(() => {
    if (getFarmByIdQuery.data) {
      setCurrentFarm(getFarmByIdQuery.data);
    }
  }, [getFarmByIdQuery.data, setCurrentFarm]);

  if (!farms || farms.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <span className="text-2xl">🌾</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">No farms found</span>
                  <span className="truncate text-xs">Add your first farm</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => {
                  /* TODO: open add farm modal */
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add farm
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!currentFarm) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <span className="text-2xl">🌾</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentFarm.name}</span>
                <span className="truncate text-xs">
                  {currentFarm.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {farms.map((membership, index) => (
              <DropdownMenuItem
                key={membership.farmId}
                onClick={() => setSelectedFarmId(membership.farmId)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <span className="text-2xl">🌾</span>
                </div>
                {membership.farmName}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add farm</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
