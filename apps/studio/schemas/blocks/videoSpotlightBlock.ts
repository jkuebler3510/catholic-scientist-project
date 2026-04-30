import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoSpotlightBlock",
  title: "Video Spotlight Block",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().error("Heading is required"),
    }),
    defineField({
      name: "talkRef",
      title: "Talk / Lecture",
      type: "reference",
      to: [{ type: "talk" }],
      validation: (Rule) => Rule.required().error("Talk is required"),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
