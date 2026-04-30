import { defineField, defineType } from "sanity";

export default defineType({
  name: "talk",
  title: "Talk / Lecture",
  type: "document",
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
      name: "speaker",
      title: "Speaker",
      type: "reference",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required().error("Speaker is required"),
    }),
    defineField({
      name: "coSpeakers",
      title: "Co-Speakers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "date",
      title: "Date & Time",
      type: "datetime",
      description: "Optional — falls back to parent conference date if not set",
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID",
      type: "string",
      validation: (Rule) => Rule.required().error("YouTube ID is required"),
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      description: "Auto-fetched from YouTube if missing",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
    }),
    defineField({
      name: "parentConference",
      title: "Parent Conference",
      type: "reference",
      to: [{ type: "conference" }],
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "durationMinutes",
      title: "Duration (minutes)",
      type: "number",
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
      speaker: "speaker.name",
    },
    prepare(selection) {
      const { title, speaker } = selection;
      return {
        title,
        subtitle: speaker ? `Speaker: ${speaker}` : "No speaker assigned",
      };
    },
  },
});
