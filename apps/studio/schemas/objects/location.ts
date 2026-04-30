import { defineField, defineType } from "sanity";

export default defineType({
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    defineField({
      name: "venue",
      title: "Venue Name",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required().error("City is required"),
    }),
    defineField({
      name: "region",
      title: "State/Region",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required().error("Country is required"),
    }),
    defineField({
      name: "geo",
      title: "Geographic Coordinates",
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
    }),
  ],
  preview: {
    select: {
      venue: "venue",
      city: "city",
      country: "country",
    },
    prepare(selection) {
      const { venue, city, country } = selection;
      return {
        title: venue || city || "Location",
        subtitle: [city, country].filter(Boolean).join(", "),
      };
    },
  },
});
