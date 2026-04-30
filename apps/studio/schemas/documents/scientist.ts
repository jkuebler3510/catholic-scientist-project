import { defineField, defineType } from "sanity";

export default defineType({
  name: "scientist",
  title: "Catholic Scientist (Historical)",
  type: "document",
  description:
    "Open with one paragraph that summarizes the person's contribution. Include at least one direct quote with citation. End with two further-reading links.",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "birthYear",
      title: "Birth Year",
      type: "number",
    }),
    defineField({
      name: "deathYear",
      title: "Death Year",
      type: "number",
    }),
    defineField({
      name: "field",
      title: "Field of Study",
      type: "string",
      description: 'e.g., "Genetics", "Astronomy"',
      validation: (Rule) => Rule.required().error("Field is required"),
    }),
    defineField({
      name: "nationality",
      title: "Nationality",
      type: "string",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description:
        "One paragraph, max 240 characters — used in cards and metadata",
      validation: (Rule) =>
        Rule.required()
          .max(240)
          .error("Summary must be 240 characters or less"),
    }),
    defineField({
      name: "body",
      title: "Full Biography",
      type: "richText",
      validation: (Rule) => Rule.required().error("Biography is required"),
    }),
    defineField({
      name: "keyContributions",
      title: "Key Contributions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "quotes",
      title: "Quotes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Quote Text",
              type: "text",
              validation: (Rule) =>
                Rule.required().error("Quote text is required"),
            }),
            defineField({
              name: "source",
              title: "Source/Citation",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "furtherReading",
      title: "Further Reading",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().error("Title is required"),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().error("URL is required"),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featuredOnHomepage",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      description: 'Used in the "Catholic scientist of the week" rotation',
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "portrait",
      field: "field",
    },
    prepare(selection) {
      const { title, field } = selection;
      return {
        title,
        subtitle: field,
      };
    },
  },
});
