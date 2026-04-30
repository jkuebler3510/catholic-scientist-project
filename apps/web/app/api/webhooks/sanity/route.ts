import { revalidatePath, revalidateTag } from "next/cache";
import { createHmac } from "crypto";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || "";

function isValidSignature(body: string, signature: string | null): boolean {
  if (!signature || !SANITY_WEBHOOK_SECRET) {
    console.error("Missing signature or webhook secret");
    return false;
  }

  const hash = createHmac("sha256", SANITY_WEBHOOK_SECRET)
    .update(body)
    .digest("base64");

  return hash === signature;
}

interface WebhookPayload {
  _type: string;
  slug?: { current: string };
  year?: number;
  _id?: string;
}

function tagsFor(payload: WebhookPayload): string[] {
  const { _type, slug, year } = payload;
  const tags: string[] = [];

  switch (_type) {
    case "post":
      tags.push("post:list");
      if (slug?.current) tags.push(`post:slug:${slug.current}`);
      break;
    case "event":
      tags.push("event:list", "event:upcoming");
      if (slug?.current) tags.push(`event:slug:${slug.current}`);
      break;
    case "conference":
      tags.push("conference:list");
      if (year) tags.push(`conference:year:${year}`);
      break;
    case "talk":
      tags.push("talk:list");
      if (slug?.current) tags.push(`talk:slug:${slug.current}`);
      break;
    case "scientist":
      tags.push("scientist:list");
      if (slug?.current) tags.push(`scientist:slug:${slug.current}`);
      break;
    case "chapter":
      tags.push("chapter:list");
      if (slug?.current) tags.push(`chapter:slug:${slug.current}`);
      break;
    case "idea":
      tags.push("idea:list");
      if (slug?.current) tags.push(`idea:slug:${slug.current}`);
      break;
    case "faqEntry":
      tags.push("faqEntry:list");
      break;
    case "homepage":
      tags.push("homepage", "post:list", "event:upcoming", "scientist:list");
      break;
    case "siteSettings":
      tags.push("siteSettings");
      break;
    case "page":
      if (slug?.current) tags.push(`page:slug:${slug.current}`);
      break;
  }

  return tags;
}

export async function POST(request: Request) {
  const signature = request.headers.get("sanity-webhook-signature");
  const body = await request.text();

  if (!isValidSignature(body, signature)) {
    console.error("Invalid webhook signature");
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const payload: WebhookPayload = JSON.parse(body);
    const tags = tagsFor(payload);

    // Revalidate all affected tags
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Also revalidate certain paths
    if (payload._type === "post" && payload.slug?.current) {
      revalidatePath(`/news/${payload.slug.current}`);
      revalidatePath("/news");
    } else if (payload._type === "event" && payload.slug?.current) {
      revalidatePath(`/events/${payload.slug.current}`);
      revalidatePath("/events");
    } else if (payload._type === "conference" && payload.year) {
      revalidatePath(`/conferences/${payload.year}`);
      revalidatePath("/conferences");
    } else if (payload._type === "talk" && payload.slug?.current) {
      revalidatePath(`/lectures/${payload.slug.current}`);
      revalidatePath("/lectures");
    } else if (payload._type === "scientist" && payload.slug?.current) {
      revalidatePath(`/scientists-of-the-past/${payload.slug.current}`);
      revalidatePath("/scientists-of-the-past");
    } else if (payload._type === "chapter" && payload.slug?.current) {
      revalidatePath(`/chapters/${payload.slug.current}`);
      revalidatePath("/chapters");
    } else if (payload._type === "idea" && payload.slug?.current) {
      revalidatePath(`/ideas/${payload.slug.current}`);
      revalidatePath("/ideas");
    } else if (payload._type === "page" && payload.slug?.current) {
      revalidatePath(`/${payload.slug.current}`);
    } else if (payload._type === "homepage") {
      revalidatePath("/");
    }

    return Response.json({
      revalidated: tags,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
