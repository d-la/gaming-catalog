import { StoreIcons } from "@/components/ui/StoreIcons";
import { GameStore } from "@/types/Store";

const testStores: GameStore[] = [
  {
    id: 1,
    store: {
      id: 1,
      name: "Steam",
      slug: "steam",
      domain: "store.steampowered.com",
    },
  },
  {
    id: 2,
    store: {
      id: 2,
      name: "PlayStation Store",
      slug: "playstation-store",
      domain: "store.playstation.com",
    },
  },
  {
    id: 3,
    store: {
      id: 3,
      name: "Xbox Store",
      slug: "xbox-store",
      domain: "www.xbox.com",
    },
  },
  {
    id: 4,
    store: {
      id: 4,
      name: "Xbox Marketplace",
      slug: "marketplace.xbox.com",
      domain: "marketplace.xbox.com",
    },
  },
  {
    id: 5,
    store: {
      id: 5,
      name: "Nintendo Store",
      slug: "nintendo",
      domain: "www.nintendo.com",
    },
  },
];

export default function StoreIconsTestPage() {
  return (
    <main className="section-container space-y-4">
      <h1 className="text-2xl font-semibold">Store Icons Test Page</h1>
      <p className="text-sm text-slate-300">
        This page is used by Playwright tests to verify that{" "}
        <code>StoreIcons</code> renders the correct SVG icon for each supported
        store slug.
      </p>
      <StoreIcons stores={testStores} />
    </main>
  );
}
