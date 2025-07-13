// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'es'];
const defaultLocale = 'en';

// Rutas de autenticación (públicas)
const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  // Puedes añadir más rutas de auth aquí si las tienes
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Permitir archivos estáticos, _next, y API
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Detectar el locale en la ruta
  const locale =
    locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
    request.cookies.get('NEXT_LOCALE')?.value ||
    defaultLocale;

  // Pathname sin el locale (para comparar con AUTH_ROUTES)
  const pathnameWithoutLocale = locales.some((l) =>
    pathname.startsWith(`/${l}`),
  )
    ? pathname.replace(/^\/[a-z]{2}/, '')
    : pathname;

  // Comprobar si la ruta es de autenticación
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  // Comprobar si el usuario está autenticado
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Si está autenticado y va a una ruta de auth, redirigir a raíz
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // Si NO está autenticado y va a una ruta privada, redirigir a login
  const isPrivateRoute = !isAuthRoute;
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  // Redirección de idioma si falta
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`),
  );
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
