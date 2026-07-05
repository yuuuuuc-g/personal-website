import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
};

export async function sanityFetch<T>({ query, params = {} }: SanityFetchOptions) {
  const data = await client.fetch<T>(query, params);

  return { data };
}

export function SanityLive() {
  return null;
}
