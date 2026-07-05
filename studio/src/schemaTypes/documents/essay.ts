import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const essay = defineType({
  name: "essay",
  title: "Essay",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visibility",
      title: "Visibility",
      type: "string",
      initialValue: "private",
      options: {
        list: [
          { title: "Private", value: "private" },
          { title: "Unlisted", value: "unlisted" },
          { title: "Public", value: "public" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "source" }] })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
