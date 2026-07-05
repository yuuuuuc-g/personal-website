import { ImageIcon, LinkIcon, DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  icon: DocumentTextIcon,
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        annotations: [
          defineArrayMember({
            name: "link",
            title: "External Link",
            type: "object",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    scheme: ["http", "https", "mailto"],
                  }),
              }),
            ],
          }),
          defineArrayMember({ type: "internalLink" }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
  ],
});
