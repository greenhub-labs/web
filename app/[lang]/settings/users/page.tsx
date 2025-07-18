'use client';

import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// UI Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/contexts/shared/presentation/components/ui/avatar';
import { Badge } from '@/contexts/shared/presentation/components/ui/badge';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Card,
  CardContent,
} from '@/contexts/shared/presentation/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/contexts/shared/presentation/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/contexts/shared/presentation/components/ui/dropdown-menu';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Label } from '@/contexts/shared/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/contexts/shared/presentation/components/ui/select';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { Textarea } from '@/contexts/shared/presentation/components/ui/textarea';

// Atomic components
import {
  SearchInput,
  StatCard,
} from '@/contexts/shared/presentation/components/atoms';

// Icons (emojis as fallback)
const UserPlusIcon = () => <span>👤</span>;
const MoreVerticalIcon = () => <span>⋯</span>;
const CheckIcon = () => <span>✅</span>;
const XIcon = () => <span>❌</span>;
const AlertTriangleIcon = () => <span>⚠️</span>;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'manager' | 'viewer' | 'guest';
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  lastSeen: string;
  joinedOn: string;
  permissions: string[];
}

const UserManagementPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<
    'all' | 'active' | 'pending' | 'inactive'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Invite form state
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: '',
    personalMessage: '',
  });
  const [isInviting, setIsInviting] = useState(false);

  // Role change state
  const [newRole, setNewRole] = useState<string>('');
  const [isChangingRole, setIsChangingRole] = useState(false);

  // Remove user state
  const [removeConfirmText, setRemoveConfirmText] = useState('');
  const [isRemoving, setIsRemoving] = useState(false);

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@ejemplo.com',
      role: 'owner',
      status: 'active',
      lastSeen: '2024-01-20T10:30:00Z',
      joinedOn: '2023-08-15T09:00:00Z',
      permissions: ['fullAccess'],
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      email: 'carlos@ejemplo.com',
      role: 'admin',
      status: 'active',
      lastSeen: '2024-01-19T16:45:00Z',
      joinedOn: '2023-09-10T11:20:00Z',
      permissions: ['gardenManagement'],
    },
    {
      id: '3',
      name: 'María López',
      email: 'maria@ejemplo.com',
      role: 'manager',
      status: 'active',
      lastSeen: '2024-01-20T08:15:00Z',
      joinedOn: '2023-10-05T14:30:00Z',
      permissions: ['gardenManagement'],
    },
    {
      id: '4',
      name: 'Juan Martín',
      email: 'juan@ejemplo.com',
      role: 'viewer',
      status: 'pending',
      lastSeen: 'never',
      joinedOn: '2024-01-18T10:00:00Z',
      permissions: ['monitoringOnly'],
    },
    {
      id: '5',
      name: 'Sofia Fernández',
      email: 'sofia@ejemplo.com',
      role: 'guest',
      status: 'inactive',
      lastSeen: '2024-01-10T12:00:00Z',
      joinedOn: '2023-12-01T16:45:00Z',
      permissions: ['guestAccess'],
    },
  ];

  // Filter users based on search and filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || user.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  // Stats calculations
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    adminUsers: users.filter((u) => u.role === 'admin' || u.role === 'owner')
      .length,
    pendingInvites: users.filter((u) => u.status === 'pending').length,
  };

  // Helper functions
  const getRoleColor = (role: User['role']): string => {
    const colors = {
      owner: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      manager: 'bg-green-100 text-green-800',
      viewer: 'bg-yellow-100 text-yellow-800',
      guest: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || colors.guest;
  };

  const getStatusColor = (status: User['status']): string => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.inactive;
  };

  const formatLastSeen = (lastSeen: string): string => {
    if (lastSeen === 'never') {
      return t('pages.settings.users.userCard.neverLoggedIn');
    }

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInDays = Math.floor(
      (now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return t('pages.settings.users.userCard.today');
    if (diffInDays === 1) return t('pages.settings.users.userCard.yesterday');
    return `${diffInDays} ${t('pages.settings.users.userCard.daysAgo')}`;
  };

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Event handlers
  const handleInviteUser = async () => {
    setIsInviting(true);
    // Simulate API call
    setTimeout(() => {
      setIsInviting(false);
      setIsInviteDialogOpen(false);
      setInviteForm({ email: '', role: '', personalMessage: '' });
      // In real app, would show success toast
    }, 2000);
  };

  const handleChangeRole = async () => {
    if (!selectedUser) return;
    setIsChangingRole(true);
    // Simulate API call
    setTimeout(() => {
      setIsChangingRole(false);
      setIsRoleDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
      // In real app, would update user data and show success toast
    }, 1500);
  };

  const handleRemoveUser = async () => {
    if (!selectedUser || removeConfirmText !== 'REMOVE') return;
    setIsRemoving(true);
    // Simulate API call
    setTimeout(() => {
      setIsRemoving(false);
      setIsRemoveDialogOpen(false);
      setSelectedUser(null);
      setRemoveConfirmText('');
      // In real app, would remove user and show success toast
    }, 1500);
  };

  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsRoleDialogOpen(true);
  };

  const openRemoveDialog = (user: User) => {
    setSelectedUser(user);
    setIsRemoveDialogOpen(true);
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('navigation.settings.title'), href: '/settings' },
  ];

  return (
    <PageTemplate
      pageTitle={t('navigation.settings.users')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlusIcon />
              {t('pages.settings.users.inviteUser')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {t('pages.settings.users.inviteDialog.title')}
              </DialogTitle>
              <DialogDescription>
                {t('pages.settings.users.inviteDialog.subtitle')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('pages.settings.users.inviteDialog.email')}</Label>
                <Input
                  type="email"
                  placeholder={t(
                    'pages.settings.users.inviteDialog.emailPlaceholder',
                  )}
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t('pages.settings.users.inviteDialog.role')}</Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(value) =>
                    setInviteForm((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t(
                        'pages.settings.users.inviteDialog.rolePlaceholder',
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      {t('pages.settings.users.roles.admin')}
                    </SelectItem>
                    <SelectItem value="manager">
                      {t('pages.settings.users.roles.manager')}
                    </SelectItem>
                    <SelectItem value="viewer">
                      {t('pages.settings.users.roles.viewer')}
                    </SelectItem>
                    <SelectItem value="guest">
                      {t('pages.settings.users.roles.guest')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  {t('pages.settings.users.inviteDialog.personalMessage')}
                </Label>
                <Textarea
                  placeholder={t(
                    'pages.settings.users.inviteDialog.personalMessagePlaceholder',
                  )}
                  value={inviteForm.personalMessage}
                  onChange={(e) =>
                    setInviteForm((prev) => ({
                      ...prev,
                      personalMessage: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsInviteDialogOpen(false)}
                disabled={isInviting}
              >
                {t('common.cancel')}
              </Button>
              <Button onClick={handleInviteUser} disabled={isInviting}>
                {isInviting
                  ? t('pages.settings.users.inviteDialog.sending')
                  : t('pages.settings.users.inviteDialog.sendInvite')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {t('pages.settings.users.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('pages.settings.users.subtitle')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('pages.settings.users.stats.totalUsers')}
            value={stats.totalUsers.toString()}
            icon="👥"
          />
          <StatCard
            title={t('pages.settings.users.stats.activeUsers')}
            value={stats.activeUsers.toString()}
            icon="✅"
          />
          <StatCard
            title={t('pages.settings.users.stats.adminUsers')}
            value={stats.adminUsers.toString()}
            icon="👑"
          />
          <StatCard
            title={t('pages.settings.users.stats.pendingInvites')}
            value={stats.pendingInvites.toString()}
            icon="⏳"
          />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchInput
              placeholder={t('pages.settings.users.searchPlaceholder')}
              value={searchQuery}
              onChange={setSearchQuery}
              className="sm:max-w-xs"
            />
            <div className="flex gap-2">
              <Button
                variant={filterBy === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterBy('all')}
              >
                {t('pages.settings.users.filterAll')}
              </Button>
              <Button
                variant={filterBy === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterBy('active')}
              >
                {t('pages.settings.users.filterActive')}
              </Button>
              <Button
                variant={filterBy === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterBy('pending')}
              >
                {t('pages.settings.users.filterPending')}
              </Button>
              <Button
                variant={filterBy === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterBy('inactive')}
              >
                {t('pages.settings.users.filterInactive')}
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              {t('pages.settings.users.viewMode.grid')}
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              {t('pages.settings.users.viewMode.list')}
            </Button>
          </div>
        </div>

        {/* Users Grid/List */}
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery
                  ? t('pages.settings.users.emptyStates.noSearchResults')
                  : t('pages.settings.users.emptyStates.noUsers')}
              </h3>
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? t(
                      'pages.settings.users.emptyStates.noSearchResultsDescription',
                    )
                  : t('pages.settings.users.emptyStates.noUsersDescription')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            {filteredUsers.map((user) => (
              <Card key={user.id} className={viewMode === 'list' ? 'p-0' : ''}>
                <CardContent className={viewMode === 'list' ? 'p-4' : 'p-6'}>
                  <div
                    className={
                      viewMode === 'list'
                        ? 'flex items-center justify-between'
                        : 'space-y-4'
                    }
                  >
                    <div
                      className={
                        viewMode === 'list'
                          ? 'flex items-center gap-4 flex-1'
                          : 'flex items-center gap-3'
                      }
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                        {viewMode === 'grid' && (
                          <div className="flex gap-2 mt-2">
                            <Badge
                              className={getRoleColor(user.role)}
                              variant="secondary"
                            >
                              {t(`pages.settings.users.roles.${user.role}`)}
                            </Badge>
                            <Badge
                              className={getStatusColor(user.status)}
                              variant="secondary"
                            >
                              {t(`pages.settings.users.status.${user.status}`)}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {viewMode === 'list' && (
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <Badge
                            className={getRoleColor(user.role)}
                            variant="secondary"
                          >
                            {t(`pages.settings.users.roles.${user.role}`)}
                          </Badge>
                        </div>
                        <div className="text-right hidden md:block">
                          <Badge
                            className={getStatusColor(user.status)}
                            variant="secondary"
                          >
                            {t(`pages.settings.users.status.${user.status}`)}
                          </Badge>
                        </div>
                        <div className="text-right hidden lg:block min-w-0">
                          <p className="text-sm font-medium">
                            {t('pages.settings.users.userCard.lastSeen')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatLastSeen(user.lastSeen)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className={
                        viewMode === 'list'
                          ? 'ml-4'
                          : 'flex justify-between items-center'
                      }
                    >
                      {viewMode === 'grid' && (
                        <div className="text-sm text-muted-foreground">
                          <p>
                            {t('pages.settings.users.userCard.lastSeen')}:{' '}
                            {formatLastSeen(user.lastSeen)}
                          </p>
                          <p>
                            {t('pages.settings.users.userCard.joinedOn')}:{' '}
                            {new Date(user.joinedOn).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVerticalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openRoleDialog(user)}
                          >
                            {t('pages.settings.users.actions.changeRole')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {t('pages.settings.users.actions.viewProfile')}
                          </DropdownMenuItem>
                          {user.status === 'pending' && (
                            <DropdownMenuItem>
                              {t('pages.settings.users.actions.resendInvite')}
                            </DropdownMenuItem>
                          )}
                          {user.status === 'active' && (
                            <DropdownMenuItem>
                              {t('pages.settings.users.actions.suspendUser')}
                            </DropdownMenuItem>
                          )}
                          {user.status === 'suspended' && (
                            <DropdownMenuItem>
                              {t('pages.settings.users.actions.activateUser')}
                            </DropdownMenuItem>
                          )}
                          {user.role !== 'owner' && (
                            <>
                              <Separator />
                              <DropdownMenuItem
                                onClick={() => openRemoveDialog(user)}
                                className="text-red-600"
                              >
                                {t('pages.settings.users.actions.removeUser')}
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Role Change Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {t('pages.settings.users.roleDialog.title')}
              </DialogTitle>
              <DialogDescription>
                {t('pages.settings.users.roleDialog.subtitle')}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {getUserInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('pages.settings.users.roleDialog.newRole')}</Label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        {t('pages.settings.users.roles.admin')}
                      </SelectItem>
                      <SelectItem value="manager">
                        {t('pages.settings.users.roles.manager')}
                      </SelectItem>
                      <SelectItem value="viewer">
                        {t('pages.settings.users.roles.viewer')}
                      </SelectItem>
                      <SelectItem value="guest">
                        {t('pages.settings.users.roles.guest')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newRole && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      {t('pages.settings.users.roleDialog.roleDescription')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(`pages.settings.users.roleDescriptions.${newRole}`)}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRoleDialogOpen(false)}
                disabled={isChangingRole}
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleChangeRole}
                disabled={
                  isChangingRole || !newRole || newRole === selectedUser?.role
                }
              >
                {isChangingRole
                  ? t('pages.settings.users.roleDialog.changing')
                  : t('pages.settings.users.roleDialog.confirmChange')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove User Dialog */}
        <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangleIcon />
                {t('pages.settings.users.removeDialog.title')}
              </DialogTitle>
              <DialogDescription>
                {t('pages.settings.users.removeDialog.subtitle')}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {getUserInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    {t('pages.settings.users.removeDialog.description')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>
                    {t('pages.settings.users.removeDialog.confirmText')}
                  </Label>
                  <Input
                    placeholder={t(
                      'pages.settings.users.removeDialog.confirmPlaceholder',
                    )}
                    value={removeConfirmText}
                    onChange={(e) => setRemoveConfirmText(e.target.value)}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRemoveDialogOpen(false)}
                disabled={isRemoving}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemoveUser}
                disabled={isRemoving || removeConfirmText !== 'REMOVE'}
              >
                {isRemoving
                  ? t('pages.settings.users.removeDialog.removing')
                  : t('pages.settings.users.removeDialog.removeUser')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTemplate>
  );
};

export default UserManagementPage;
