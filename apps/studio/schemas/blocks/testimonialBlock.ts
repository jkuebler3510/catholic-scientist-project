import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialBlock",
  title: "Testimonial Block",
  type: "document",
  fields: [
    defineField({
      name: "quotes",
      title: "Quotes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote Text",
              type: "text",
              rows: 4,
              validation: (Rule) =>
                Rule.required().error("Quote text is required"),
            }),
            defineField({
              name: "attribution",
              title: "Attribution",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Attribution is required"),
            }),
            defineField({
              name: "affiliation",
              title: "Affiliation",
              type: "string",
              description: 'e.g., "PhD Candidate, Stanford University"',
            }),
            defineField({
              name: "avatar",
              title: "Avatar Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one quote is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Testimonial Block",
      };
    },
  },
});
