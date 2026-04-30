import { defineField, defineType } from "sanity";

export default defineType({
  name: "richTextBlock",
  title: "Rich Text Block",
  type: "document",
  fields: [
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      validation: (Rule) => Rule.required().error("Body content is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Rich Text Block",
      };
    },
  },
});
