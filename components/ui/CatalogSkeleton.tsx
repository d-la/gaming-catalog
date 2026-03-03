export default function CatalogSkeleton() {
    return (
        <section className="section-container catalog-grid--loading grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-0">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-lg aspect-square border border-solid border-app-border">
                    <div className="game-card-image-container aspect-video relative rounded-t-lg bg-gray-800 animate-pulse">
                    </div>
                    <div className="game-card-content p-5 flex flex-col gap-2.5">
                        <div className="publishers bg-gray-800 animate-pulse h-3.5 w-1/3"></div>
                        <div className="title bg-gray-800 animate-pulse h-7.5 w-2/3"></div>
                        <div className="cta bg-gray-800 animate-pulse h-5 w-2/5"></div>
                    </div>
                </div>
            ))}
        </section>
    );
}