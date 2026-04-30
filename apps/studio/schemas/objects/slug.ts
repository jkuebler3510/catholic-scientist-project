import { defineField, defineType } from "sanity";

export default defineType({
  name: "slug",
  title: "Slug",
  type: "object",
  fields: [
    defineField({
      name: "current",
      title: "Current",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
  ],
});
