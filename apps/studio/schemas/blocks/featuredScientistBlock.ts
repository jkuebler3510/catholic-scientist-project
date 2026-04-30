import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredScientistBlock",
  title: "Featured Scientist Block",
  type: "document",
  fields: [
    defineField({
      name: "mode",
      title: "Display Mode",
      type: "string",
      options: {
        list: [
          { title: "Weekly Rotation", value: "weekly-rotation" },
          { title: "Curated Scientist", value: "curated" },
        ],
      },
      initialValue: "weekly-rotation",
      validation: (Rule) => Rule.required().error("Mode is required"),
    }),
    defineField({
      name: "selectedScientist",
      title: "Selected Scientist",
      type: "reference",
      to: [{ type: "scientist" }],
      hidden: ({ document }) => document?.mode !== "curated",
      description: 'Only used when Display Mode is "Curated Scientist"',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Featured Scientist Block",
      };
    },
  },
});
