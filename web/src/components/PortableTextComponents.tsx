import type { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

type InternalLinkValue = {
  reference?: {
    _type?: string;
    slug?: string;
  };
};

function hrefForReference(reference?: InternalLinkValue["reference"]) {
  if (!reference?.slug) {
    return "#";
  }

  if (reference._type === "topic") {
    return `/topics/${reference.slug}`;
  }

  if (reference._type === "essay") {
    return `/essays/${reference.slug}`;
  }

  return `/notes/${reference.slug}`;
}

export const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const href = hrefForReference((value as InternalLinkValue).reference);

      return <Link href={href}>{children}</Link>;
    },
  },
};
