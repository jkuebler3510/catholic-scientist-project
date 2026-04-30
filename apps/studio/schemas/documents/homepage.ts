import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
});
