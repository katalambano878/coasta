import { createClient } from "@/lib/supabase/server";

export type PublicJob = {
  id?: string;
  title: string;
  summary: string;
  type: string;
  closingDate: string;
  category: string;
  location?: string;
  applyUrl?: string;
  infoUrl?: string;
};

const fallbackJobs: PublicJob[] = [
  {
    title: "Task Leader (Technical) - Glasshouse Operations",
    summary: "Lead technical greenhouse operations to support quality, yield, and team performance.",
    type: "Full time",
    closingDate: "Friday 1 May 2026",
    category: "Tomato",
    location: "Queensland",
  },
  {
    title: "Forklift Operator - Corindi",
    summary: "Move and stage produce safely while supporting harvest and dispatch operations.",
    type: "Casual / Seasonal",
    closingDate: "Thursday 16 April 2026",
    category: "Berries",
    location: "Corindi, NSW",
  },
  {
    title: "Casual Quality Control Officers (QCs) - Renmark, SA",
    summary: "Support quality checks and compliance processes across packhouse operations.",
    type: "Casual / Seasonal",
    closingDate: "Open until filled",
    category: "Citrus / Grapes",
    location: "Renmark, SA",
  },
  {
    title: "Irrigation Maintenance Technician - Corindi",
    summary: "Maintain irrigation systems to ensure efficient water delivery and uptime.",
    type: "Casual / Seasonal",
    closingDate: "Friday 10 April 2026",
    category: "Berries",
    location: "Corindi, NSW",
  },
  {
    title: "Warehouse Operator - Pooraka",
    summary: "Coordinate receiving, storage, and outbound loads across warehouse operations.",
    type: "Casual / Seasonal",
    closingDate: "Immediate start available",
    category: "Operations",
    location: "Pooraka, SA",
  },
  {
    title: "Harvest Team Leader - Emerald",
    summary: "Supervise picking teams and maintain safety and quality standards during harvest.",
    type: "Full time",
    closingDate: "Monday 27 April 2026",
    category: "Citrus",
    location: "Emerald, QLD",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getJobSlug(job: PublicJob) {
  const base = slugify(job.title);
  if (!job.id) return base;
  return `${base}-${job.id.slice(0, 8)}`;
}

export async function getCurrentJobs() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return fallbackJobs;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("id,title,summary,job_type,closing_date,category,location,apply_url,info_url,is_published,display_order")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackJobs;
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    type: row.job_type,
    closingDate: row.closing_date,
    category: row.category,
    location: row.location ?? undefined,
    applyUrl: row.apply_url ?? undefined,
    infoUrl: row.info_url ?? undefined,
  })) as PublicJob[];
}

