import { SlideIn } from "@/components/ui/SlideIn"
import CatalogSkeleton from "@/components/skeletons/CatalogSkeleton";

export default function Loading() {
    return (
        <>
            <section className="section-container pb-0">
                <SlideIn delay={0}>
                    <h1 className="">Games Catalog</h1>
                </SlideIn>
            </section>
            <CatalogSkeleton />
        </>
    );
}