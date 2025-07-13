import React from 'react';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Download, AlertTriangle } from 'lucide-react';

export interface UserDataPrivacySectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
  // Export data
  exportTitle: string;
  exportDescription: string;
  exportButtonLabel: string;
  onExport: () => void;
  // Delete account
  deleteTitle: string;
  deleteDescription: string;
  deleteButtonLabel: string;
  onDelete: () => void;
}

export const UserDataPrivacySection: React.FC<UserDataPrivacySectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  sectionIcon,
  exportTitle,
  exportDescription,
  exportButtonLabel,
  onExport,
  deleteTitle,
  deleteDescription,
  deleteButtonLabel,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      {/* Export Data */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
        <div>
          <h4 className="text-md font-medium">{exportTitle}</h4>
          <p className="text-sm text-muted-foreground">{exportDescription}</p>
        </div>
        <Button
          variant="outline"
          onClick={onExport}
          className="w-full md:w-auto"
        >
          <Download className="h-4 w-4 mr-2" />
          {exportButtonLabel}
        </Button>
      </div>

      {/* Delete Account */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <div>
          <h4 className="text-md font-medium text-destructive">
            {deleteTitle}
          </h4>
          <p className="text-sm text-muted-foreground">{deleteDescription}</p>
        </div>
        <Button
          variant="destructive"
          onClick={onDelete}
          className="w-full md:w-auto"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          {deleteButtonLabel}
        </Button>
      </div>
    </div>
  );
};
