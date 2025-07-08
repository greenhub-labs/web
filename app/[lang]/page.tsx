import React from "react";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

const HomePage = () => {
  return (
    <PageTemplate pageTitle="Dashboard">
      {/* Contenido personalizado de la página */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Bienvenido a GreenHub</h2>
          <p className="text-muted-foreground">
            Gestiona tus plantas, huertos y cuidados de forma inteligente.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">🌱 Mis Plantas</h3>
            <p className="text-sm text-muted-foreground">
              Gestiona tu colección de plantas
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">🏡 Mis Huertos</h3>
            <p className="text-sm text-muted-foreground">
              Administra tus espacios de cultivo
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">💧 Cuidados</h3>
            <p className="text-sm text-muted-foreground">
              Programa y sigue el cuidado
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HomePage;
