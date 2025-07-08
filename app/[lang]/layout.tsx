// app/[lang]/layout.tsx
import { notFound } from "next/navigation";
import I18nProvider from "@/contexts/shared/presentation/providers/I18nProvider";
import { AppSidebar } from "@/contexts/shared/presentation/components/app-sidebar";
import { SidebarProvider } from "@/contexts/shared/presentation/components/ui/sidebar";

const locales = ["en", "es"];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!locales.includes(params.lang)) {
    notFound();
  }

  const messages = (await import(`@/locales/${params.lang}.json`)).default;

  return (
    <I18nProvider locale={params.lang} messages={messages}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col min-h-screen w-full">{children}</div>
      </SidebarProvider>
    </I18nProvider>
  );
}
