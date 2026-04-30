import { defineField, defineType } from "sanity";

export default defineType({
  name: "logoCloudBlock",
  title: "Logo Cloud Block",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Logo Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) =>
                Rule.required().error("Logo image is required"),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Alt text is required"),
            }),
            defineField({
              name: "url",
              title: "Link URL",
              type: "url",
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one logo is required"),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
