"use client";

import { SlideIn } from "@/components/ui/SlideIn"

export default function Error({
    error,
    reset
}: {
    error: Error,
    reset: () => void 
}) {
    console.error(`Error in catalog page:`, error);

    return (
        <>
            <section className="section-container pb-0">
                <SlideIn delay={0}>
                    <h1 className="">Games Catalog</h1>
                </SlideIn>
            </section>
            <section className="section-container">
                <h2>Looks like something went wrong...</h2>
                <button onClick={() => reset()} className="button-outline mt-5 cursor-pointer">Try again</button>
            </section>
        </>
    )
}