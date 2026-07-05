import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
});
