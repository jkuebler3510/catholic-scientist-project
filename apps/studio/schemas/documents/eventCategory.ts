import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventCategory",
  title: "Event Category",
  type: "document",
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
      name: "color",
      title: "Color Token",
      type: "string",
      description:
        'Reference to a Tailwind color token (e.g., "gold-500", "ink-800")',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
