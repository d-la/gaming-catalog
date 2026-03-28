export default function MobileNavigationTestPage() {

    return (
        <section className="section-container space-y-4">
            <h1 className="text-2xl font-semibold">Mobile Navigation Test</h1>
            <p className="text-sm text-slate-300">
                This page is used by Playwright tests to verify that the mobile
                navigation button when clicked can open and close the sidebar
                menu.
            </p>
        </section>
    );
}
