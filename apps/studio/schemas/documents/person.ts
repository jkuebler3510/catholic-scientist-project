import { defineField, defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
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
      name: "title",
      title: "Title/Position",
      type: "string",
      description: 'e.g., "Professor of Physics, Boston College"',
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "richText",
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Board Member", value: "board" },
          { title: "Author", value: "author" },
          { title: "Speaker", value: "speaker" },
          { title: "Chapter Coordinator", value: "coordinator" },
        ],
      },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required().error("Label is required"),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().error("URL is required"),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "headshot",
    },
  },
});
