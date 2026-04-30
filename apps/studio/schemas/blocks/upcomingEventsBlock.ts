import { defineField, defineType } from "sanity";

export default defineType({
  name: "upcomingEventsBlock",
  title: "Upcoming Events Block",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "count",
      title: "Number of Events",
      type: "number",
      initialValue: 3,
      validation: (Rule) =>
        Rule.required().min(1).error("Count must be at least 1"),
    }),
    defineField({
      name: "categoryFilter",
      title: "Filter by Category",
      type: "reference",
      to: [{ type: "eventCategory" }],
      description: "Optional: leave blank to show all upcoming events",
    }),
    defineField({
      name: "cta",
      title: "Call-to-Action Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Button URL",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
