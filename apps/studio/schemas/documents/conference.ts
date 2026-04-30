import { defineField, defineType } from "sanity";

export default defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().error("Year is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "year",
        maxLength: 4,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "dates",
      title: "Conference Dates",
      type: "object",
      fields: [
        defineField({
          name: "start",
          title: "Start Date",
          type: "datetime",
          validation: (Rule) => Rule.required().error("Start date is required"),
        }),
        defineField({
          name: "end",
          title: "End Date",
          type: "datetime",
          validation: (Rule) => Rule.required().error("End date is required"),
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "location",
      validation: (Rule) => Rule.required().error("Location is required"),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (Rule) => Rule.required().error("Summary is required"),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "programPdf",
      title: "Program PDF",
      type: "file",
    }),
    defineField({
      name: "talks",
      title: "Talks",
      type: "array",
      of: [{ type: "reference", to: [{ type: "talk" }] }],
    }),
    defineField({
      name: "registrationOpen",
      title: "Registration Open",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "richText",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
    },
    prepare(selection) {
      const { title, year } = selection;
      return {
        title: `${title} ${year}`,
      };
    },
  },
});
