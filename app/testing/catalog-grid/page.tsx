// app/testing/catalog-grid/page.tsx
import { CatalogGridWrapper } from "@/components/ui/CatalogGridWrapper";

export default function CatalogGridTestPage() {
  return (
    <main className="section-container space-y-4">
      <h1 className="text-2xl font-semibold">Catalog Grid Test Page</h1>
      <p className="text-sm text-slate-300">
        This page is used by Playwright tests to verify that the catalog grid
        loads data correctly and handles infinite scroll without duplicates.
      </p>
      <CatalogGridWrapper />
    </main>
  );
}