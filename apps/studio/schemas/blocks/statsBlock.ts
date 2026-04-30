import { defineField, defineType } from "sanity";

export default defineType({
  name: "statsBlock",
  title: "Stats Block",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Statistics",
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
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required().error("Value is required"),
              description: 'e.g., "1,800+", "27", "9"',
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Optional sub-text",
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(3).max(4).error("3 or 4 stats required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Stats Block",
      };
    },
  },
});
