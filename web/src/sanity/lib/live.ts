import type { ClientPerspective, QueryParams } from "@sanity/client";
import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { apiVersion } from "./env";

type SanityFetchOptions = {
  query: string;
  params?: QueryParams | Promise<QueryParams>;
  tags?: string[];
  perspective?: Exclude<ClientPerspective, "raw">;
  stega?: boolean;
  requestTag?: string;
};

const live = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});

export const SanityLive = live.SanityLive;

export async function sanityFetch<T>({
  query,
  params = {},
  ...options
}: SanityFetchOptions) {
  const result = await live.sanityFetch({ query, params, ...options });

  return { ...result, data: result.data as T };
}
