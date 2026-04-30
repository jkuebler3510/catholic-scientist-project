import { defineField, defineType } from "sanity";

export default defineType({
  name: "chapter",
  title: "Chapter",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Chapter Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Chapter name is required"),
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
      name: "region",
      title: "Region",
      type: "string",
      description: 'e.g., "Northeast US", "Italy"',
      validation: (Rule) => Rule.required().error("Region is required"),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required().error("Country is required"),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-90).max(90),
        }),
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-180).max(180),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error("Coordinates are required for the map"),
    }),
    defineField({
      name: "coordinator",
      title: "Coordinator",
      type: "reference",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required().error("Coordinator is required"),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
    }),
    defineField({
      name: "partnerInstitutions",
      title: "Partner Institutions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Institution Name",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Institution name is required"),
            }),
            defineField({
              name: "url",
              title: "Website URL",
              type: "url",
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
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
      country: "country",
    },
    prepare(selection) {
      const { title, country } = selection;
      return {
        title,
        subtitle: country,
      };
    },
  },
});
