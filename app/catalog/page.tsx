import { CatalogGridWrapper } from "@/components/ui/CatalogGridWrapper";
import { SlideIn } from "@/components/ui/SlideIn";
import { BackToTop } from "@/components/ui/BackToTop";

export default async function CatalogPage() {
    return (
        <>
            <section className="section-container pb-0">
                <SlideIn delay={0}>
                    <h1 className="">Games Catalog</h1>
                </SlideIn>
            </section>
            <CatalogGridWrapper />
            <BackToTop />
        </>
    );
}