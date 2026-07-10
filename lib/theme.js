/**
 * lib/theme.js
 *
 * Single source of truth for Ebbli's ecosystem branding.
 * Every product landing page reads from this instead of hardcoding
 * its own colors, emoji, or ecosystem list — so a rebrand or a new
 * product only needs to change one file.
 *
 * Usage:
 *   import { THEMES, ECOSYSTEM_LIST, getTheme } from "@/lib/theme";
 *
 *   const theme = getTheme("learn");
 *   // theme.primary, theme.primaryDeep, theme.name, theme.tagline, ...
 */

// The master ubuntu.africa brand — separate from individual product
// THEMES below, used only by the root ecosystem homepage.
export const BRAND = {
  name: "Ebbli",
  tagline: "Building Africa's Human Infrastructure through AI.",
  mission:
    "Using AI to solve Africa's greatest problems by strengthening people and communities — through the mind, the heart, the professional, the builder, the body, the steward, and the provider.",
  primary: "#20231f",
  primaryDeep: "#0f110e",
};

// Every named AI companion across the ecosystem, for the homepage's
// "meet the family" section. Add to this as new products launch.
export const ADVISORS = [
  { name: "Zuri", role: "Matchmaking Specialist", product: "connect", initial: "Z" },
  { name: "Amani", role: "Relationship Advisor", product: "connect", initial: "A" },
  { name: "Nia", role: "Learning Advisor", product: "learn", initial: "N" },
  { name: "Fursa", role: "Career Coach", product: "jobs", initial: "F" },
  { name: "Jenga", role: "Business Advisor", product: "business", initial: "J" },
  { name: "Afya", role: "Health Coach", product: "health", initial: "A" },
  { name: "Amana", role: "Financial Coach", product: "money", initial: "A" },
  { name: "Mavuno", role: "Farm Advisor", product: "farmer", initial: "M" },
  { name: "Kiongozi", role: "Leadership Coach", product: "leadership", initial: "K" },
  { name: "Huduma", role: "Care Advisor", product: "care", initial: "H" },
  { name: "Haki", role: "Justice Advisor", product: "justice", initial: "H" },
];

export const THEMES = {
  learn: {
    slug: "learn",
    name: "Ebbli Learn",
    tagline: "Learn AI free, earn income.",
    emoji: "🎓",
    primary: "#24476b",
    primaryDeep: "#16304d",
    status: "live",
    href: "https://learn.ebbli.co",
  },
  connect: {
    slug: "connect",
    name: "Ebbli Connect",
    tagline: "Find your person in Africa.",
    emoji: "💛",
    primary: "#1b4332",
    primaryDeep: "#122b20",
    status: "live",
    href: "https://connect.ebbli.co",
  },
  jobs: {
    slug: "jobs",
    name: "Ebbli Jobs",
    tagline: "Land your dream job in Africa.",
    emoji: "💼",
    primary: "#92400e",
    primaryDeep: "#6b2f0a",
    status: "waitlist",
    href: "/jobs",
  },
  business: {
    slug: "business",
    name: "Ebbli Business",
    tagline: "Launch & grow your business.",
    emoji: "🌱",
    primary: "#6b2545",
    primaryDeep: "#4a1830",
    status: "waitlist",
    href: "/business",
  },
  health: {
    slug: "health",
    name: "Ebbli Health",
    tagline: "Live longer, feel your best.",
    emoji: "🩺",
    primary: "#0e7c7b",
    primaryDeep: "#095452",
    status: "waitlist",
    href: "/health",
  },
  money: {
    slug: "money",
    name: "Ebbli Finance",
    tagline: "Build wealth & secure your future.",
    emoji: "💰",
    primary: "#8a6d1f",
    primaryDeep: "#5c4914",
    status: "waitlist",
    href: "/money",
  },
  farmer: {
    slug: "farmer",
    name: "Ebbli Farmer",
    tagline: "Grow more, sell more, earn more.",
    emoji: "🌾",
    primary: "#5b6b2f",
    primaryDeep: "#3d481f",
    status: "waitlist",
    href: "/farmer",
  },
  community: {
    slug: "community",
    name: "Ebbli Community",
    tagline: "Find your tribe, never alone.",
    emoji: "🤝",
    primary: "#4c1d95",
    primaryDeep: "#2e1065",
    status: "waitlist",
    href: "/community",
  },
  family: {
    slug: "family",
    name: "Ebbli Family",
    tagline: "Raise a strong, thriving family.",
    emoji: "🏡",
    primary: "#9d174d",
    primaryDeep: "#6d0f35",
    status: "waitlist",
    href: "/family",
  },
  build: {
    slug: "build",
    name: "Ebbli Build",
    tagline: "Turn your ideas into reality.",
    emoji: "🏗️",
    primary: "#1e3a5f",
    primaryDeep: "#122540",
    status: "waitlist",
    href: "/build",
  },
};

// Layer 1 — AI Coach, keyed by product slug for easy lookup
// (same people listed in ADVISORS above, indexed differently).
export const COACHES = {
  connect:    { name: "Amani",    role: "Relationship Advisor" },
  learn:      { name: "Nia",      role: "Learning Advisor" },
  jobs:       { name: "Fursa",    role: "Career Coach" },
  business:   { name: "Jenga",    role: "Business Advisor" },
  health:     { name: "Afya",     role: "Health Coach" },
  money:      { name: "Amana",    role: "Financial Coach" },
  farmer:     { name: "Mavuno",   role: "Farm Advisor" },
  leadership: { name: "Kiongozi", role: "Leadership Coach" },
  care:       { name: "Huduma",   role: "Care Advisor" },
  justice:    { name: "Haki",     role: "Justice Advisor" },
  community:  { name: "Umoja",   role: "Community Advisor" },
  family:     { name: "Familia", role: "Family Advisor" },
  build:      { name: "Mjenzi", role: "Building Advisor" },
};

// Layer 2 — the Transformation Engine. This is each platform's
// defining feature: not advice, but an active system that moves
// the person toward the outcome they came for. Named per the
// Ebbli Ecosystem Universal Transformation Engine spec.
export const ENGINES = {
  connect: {
    name: "The Matchmaker",
    tagline: "Match healthy people into healthy relationships.",
    driver: "Zuri",
    outputs: ["Trusted introductions", "Weekly matchmaker updates", "Readiness-informed matching"],
  },
  learn: {
    name: "The Learning Path Builder",
    tagline: "A dynamic, personalised learning journey that adapts as you grow.",
    outputs: ["Daily missions", "Lessons", "Projects", "Reflection", "Practice", "Assessments"],
  },
  jobs: {
    name: "The Opportunity Matcher",
    tagline: "Matched to opportunities, not just shown a list of vacancies.",
    outputs: ["Employment", "Remote work", "Freelancing", "Apprenticeships", "Internships", "Mentorship"],
  },
  business: {
    name: "The Business Builder",
    tagline: "An AI co-founder who recommends the single highest-impact action, every day.",
    outputs: ["Validate an idea", "Contact customers", "Improve pricing", "Launch marketing", "Build systems", "Prepare for funding"],
  },
  health: {
    name: "The Habit Builder",
    tagline: "Turns healthy intentions into lifelong habits.",
    outputs: ["Hydration", "Walking", "Exercise", "Nutrition", "Medication reminders", "Sleep routines"],
  },
  money: {
    name: "The Wealth Builder",
    tagline: "Small, consistent improvements that build lasting financial security.",
    outputs: ["Budget improvements", "Saving goals", "Debt reduction", "Emergency fund milestones", "Investment readiness"],
  },
  farmer: {
    name: "The Farm Planner",
    tagline: "Your intelligent operational planner, deciding with you every day.",
    outputs: ["Seasonal calendars", "Daily farm tasks", "Weather-based recommendations", "Pest monitoring", "Market timing"],
  },
  leadership: {
    name: "The Leadership Forge",
    tagline: "Turns potential into influence — one decision at a time.",
    outputs: ["Leadership assessments", "Daily challenges", "Vision clarity", "Communication coaching", "Community impact plans"],
  },
  care: {
    name: "The Care Compass",
    tagline: "Guides caregivers so the people they love are never left behind.",
    outputs: ["Care plans", "Elder support checklists", "Caregiver burnout alerts", "Resource matching", "Family coordination"],
  },
  justice: {
    name: "The Rights Navigator",
    tagline: "Makes the law understandable and accessible for every Kenyan.",
    outputs: ["Rights education", "Document templates", "Case preparation guides", "Legal resource matching", "Know-your-rights alerts"],
  },
  community: {
    name: "The Circle Builder",
    tagline: "Connects you to your people — purpose-driven groups, local and online.",
    outputs: ["Interest circles", "Neighbourhood groups", "Peer accountability", "Mentorship matching", "Events and meetups"],
  },
  family: {
    name: "The Family Builder",
    tagline: "Supports every stage of marriage and parenting with wisdom and tools.",
    outputs: ["Marriage readiness", "Parenting plans", "Conflict resolution", "Child milestones", "Family goal setting"],
  },
  build: {
    name: "The Blueprint",
    tagline: "Turns your building dream into a step-by-step plan you can actually execute.",
    outputs: ["Project scoping", "Cost estimates", "Material lists", "Contractor guides", "Phase-by-phase plans"],
  },
};


// Shared across every theme — the "family" thread that ties the
// ecosystem together regardless of each product's primary color.
export const SHARED_TOKENS = {
  cream: "#faf7f0",
  ink: "#20231f",
  inkSoft: "#5c5e58",
  gold: "#d6a24a",
  terracotta: "#c1502e",
  indigo: "#2c5f77",
  cardBg: "#ffffff",
  line: "rgba(32, 35, 31, 0.1)",
};

const ECOSYSTEM_ORDER = ['connect','learn','jobs','business','farmer','money','health','community','family','build'];

/** Ordered list for rendering ecosystem strips. Pass the current
 * page's slug to exclude it from its own strip. */
export function getEcosystemList(excludeSlug) {
  return ECOSYSTEM_ORDER
    .filter(slug => slug !== excludeSlug && THEMES[slug])
    .map(slug => THEMES[slug]);
}

export function getTheme(slug) {
  return THEMES[slug] ?? null;
}
