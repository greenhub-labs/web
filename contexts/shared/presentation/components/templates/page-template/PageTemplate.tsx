import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { SidebarInset, SidebarTrigger } from "../../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { PageTemplateProps } from "./PageTemplate.interface";
import { cn } from "../../../lib/utils";

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  pageTitle,
  breadcrumbItems = [],
  headerActions,
  className,
}) => {
  // Combinar breadcrumbs con el título de la página
  const allBreadcrumbs = [
    ...breadcrumbItems,
    {
      label: pageTitle,
      isCurrentPage: true,
    },
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumb dinámico */}
        <Breadcrumb className="flex-1">
          <BreadcrumbList>
            {allBreadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className={index > 0 ? "hidden md:block" : ""}>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href || "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < allBreadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Acciones personalizadas del header */}
        {headerActions && (
          <div className="flex items-center gap-2">{headerActions}</div>
        )}
      </header>

      {/* Contenido principal */}
      <div className={cn("flex flex-1 flex-col gap-4 p-4", className)}>
        {children}
      </div>
    </SidebarInset>
  );
};

export default PageTemplate;
