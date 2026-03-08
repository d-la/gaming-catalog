export const FiltersSkeleton = () => {
    return (
        <section className="section-container filters-skeleton">
            <span className="bg-gray-800 animate-pulse h-3.5 w-1/3 pb-2"></span>
            <div className="filters-container flex flex-row gap-2.5">
                <div className="bg-gray-800 animate-pulse h-3.5"></div>
                <div className="bg-gray-800 animate-pulse h-3.5"></div>
                <div className="bg-gray-800 animate-pulse h-3.5"></div>
            </div>
        </section>
    );
}