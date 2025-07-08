// app/[lang]/layout.tsx
import { notFound } from "next/navigation";
import I18nProvider from "@/shared/providers/I18nProvider";
import { AppSidebar } from "@/shared/components/app-sidebar";

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
      <AppSidebar />
      <div className="flex flex-col min-h-screen mx-auto p-4 md:p-8">
        {children}
      </div>
    </I18nProvider>
  );
}
