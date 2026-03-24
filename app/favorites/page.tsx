import { FavoritesPageContent } from "@/components/favorites/FavoritesPageContent";

export default function FavoritesPage() {
    return (
        <>
            <section className="favorites-page section-container">
                <h1>Favorites</h1>
            </section>
            <section className="section-container pb-10">
                <FavoritesPageContent />
            </section>
        </>
    );
}
