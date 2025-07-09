"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Root not-found page for non-localized requests
 * This handles cases where users access invalid routes outside the [lang] segment
 * e.g., /unknown.txt, /api/invalid, etc.
 */
export default function RootNotFound() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language
    const detectLocale = () => {
      // Check cookie first
      const cookieLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1];

      if (cookieLocale && ["en", "es"].includes(cookieLocale)) {
        return cookieLocale;
      }

      // Fallback to browser language
      const browserLang = navigator.language.split("-")[0];
      return ["en", "es"].includes(browserLang) ? browserLang : "en";
    };

    const locale = detectLocale();

    // Redirect to localized not-found page
    router.replace(`/${locale}/404`);
  }, [router]);

  // Simple fallback while redirecting
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f8fafc",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{ fontSize: "2rem", marginBottom: "1rem", color: "#374151" }}
          >
            404 - Page Not Found
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            Redirecting to your preferred language...
          </p>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "3px solid #e5e7eb",
              borderTop: "3px solid #10b981",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
