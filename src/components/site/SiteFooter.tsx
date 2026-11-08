"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { footerLegal, footerNav } from "@/content/site";
import { CostaLogo } from "@/components/site/CostaLogo";

export function SiteFooter() {
  const [bottomLinks, setBottomLinks] = useState(footerLegal.bottomLinks);
  const mobileQuickLinks = [
    { label: "About", href: "/about-us" },
    { label: "Brands", href: "/produce" },
    { label: "Produce", href: "/produce" },
    { label: "Our Agrillano Way", href: "/our-costa-way" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact-us" },
  ];
  const cols = [
    footerNav.col1,
    footerNav.col2,
    footerNav.col3,
    footerNav.col4,
    footerNav.col5,
    footerNav.col6,
  ];

  useEffect(() => {
    let mounted = true;
    async function loadNavigation() {
      try {
        const res = await fetch("/api/public/navigation");
        if (!res.ok) return;
        const payload = (await res.json()) as { footerBottomLinks?: Array<{ label: string; href: string }> };
        if (mounted && payload.footerBottomLinks?.length) {
          setBottomLinks(payload.footerBottomLinks);
        }
      } catch {
        // Keep static fallback links.
      }
    }
    void loadNavigation();
    return () => {
      mounted = false;
    };
  }, []);

  const renderSocialIcon = (label: string) => {
    if (label === "Facebook") {
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
        </svg>
      );
    }
    if (label === "Vimeo") {
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 10.97 21c-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.118-4.105-1.566-5.705C5.833 10.15 5.255 9.124 4.582 9.124c-.164 0-.77.35-1.818 1.05L1.5 8.604c1.176-.99 2.37-2.007 3.585-3.05 1.54-1.354 2.65-2.072 3.33-2.153 1.355-.164 2.222.787 2.602 2.853.538 2.923.957 5.064 1.26 6.422.56 2.502 1.166 3.754 1.818 3.754.466 0 1.237-.76 2.313-2.28 1.074-1.518 1.66-2.673 1.76-3.46.16-1.196-.445-1.79-1.814-1.79-.652 0-1.258.14-1.817.42 1.15-3.784 3.39-5.617 6.72-5.5 2.193.076 3.193 1.34 2.988 3.792" />
        </svg>
      );
    }
    if (label === "Instagram") {
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    }
    return (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  };

  return (
    <footer className="bg-[var(--header-bg)] text-white font-[family-name:var(--font-inter)]">
      <div className="md:hidden">
        <div className="relative h-[210px] w-full">
          <Image src="/gen-bananas.webp" alt="Fresh produce close-up" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="h-10 w-full bg-[#d6e8df]" />
        <div className="px-6 pb-8 pt-8">
          <form
            action="https://www.google.com/search"
            method="get"
            target="_blank"
            className="mb-8 flex h-[48px] w-full items-center rounded-full border-[2.5px] border-white bg-white px-4"
          >
            <input type="hidden" name="sitesearch" value="agrillano.com" />
            <svg className="mr-2 h-5 w-5 text-[var(--header-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="Search here..."
              className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-neutral-800 placeholder:italic placeholder:text-neutral-500 outline-none"
            />
            <button
              type="submit"
              className="ml-2 flex items-center gap-2 rounded-full bg-[var(--header-bg)] px-3 py-1.5 text-[0.78rem] font-medium"
            >
              Search
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--header-bg)]">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 12h14m0 0l-5-5m5 5l-5 5" />
                </svg>
              </span>
            </button>
          </form>

          <div className="mb-5">
            <CostaLogo imageClassName="h-[52px] w-auto" />
            <p className="mt-4 max-w-[14rem] text-[1.05rem] font-medium leading-[1.05] text-white/95">
              Growing fresh, nutritious produce loved by all
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.99rem] leading-tight text-white/95">
              {mobileQuickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="block py-0.5 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-7 flex gap-2.5">
            {footerLegal.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-white text-[var(--header-bg)]"
              >
                {renderSocialIcon(s.label)}
              </a>
            ))}
          </div>

          <hr className="mb-5 border-t border-white/55" />
          <div className="mb-3 flex items-center justify-between text-[1.05rem]">
            {bottomLinks.slice(0, 2).map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white/80">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-[0.98rem] text-white/90">{footerLegal.copyright}</p>
          <p className="mt-1 text-center text-[0.98rem] text-white/90">
            Powered by{" "}
            <a href="https://doctorbarns.com" target="_blank" rel="noopener" className="text-white/90 hover:underline">
              Doctor Barns Tech
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mx-auto max-w-[1600px] px-6 pb-8 pt-9 lg:px-8 lg:pb-10 lg:pt-10">
        <div className="flex flex-col gap-9 lg:flex-row lg:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col lg:max-w-[22rem] xl:max-w-[24rem]">
            <div className="mb-5 lg:mb-7">
              <CostaLogo className="text-[2.1rem] md:text-[2.25rem]" imageClassName="h-[52px] w-auto md:h-[64px]" />
            </div>
            
            <h2 className="mb-4 font-[family-name:var(--font-inter)] text-[2.45rem] font-medium leading-[0.95] tracking-tight xl:text-[2.7rem]">
              Growing fresh, nutritious<br />produce loved by all
            </h2>
            
            <p className="mb-6 max-w-[22rem] font-[family-name:var(--font-inter)] text-[0.74rem] leading-[1.22] text-white/90">
              {footerLegal.acknowledgement}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {footerLegal.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-white text-[var(--header-bg)] transition hover:bg-neutral-100"
                  >
                    {renderSocialIcon(s.label)}
                  </a>
                ))}
              </div>
              <Link href="/admin/login" className="ml-1 text-[0.88rem] font-medium hover:text-white/80">
                Login to staff intranet
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 pt-1 lg:pt-0">
            {/* Search Bar */}
            <div className="mb-9 flex justify-start lg:justify-end">
              <form
                action="https://www.google.com/search"
                method="get"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[52px] w-full max-w-[500px] items-center justify-between rounded-full border-[3px] border-white bg-white p-[0.2rem] pl-5"
              >
                <input type="hidden" name="sitesearch" value="agrillano.com" />
                <div className="flex flex-1 items-center gap-3">
                  <svg className="h-[22px] w-[22px] text-[var(--header-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="q"
                    placeholder="Search here..."
                    className="w-full bg-transparent py-2.5 font-[family-name:var(--font-inter)] text-[0.9rem] text-neutral-800 placeholder:italic placeholder:text-neutral-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex h-[42px] items-center gap-3 rounded-full bg-[var(--header-bg)] px-5 py-[0.55rem] font-[family-name:var(--font-inter)] text-[0.88rem] font-medium text-white transition hover:bg-opacity-90"
                >
                  Search
                  <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border border-white bg-white text-[var(--header-bg)]">
                    <svg className="h-[13px] w-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </div>
                </button>
              </form>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-10">
              {cols.map((col) => (
                <div key={col.title} className="min-w-0">
                  <ul className="space-y-1.5">
                    {/* The column title acts as the first link visually */}
                    <li>
                      <Link
                        href={col.links[0]?.href || "/"}
                        className="text-[1.02rem] font-semibold leading-tight text-white hover:underline"
                      >
                        {col.title}
                      </Link>
                    </li>
                    {col.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-[0.97rem] leading-[1.3] text-white/90 transition hover:text-white hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="mb-2 mt-7 border-t border-white/45" />
        <div className="flex flex-col items-center justify-between gap-2 text-[0.72rem] text-white/90 md:flex-row">
          <p>
            {footerLegal.copyright} · Powered by{" "}
            <a href="https://doctorbarns.com" target="_blank" rel="noopener" className="text-white/90 hover:underline">
              Doctor Barns Tech
            </a>
          </p>
          <div className="flex gap-10">
            {bottomLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
