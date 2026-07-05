import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const internalLink = defineType({
  name: "internalLink",
  title: "Internal Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "reference",
      to: [{ type: "note" }, { type: "essay" }, { type: "topic" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
