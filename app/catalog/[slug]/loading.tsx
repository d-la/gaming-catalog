export default function Loading() {
    return (
        <section className="catalog-hero section-container flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="catalog-hero-image basis-full md:basis-1/2 relative min-h-[300px] md:min-h-auto bg-gray-800 animate-pulse">
            </div>
            <div className="catalog-hero-content basis-full md:basis-1/2 flex flex-col items-start justify-start gap-2.5">
                <div className="catalog-hero-title bg-gray-800 animate-pulse h-8 md:h-12 w-1/3"></div>
                <div className="catalog-hero-description bg-gray-800 animate-pulse h-10 md:h-20 w-full"></div>
                <div className="catalog-hero-stores bg-gray-800 animate-pulse h-4 w-1/8"></div>
                <div className="catalog-hero-publishers bg-gray-800 animate-pulse h-4 w-full"></div>
                <div className="catalog-hero-developers bg-gray-800 animate-pulse h-4 w-full"></div>
            </div>
            
        </section>
    );
}