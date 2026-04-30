import { defineField, defineType } from "sanity";

export default defineType({
  name: "timelineBlock",
  title: "Timeline Block",
  type: "document",
  fields: [
    defineField({
      name: "events",
      title: "Timeline Events",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "number",
              validation: (Rule) => Rule.required().error("Year is required"),
            }),
            defineField({
              name: "title",
              title: "Event Title",
              type: "string",
              validation: (Rule) => Rule.required().error("Title is required"),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one event is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Timeline Block",
      };
    },
  },
});
