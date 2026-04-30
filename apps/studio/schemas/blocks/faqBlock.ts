import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqBlock",
  title: "FAQ Block",
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
          { title: "Specific Entries", value: "entries" },
          { title: "Filter by Category", value: "category" },
        ],
      },
      initialValue: "category",
      validation: (Rule) => Rule.required().error("Mode is required"),
    }),
    defineField({
      name: "entries",
      title: "FAQ Entries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqEntry" }] }],
      hidden: ({ document }) => document?.mode !== "entries",
      description: 'Only used when Display Mode is "Specific Entries"',
    }),
    defineField({
      name: "categoryFilter",
      title: "Category",
      type: "string",
      hidden: ({ document }) => document?.mode !== "category",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Membership", value: "membership" },
          { title: "Gold Masses", value: "gold-masses" },
          { title: "Conferences", value: "conferences" },
          { title: "Donations", value: "donations" },
        ],
      },
      description: 'Only used when Display Mode is "Filter by Category"',
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
