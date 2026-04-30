import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small text above the headline",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required().error("Headline is required"),
    }),
    defineField({
      name: "subhead",
      title: "Subheading / Lead",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Full-bleed Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("Hero image is required"),
    }),
    defineField({
      name: "actions",
      title: "Call-to-Action Buttons",
      type: "array",
      of: [
        {
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
              validation: (Rule) =>
                Rule.required().error("Button URL is required"),
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
        },
      ],
      validation: (Rule) => Rule.max(2).error("Maximum 2 buttons"),
    }),
    defineField({
      name: "tone",
      title: "Color Tone",
      type: "string",
      options: {
        list: [
          { title: "Gold", value: "gold" },
          { title: "Ink", value: "ink" },
          { title: "Parchment", value: "parchment" },
        ],
      },
      initialValue: "gold",
    }),
  ],
  preview: {
    select: {
      title: "headline",
      media: "image",
    },
  },
});
