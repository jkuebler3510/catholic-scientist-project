import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  description:
    "Always include venue + city. Use the event's local timezone. Add a registration URL if external; toggle in-app RSVP if SCS handles registration.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (Rule) => Rule.required().error("Summary is required"),
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Start date is required"),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      description: 'e.g., "America/New_York", "Europe/London"',
      validation: (Rule) => Rule.required().error("Timezone is required"),
      options: {
        list: [
          "America/New_York",
          "America/Chicago",
          "America/Denver",
          "America/Los_Angeles",
          "America/Anchorage",
          "Pacific/Honolulu",
          "Europe/London",
          "Europe/Paris",
          "Europe/Rome",
          "Asia/Tokyo",
          "Australia/Sydney",
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "eventCategory" }],
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "location",
      validation: (Rule) => Rule.required().error("Location is required"),
    }),
    defineField({
      name: "online",
      title: "Is Online Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "streamUrl",
      title: "Stream URL",
      type: "url",
      hidden: ({ document }) => !document?.online,
    }),
    defineField({
      name: "host",
      title: "Host",
      type: "object",
      fields: [
        defineField({
          name: "chapter",
          title: "Chapter Reference",
          type: "reference",
          to: [{ type: "chapter" }],
        }),
        defineField({
          name: "hostText",
          title: "Host Text (free-form)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
    }),
    defineField({
      name: "registrationUrl",
      title: "External Registration URL",
      type: "url",
    }),
    defineField({
      name: "registrationFormEnabled",
      title: "Enable In-App RSVP",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
    }),
    defineField({
      name: "relatedConference",
      title: "Related Conference",
      type: "reference",
      to: [{ type: "conference" }],
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
      date: "startDate",
      media: "image",
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
});
