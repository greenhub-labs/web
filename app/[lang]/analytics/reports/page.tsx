"use client";

import PageTemplate from "@/contexts/shared/presentation/components/templates/page-template/PageTemplate";
import { useTranslations } from "next-intl";
import React from "react";

const DashboardPage = () => {
  const t = useTranslations();
  return (
    <PageTemplate pageTitle={t("navigation.analytics.reports")}>
      <div>Reports</div>
    </PageTemplate>
  );
};

export default DashboardPage;
