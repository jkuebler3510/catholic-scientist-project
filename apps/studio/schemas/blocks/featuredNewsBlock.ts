import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredNewsBlock",
  title: "Featured News Block",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "mode",
      title: "Display Mode",
      type: "string",
      options: {
        list: [
          { title: "Latest Posts", value: "latest" },
          { title: "Curated Posts", value: "curated" },
        ],
      },
      initialValue: "latest",
      validation: (Rule) => Rule.required().error("Mode is required"),
    }),
    defineField({
      name: "count",
      title: "Number of Posts",
      type: "number",
      options: {
        list: [3, 4, 6],
      },
      initialValue: 3,
      validation: (Rule) => Rule.required().error("Count is required"),
    }),
    defineField({
      name: "selectedPosts",
      title: "Selected Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      hidden: ({ document }) => document?.mode !== "curated",
      description: 'Only used when Display Mode is "Curated Posts"',
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
