import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/contexts/shared/presentation/components/ui/avatar';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import SettingsSection from '@/contexts/shared/presentation/components/molecules/SettingsSection';

export interface UserAvatarSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  onUpload: (file: File) => void;
  onDelete: () => void;
  uploadLabel: string;
  maxSizeText: string;
  supportedFormatsText: string;
}

export const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  sectionIcon,
  avatarUrl,
  firstName,
  lastName,
  onUpload,
  onDelete,
  uploadLabel,
  maxSizeText,
  supportedFormatsText,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      // Reset input so same file can be selected again if needed
      event.target.value = '';
    }
  };

  return (
    <SettingsSection
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon={sectionIcon}
    >
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          <AvatarImage
            src={avatarUrl || ''}
            alt={`${firstName || ''} ${lastName || ''}`}
          />
          <AvatarFallback className="text-2xl">
            {(firstName?.charAt(0) || '') + (lastName?.charAt(0) || '')}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{maxSizeText}</p>
          <p className="text-xs text-muted-foreground">
            {supportedFormatsText}
          </p>
        </div>

        <div className="flex gap-2 w-full max-w-xs">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploadLabel}
          </Button>
          <Button variant="outline" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </SettingsSection>
  );
};
