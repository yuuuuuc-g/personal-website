import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const journal = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  icon: DocumentIcon,
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
      name: "kind",
      title: "Journal Kind",
      type: "string",
      initialValue: "daily",
      options: {
        list: [
          { title: "Daily", value: "daily" },
          { title: "Weekly", value: "weekly" },
          { title: "Monthly", value: "monthly" },
          { title: "Annual", value: "annual" },
        ],
        layout: "radio",
      },
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
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
});
