// app/[lang]/layout.tsx
import { notFound } from 'next/navigation';
import I18nProvider from '@/contexts/shared/presentation/providers/I18nProvider';
import { AppSidebar } from '@/contexts/shared/presentation/components/app-sidebar';
import { SidebarProvider } from '@/contexts/shared/presentation/components/ui/sidebar';

const locales = ['en', 'es'];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; rest?: string[] }>;
}) {
  const resolvedParams = await params;

  if (!locales.includes(resolvedParams.lang)) {
    notFound();
  }

  const messages = (await import(`@/locales/${resolvedParams.lang}.json`))
    .default;

  // resolvedParams.rest puede ser undefined o un array vacío
  const isAuthPage = resolvedParams.rest && resolvedParams.rest[0] === 'auth';

  return (
    <I18nProvider locale={resolvedParams.lang} messages={messages}>
      <SidebarProvider>
        {!isAuthPage && <AppSidebar />}
        <div className="flex flex-col min-h-screen w-full">{children}</div>
      </SidebarProvider>
    </I18nProvider>
  );
}
