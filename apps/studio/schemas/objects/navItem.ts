import { defineField, defineType } from "sanity";

export default defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().error("Label is required"),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required().error("URL is required"),
    }),
    defineField({
      name: "children",
      title: "Submenu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
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
      title: "label",
    },
  },
});
