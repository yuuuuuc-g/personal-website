import type { PortableTextBlock } from "@portabletext/react";

export type Visibility = "private" | "unlisted" | "public";
export type NoteStatus = "seed" | "sapling" | "evergreen";

export type TopicSummary = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
};

export type TopicIndexItem = TopicSummary & {
  noteCount?: number | null;
  essayCount?: number | null;
};

export type SiteSettings = {
  title?: string | null;
  description?: string | null;
  currentFocus?: string[] | null;
  featuredTopics?: TopicSummary[] | null;
};

export type NoteListItem = {
  _id: string;
  title: string;
  slug: string;
  status?: NoteStatus | null;
  summary?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  topics?: TopicSummary[] | null;
};

export type EssayListItem = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
  featured?: boolean | null;
  publishedAt?: string | null;
  topics?: TopicSummary[] | null;
};

export type SourceSummary = {
  _id: string;
  title: string;
  kind?: string | null;
  url?: string | null;
};

export type Backlink = {
  _id: string;
  _type: "note" | "essay" | "topic";
  title: string;
  slug: string;
};

export type HomeData = {
  settings?: SiteSettings | null;
  latestNotes?: NoteListItem[] | null;
  featuredEssays?: EssayListItem[] | null;
  topics?: TopicSummary[] | null;
};

export type NoteDetail = NoteListItem & {
  visibility?: Visibility | null;
  body?: PortableTextBlock[] | null;
  sources?: SourceSummary[] | null;
  relatedNotes?: NoteListItem[] | null;
  backlinks?: Backlink[] | null;
};

export type EssayDetail = EssayListItem & {
  visibility?: Visibility | null;
  body?: PortableTextBlock[] | null;
  sources?: SourceSummary[] | null;
  backlinks?: Backlink[] | null;
};

export type TopicDetail = TopicSummary & {
  visibility?: Visibility | null;
  body?: PortableTextBlock[] | null;
  notes?: NoteListItem[] | null;
  essays?: EssayListItem[] | null;
};
