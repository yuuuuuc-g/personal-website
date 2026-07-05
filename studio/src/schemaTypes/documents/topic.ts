import { TagIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  icon: TagIcon,
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
      initialValue: "public",
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "priority",
      title: "Homepage Priority",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "parentTopic",
      title: "Parent Topic",
      type: "reference",
      to: [{ type: "topic" }],
    }),
    defineField({
      name: "relatedTopics",
      title: "Related Topics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
