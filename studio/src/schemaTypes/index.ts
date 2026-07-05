import { essay } from "./documents/essay";
import { journal } from "./documents/journal";
import { note } from "./documents/note";
import { siteSettings } from "./documents/siteSettings";
import { source } from "./documents/source";
import { topic } from "./documents/topic";
import { blockContent } from "./objects/blockContent";
import { internalLink } from "./objects/internalLink";
import { seo } from "./objects/seo";

export const schemaTypes = [
  note,
  essay,
  topic,
  journal,
  source,
  siteSettings,
  blockContent,
  internalLink,
  seo,
];
