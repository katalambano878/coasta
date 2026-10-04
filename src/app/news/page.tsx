import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Agrillano News",
  description:
    "Read the latest Agrillano news, updates, community initiatives, and farming innovation stories.",
  path: "/news",
  image: "/gen-farm-sunrise.webp",
});

const fallbackNewsCards = [
  {
    title: "Agrillano launches 2026 community grants across regional growers",
    excerpt:
      "Applications are now open for Agrillano's annual grants supporting local community initiatives in key farming regions.",
    href: "/news",
    image: "/news/community-grants.webp",
    category: "Community",
    date: "Apr 2026",
  },
  {
    title: "Agrillano Berries recognised in national employer awards",
    excerpt:
      "Agrillano Berries has been acknowledged for people-first hiring pathways and strong regional workforce development.",
    href: "/news",
    image: "/news/berries-employer.webp",
    category: "People",
    date: "Mar 2026",
  },
  {
    title: "Agrillano mini melons arrive in major retail stores",
    excerpt:
      "New season mini melons are now available in selected stores, delivering sweetness, consistency, and quality.",
    href: "/news",
    image: "/news/mini-melons.webp",
    category: "Produce",
    date: "Feb 2026",
  },
  {
    title: "New protected cropping trials boost tomato flavour outcomes",
    excerpt:
      "Ongoing greenhouse innovation programs are improving flavour, shelf life, and growing efficiency across sites.",
    href: "/news",
    image: "/social/social-1.webp",
    category: "Innovation",
    date: "Jan 2026",
  },
  {
    title: "Agrillano expands sustainability initiatives in packaging and waste",
    excerpt:
      "Recent progress includes improved recoverability, higher recycled content, and stronger circular economy practices.",
    href: "/news",
    image: "/social/social-8.webp",
    category: "Sustainability",
    date: "Dec 2025",
  },
  {
    title: "Graduate and seasonal programs open for upcoming intake",
    excerpt:
      "Agrillano's early-career and harvest pathway opportunities are now open for applicants across multiple regions.",
    href: "/news",
    image: "/social/social-3.webp",
    category: "Careers",
    date: "Nov 2025",
  },
];

type NewsCard = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
  category: string;
  date: string;
};

function sanitizeHref(href: string | null | undefined) {
  if (!href) return "/news";
  if (href.startsWith("/") || href.startsWith("http://") || href.startsWith("https://")) return href;
  return "/news";
}

async function getNewsCards() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return fallbackNewsCards;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("title,excerpt,href,image_url,status,display_order")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .limit(6);

  if (error || !data || data.length === 0) return fallbackNewsCards;

  const mapped = data.map((row, index) => {
    const fallback = fallbackNewsCards[index % fallbackNewsCards.length];
    return {
      title: row.title || fallback.title,
      excerpt: row.excerpt || fallback.excerpt,
      href: sanitizeHref(row.href),
      image: row.image_url || fallback.image,
      category: fallback.category,
      date: fallback.date,
    } satisfies NewsCard;
  });

  if (mapped.length >= 6) return mapped.slice(0, 6);
  return [...mapped, ...fallbackNewsCards.slice(0, 6 - mapped.length)];
}

export default async function GeneratedPage() {
  const newsCards = await getNewsCards();

  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-white">
        <section className="-mt-[4.5rem] relative isolate overflow-hidden px-4 pb-16 pt-[8rem] lg:-mt-[5rem] md:px-8 md:pb-20 md:pt-[10rem] lg:px-10 lg:pt-[11rem]">
          <Image
            src="/gen-farm-sunrise.webp"
            alt="Agrillano farms at sunrise"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,58,34,0.70)_0%,rgba(0,77,44,0.82)_45%,rgba(0,77,44,0.88)_100%)]" />

          <div className="relative z-10 mx-auto max-w-[1200px] text-center">
            <h1 className="font-[family-name:var(--font-inter)] text-[2.35rem] font-bold leading-tight tracking-tight text-white md:text-[3.3rem] lg:text-[3.9rem]">
              Agrillano News
            </h1>
            <p className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-inter)] text-[1rem] text-white/95 md:text-[1.12rem]">
              A standard blog feed of updates, stories, and announcements from Agrillano.
            </p>
          </div>
        </section>

        <section className="bg-[#f7f8f6] px-4 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsCards.map((card, index) => (
                <article
                  key={`${card.title}-${index}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3e8e4] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                >
                  <Link href={card.href} className="block">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  <div className="flex grow flex-col p-5 md:p-6">
                    <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#3f6f58]">
                      <span>{card.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#9bb6a8]" />
                      <span>{card.date}</span>
                    </div>

                    <h2 className="font-[family-name:var(--font-inter)] text-[1.12rem] font-semibold leading-[1.3] text-[#103c2a] md:text-[1.2rem]">
                      {card.title}
                    </h2>

                    <p className="mt-3 grow font-[family-name:var(--font-inter)] text-[0.96rem] leading-[1.55] text-[#103c2a]/80">
                      {card.excerpt}
                    </p>

                    <Link
                      href={card.href}
                      className="mt-5 inline-flex items-center text-[0.9rem] font-semibold text-[#1f6b49] hover:text-[#164c35]"
                    >
                      Read article
                      <span className="ml-2" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
