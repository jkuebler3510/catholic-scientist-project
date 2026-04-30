import { defineField, defineType } from "sanity";

export default defineType({
  name: "calloutBlock",
  title: "Callout Block",
  type: "document",
  fields: [
    defineField({
      name: "tone",
      title: "Color Tone",
      type: "string",
      options: {
        list: [
          { title: "Gold", value: "gold" },
          { title: "Claret", value: "claret" },
          { title: "Ink", value: "ink" },
          { title: "Parchment", value: "parchment" },
        ],
      },
      initialValue: "gold",
      validation: (Rule) => Rule.required().error("Tone is required"),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small text above the heading",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "action",
      title: "Call-to-Action Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Button label is required"),
        }),
        defineField({
          name: "href",
          title: "Button URL",
          type: "string",
          validation: (Rule) => Rule.required().error("Button URL is required"),
        }),
        defineField({
          name: "variant",
          title: "Button Style",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
            ],
          },
          initialValue: "primary",
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
