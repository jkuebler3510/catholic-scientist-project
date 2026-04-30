import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "socialImage",
      title: "Default Social Share Image",
      type: "image",
      options: { hotspot: true },
      description: "Used as default Open Graph image",
    }),
    defineField({
      name: "primaryNav",
      title: "Primary Navigation",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [{ type: "footerColumn" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing Address",
      type: "richText",
    }),
    defineField({
      name: "donateUrl",
      title: "Donate URL",
      type: "string",
      initialValue: "/donate",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
