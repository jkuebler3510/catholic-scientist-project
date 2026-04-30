import { defineField, defineType } from "sanity";

export default defineType({
  name: "footerColumn",
  title: "Footer Column",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Column Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Link Label",
              type: "string",
              validation: (Rule) => Rule.required().error("Label is required"),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required().error("URL is required"),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
