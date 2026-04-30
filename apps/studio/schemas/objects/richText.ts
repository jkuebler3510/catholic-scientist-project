import { defineField, defineType } from "sanity";

export default defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            type: "object",
            name: "link",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "string",
              }),
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
    },
  ],
});
