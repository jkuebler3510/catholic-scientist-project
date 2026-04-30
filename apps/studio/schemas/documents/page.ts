import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  description:
    "Generic CMS page for static content like About, Mission, Leadership, Statutes",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "breadcrumbHidden",
      title: "Hide Breadcrumb",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "heroBlock" }] },
        { type: "reference", to: [{ type: "missionStatementBlock" }] },
        { type: "reference", to: [{ type: "featuredNewsBlock" }] },
        { type: "reference", to: [{ type: "upcomingEventsBlock" }] },
        { type: "reference", to: [{ type: "featuredScientistBlock" }] },
        { type: "reference", to: [{ type: "videoSpotlightBlock" }] },
        { type: "reference", to: [{ type: "calloutBlock" }] },
        { type: "reference", to: [{ type: "testimonialBlock" }] },
        { type: "reference", to: [{ type: "richTextBlock" }] },
        { type: "reference", to: [{ type: "statsBlock" }] },
        { type: "reference", to: [{ type: "chaptersMapBlock" }] },
        { type: "reference", to: [{ type: "logoCloudBlock" }] },
        { type: "reference", to: [{ type: "timelineBlock" }] },
        { type: "reference", to: [{ type: "faqBlock" }] },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
