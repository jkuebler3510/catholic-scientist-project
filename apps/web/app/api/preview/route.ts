import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || "preview-secret";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // Verify secret
  if (secret !== PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!slug || !type) {
    return new Response("Missing slug or type", { status: 400 });
  }

  // Map document types to canonical URLs
  const typeToPath: Record<string, (slug: string) => string> = {
    post: (slug) => `/news/${slug}`,
    event: (slug) => `/events/${slug}`,
    conference: (slug) => `/conferences/${slug}`,
    talk: (slug) => `/lectures/${slug}`,
    scientist: (slug) => `/scientists-of-the-past/${slug}`,
    chapter: (slug) => `/chapters/${slug}`,
    idea: (slug) => `/ideas/${slug}`,
    page: (slug) => `/${slug}`,
    homepage: () => "/",
    siteSettings: () => "/",
  };

  const getPath = typeToPath[type];
  if (!getPath) {
    return new Response(`Unknown document type: ${type}`, { status: 400 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the canonical URL
  const path = getPath(slug);
  redirect(path);
}
