import { bananasWhereWeGrowSection } from "@/content/site";

export function BananasCultureSection() {
  return (
    <section className="bg-[#f7f4ef] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-4xl font-bold tracking-tight text-[var(--header-bg)] md:text-5xl">
          {bananasWhereWeGrowSection.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--header-bg)]">
          {bananasWhereWeGrowSection.body}
        </p>
      </div>
    </section>
  );
}
