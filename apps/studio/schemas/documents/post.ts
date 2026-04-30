import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "News Post",
  type: "document",
  description:
    "150–800 words. Lead with the news. Use H2 (not bold) for sections. Link to source materials.",
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
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(240)
          .error("Excerpt must be 240 characters or less"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImageAlt",
      title: "Cover Image Alt Text",
      type: "string",
      description: "Required if a cover image is set",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Publish date is required"),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      validation: (Rule) => Rule.required().error("Body content is required"),
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
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
      media: "coverImage",
      date: "publishedAt",
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
