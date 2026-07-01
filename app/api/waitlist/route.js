// app/api/waitlist/route.js
//
// Handles POST { email, product } from every platform page's waitlist
// form. Uses the Supabase anon key — safe to use here because the
// waitlist table's RLS policy only permits INSERT, never SELECT/
// UPDATE/DELETE, so this key can't be used to read or tamper with
// the list even if someone found it.

import { createClient } from "@supabase/supabase-js";
import { THEMES } from "@/lib/theme";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only accept product values that actually correspond to a real
// platform, so the table can't get polluted by a malformed or
// malicious request.
const VALID_PRODUCTS = new Set([
  ...Object.keys(THEMES).map((slug) => `ubuntu-${slug}`),
]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const product = typeof body.product === "string" ? body.product.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!VALID_PRODUCTS.has(product)) {
    return Response.json({ error: "Unknown product" }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert({ email, product });

  if (error) {
    // Postgres unique_violation — they already signed up for this
    // product. Treat as success so the UI doesn't show an error for
    // something that isn't really a failure from the user's side.
    if (error.code === "23505") {
      return Response.json({ status: "already_on_list" }, { status: 200 });
    }
    console.error("Waitlist insert failed:", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return Response.json({ status: "joined" }, { status: 200 });
}
