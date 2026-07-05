import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const source = defineType({
  name: "source",
  title: "Source",
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
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "Paper", value: "paper" },
          { title: "Report", value: "report" },
          { title: "Article", value: "article" },
          { title: "Podcast", value: "podcast" },
          { title: "Video", value: "video" },
          { title: "Dataset", value: "dataset" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      kind: "kind",
    },
    prepare({ title, kind }) {
      return {
        title,
        subtitle: kind,
      };
    },
  },
});
