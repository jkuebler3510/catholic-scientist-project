import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqEntry",
  title: "FAQ Entry",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required().error("Question is required"),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "richText",
      validation: (Rule) => Rule.required().error("Answer is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Membership", value: "membership" },
          { title: "Gold Masses", value: "gold-masses" },
          { title: "Conferences", value: "conferences" },
          { title: "Donations", value: "donations" },
        ],
      },
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required().error("Order is required"),
      description: "Lower numbers appear first within a category",
    }),
  ],
  preview: {
    select: {
      title: "question",
      category: "category",
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        title,
        subtitle: category,
      };
    },
  },
});
