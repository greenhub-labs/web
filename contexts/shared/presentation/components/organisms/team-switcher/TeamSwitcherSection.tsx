/**
 * TeamSwitcherSection Organism
 * ---------------------------
 * Container component that manages the loading state for the TeamSwitcher molecule.
 * Displays the TeamSwitcherSkeleton while loading, and the TeamSwitcher when data is ready.
 *
 * Props:
 * - teams: Array<{ name: string; logo: React.ElementType | string; role: string }>
 *   The list of teams/farms to display in the switcher.
 * - loading: boolean
 *   Whether the data is still loading (shows skeleton if true).
 *
 * Usage:
 * ```tsx
 * <TeamSwitcherSection teams={teams} loading={isLoading} />
 * ```
 *
 * Atomic Design Level: Organism
 */
import React from 'react';
import { TeamSwitcher } from '../../molecules/team-switcher/team-switcher';
import { TeamSwitcherSkeleton } from '../../molecules/team-switcher-skeleton/team-switcher-skeleton';

interface TeamSwitcherSectionProps {
  teams: { name: string; logo: React.ElementType | string; role: string }[];
  loading: boolean;
}

export const TeamSwitcherSection: React.FC<TeamSwitcherSectionProps> = ({
  teams,
  loading,
}) => {
  if (loading) {
    return <TeamSwitcherSkeleton />;
  }
  return <TeamSwitcher teams={teams} />;
};
