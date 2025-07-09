"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Templates
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/presentation/components/ui/card";
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

// Atomic Design Components
import { StatCard } from "@/contexts/shared/presentation/components/atoms";

/**
 * Dedicated 404 page that can be accessed directly
 * This shares the same design and functionality as the not-found page
 * but is accessible via a direct route (/[lang]/404)
 */
const Page404: React.FC = () => {
  const t = useTranslations("pages.notFound");
  const tNav = useTranslations("navigation");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: t("title"), href: "/404" },
  ];

  const funFacts = t.raw("funFacts.facts") as string[];

  return (
    <PageTemplate pageTitle={t("title")} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Error Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard title={t("stats.errorCode")} value="404" icon="🚫" />
          <StatCard title={t("stats.timeWasted")} value="45s" icon="⏰" />
          <StatCard title={t("stats.pagesAvailable")} value="12+" icon="📄" />
          <StatCard title={t("stats.systemStatus")} value="100%" icon="✅" />
        </div>

        {/* Main Error Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Error Message Card */}
          <Card className="h-fit">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-20 h-20 flex items-center justify-center text-4xl mb-4 bg-red-50 rounded-full">
                🌱
              </div>
              <CardTitle className="text-xl sm:text-2xl text-red-600">
                {t("subtitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("message")}
              </p>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium text-sm sm:text-base flex items-center gap-2">
                  💡 {t("suggestions.title")}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>{t("suggestions.checkUrl")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>{t("suggestions.navigation")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>{t("suggestions.search")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>{t("suggestions.home")}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="grid gap-2 sm:grid-cols-2">
                <Button asChild className="w-full">
                  <Link href="/">{t("actions.goHome")}</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  className="w-full"
                >
                  {t("actions.goBack")}
                </Button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/garden/plots">{t("actions.explore")}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/settings/profile">{t("actions.contact")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts Card */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                🌿 {t("funFacts.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-green-700 flex-1">{fact}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-3">
                  Sistema operativo al 100% 🚀
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="text-green-500">🌱</span>
                  <span className="text-blue-500">💧</span>
                  <span className="text-yellow-500">☀️</span>
                  <span className="text-purple-500">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              🗺️ Navegación Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild variant="outline" className="h-auto py-3">
                <Link
                  href="/garden/plots"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xl">🗺️</span>
                  <span className="text-xs">{tNav("garden.plots")}</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-3">
                <Link
                  href="/monitoring/alerts"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xl">📊</span>
                  <span className="text-xs">{tNav("monitoring.title")}</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-3">
                <Link
                  href="/automation/schedules"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xl">🤖</span>
                  <span className="text-xs">{tNav("automation.title")}</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-3">
                <Link
                  href="/settings/profile"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xl">⚙️</span>
                  <span className="text-xs">{tNav("settings.title")}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default Page404;
