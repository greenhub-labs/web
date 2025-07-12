import { usePathname } from 'next/navigation';

export function useAuthPath() {
  const pathname = usePathname();
  const isAuthPath = pathname.includes('/auth');
  return isAuthPath;
}
