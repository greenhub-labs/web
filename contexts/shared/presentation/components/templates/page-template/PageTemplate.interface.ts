export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface PageTemplateProps extends React.PropsWithChildren {
  /**
   * Título de la página que aparecerá en el breadcrumb final
   */
  pageTitle: string;

  /**
   * Array de elementos del breadcrumb
   * El último elemento se tomará como página actual automáticamente
   */
  breadcrumbItems?: BreadcrumbItem[];

  /**
   * Contenido personalizado para el header (opcional)
   */
  headerActions?: React.ReactNode;

  /**
   * Clase CSS adicional para el contenedor principal
   */
  className?: string;
}
