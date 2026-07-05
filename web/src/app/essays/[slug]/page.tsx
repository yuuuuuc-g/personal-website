import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { sanityFetch } from "@/sanity/lib/live";
import { ESSAY_QUERY } from "@/sanity/queries";
import type { EssayDetail } from "@/sanity/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const { data: essay } = await sanityFetch<EssayDetail | null>({
    query: ESSAY_QUERY,
    params: { slug },
  });

  if (!essay || essay.visibility === "private") {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>Personal Garden</strong>
          <span>Back to garden</span>
        </Link>
      </header>

      <main className="article">
        <p className="kicker">Essay</p>
        <h1>{essay.title}</h1>
        {essay.summary ? <p className="lead">{essay.summary}</p> : null}

        {essay.body ? (
          <div className="article-body">
            <PortableText value={essay.body} components={portableTextComponents} />
          </div>
        ) : null}
      </main>
    </>
  );
}
