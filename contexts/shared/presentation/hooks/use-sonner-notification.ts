import { useCallback } from 'react';
import { toast } from 'sonner';

interface SonnerNotificationOptions {
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
}

/**
 * Custom hook to show Sonner notifications easily.
 * @returns showNotification function
 */
export function useSonnerNotification() {
  /**
   * Show a Sonner notification
   * @param message Main message
   * @param options Optional: description, type, duration
   */
  const showNotification = useCallback(
    (message: string, options?: SonnerNotificationOptions) => {
      if (options?.type && toast[options.type]) {
        toast[options.type](message, {
          description: options?.description,
          duration: options?.duration || 4000,
        });
      } else {
        toast(message, {
          description: options?.description,
          duration: options?.duration || 4000,
        });
      }
    },
    [],
  );
  return { showNotification };
}
