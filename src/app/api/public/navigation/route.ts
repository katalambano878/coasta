import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { footerLegal, footerNav, mainNav, type NavLink } from "@/content/site";

type NavRow = {
  area: "main" | "footer";
  parent_label: string | null;
  label: string;
  href: string;
  display_order: number;
};

function normalizeBrandCopy(value: string): string {
  return value.replace(/\bCosta\b/g, "Agrillano");
}

function isSafeHref(href: string): boolean {
  if (!href || typeof href !== "string") return false;
  const trimmed = href.trim();
  if (trimmed === "#" || trimmed === "") return false;
  if (trimmed.startsWith("/")) return true;
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) return true;
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return true;
  return false;
}

function sanitizeHref(href: string, fallback = "/"): string {
  return isSafeHref(href) ? href.trim() : fallback;
}

function isRemovedProducePath(href: string) {
  return href === "/produce/berries-international";
}

function buildMain(rows: NavRow[]): NavLink[] {
  const mainRows = rows.filter((row) => row.area === "main");
  const roots = mainRows.filter((row) => !row.parent_label);
  if (roots.length === 0) return mainNav;

  return roots.map((root) => {
    const children = mainRows
      .filter((row) => normalizeBrandCopy(row.parent_label ?? "") === normalizeBrandCopy(root.label))
      .map((row) => ({ label: normalizeBrandCopy(row.label), href: sanitizeHref(row.href) }))
      .filter((row) => !isRemovedProducePath(row.href));
    return {
      label: normalizeBrandCopy(root.label),
      href: sanitizeHref(root.href),
      children: children.length ? children : undefined,
    };
  });
}

function buildFooter(rows: NavRow[]) {
  const footerRows = rows
    .filter((row) => row.area === "footer")
    .map((row) => ({ label: normalizeBrandCopy(row.label), href: sanitizeHref(row.href) }));
  if (footerRows.length === 0) return footerLegal.bottomLinks;
  return footerRows;
}

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({
      mainNav,
      footerBottomLinks: footerLegal.bottomLinks,
      footerCols: footerNav,
    });
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("navigation_links")
    .select("area,parent_label,label,href,display_order")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        mainNav,
        footerBottomLinks: footerLegal.bottomLinks,
        footerCols: footerNav,
      },
      { status: 200 },
    );
  }

  const rows = (data ?? []) as NavRow[];
  return NextResponse.json({
    mainNav: buildMain(rows),
    footerBottomLinks: buildFooter(rows),
    footerCols: footerNav,
  });
}

