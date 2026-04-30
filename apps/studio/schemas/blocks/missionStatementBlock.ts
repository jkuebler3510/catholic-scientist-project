import { defineField, defineType } from "sanity";

export default defineType({
  name: "missionStatementBlock",
  title: "Mission Statement Block",
  type: "document",
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      validation: (Rule) => Rule.required().error("Kicker is required"),
    }),
    defineField({
      name: "statement",
      title: "Mission Statement",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required().error("Statement is required"),
      description: "Large serif paragraph for pull-quote treatment",
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
      description: 'e.g., "— The Society of Catholic Scientists"',
    }),
  ],
  preview: {
    select: {
      title: "kicker",
    },
  },
});
