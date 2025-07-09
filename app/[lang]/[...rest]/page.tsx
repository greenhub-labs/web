import { notFound } from "next/navigation";

/**
 * Catch-all route for unknown paths within localized segments
 * This ensures that any unknown route like /en/unknown or /es/unknown
 * will render the localized not-found page
 */
export default function CatchAllPage() {
  notFound();
}
