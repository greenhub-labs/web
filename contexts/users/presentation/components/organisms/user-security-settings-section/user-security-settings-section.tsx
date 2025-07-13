import React, { useState } from 'react';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { UserChangePasswordSection } from '@/contexts/users/presentation/components/molecules/user-change-password-section/user-change-password-section';
import { UserTwoFactorSection } from '@/contexts/users/presentation/components/molecules/user-two-factor-section/user-two-factor-section';
import { UserSecurityAlertsSection } from '@/contexts/users/presentation/components/molecules/user-security-alerts-section/user-security-alerts-section';

export interface UserSecuritySettingsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
  // Change password
  changePasswordTitle: string;
  currentLabel: string;
  newLabel: string;
  confirmLabel: string;
  buttonLabel: string;
  // 2FA
  twoFactorTitle: string;
  twoFactorDescription: string;
  // Alerts
  alertsTitle: string;
  alertsDescription: string;
}

export const UserSecuritySettingsSection: React.FC<
  UserSecuritySettingsSectionProps
> = ({
  sectionTitle,
  sectionSubtitle,
  sectionIcon,
  changePasswordTitle,
  currentLabel,
  newLabel,
  confirmLabel,
  buttonLabel,
  twoFactorTitle,
  twoFactorDescription,
  alertsTitle,
  alertsDescription,
}) => {
  // Password state
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // Switches
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true);

  const handlePasswordChange = (
    field: 'current' | 'new' | 'confirm',
    value: string,
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSave = () => {
    // TODO: Implement password change logic
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <SettingsSection
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon={sectionIcon}
    >
      {/* Change Password */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">{changePasswordTitle}</h4>
        <UserChangePasswordSection
          current={passwordData.current}
          new={passwordData.new}
          confirm={passwordData.confirm}
          onChange={handlePasswordChange}
          onSubmit={handlePasswordSave}
          showCurrent={showCurrentPassword}
          showNew={showNewPassword}
          toggleShowCurrent={() => setShowCurrentPassword((v) => !v)}
          toggleShowNew={() => setShowNewPassword((v) => !v)}
          currentLabel={currentLabel}
          newLabel={newLabel}
          confirmLabel={confirmLabel}
          buttonLabel={buttonLabel}
          disabled={false}
        />
      </div>

      {/* Two Factor Authentication */}
      <div className="space-y-4 pt-4 border-t">
        <UserTwoFactorSection
          title={twoFactorTitle}
          description={twoFactorDescription}
          enabled={twoFactorEnabled}
          onToggle={setTwoFactorEnabled}
        />
      </div>

      {/* Security Alerts */}
      <div className="space-y-4 pt-4 border-t">
        <UserSecurityAlertsSection
          title={alertsTitle}
          description={alertsDescription}
          enabled={securityAlertsEnabled}
          onToggle={setSecurityAlertsEnabled}
        />
      </div>
    </SettingsSection>
  );
};
