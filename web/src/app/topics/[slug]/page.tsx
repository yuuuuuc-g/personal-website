import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { StatusBadge } from "@/components/StatusBadge";
import { sanityFetch } from "@/sanity/lib/live";
import { TOPIC_QUERY } from "@/sanity/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const { data: topic } = await sanityFetch({
    query: TOPIC_QUERY,
    params: { slug },
  });

  if (!topic || topic.visibility === "private") {
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
        <p className="kicker">Topic</p>
        <h1>{topic.title}</h1>
        {topic.summary ? <p className="lead">{topic.summary}</p> : null}

        {topic.body ? (
          <div className="article-body">
            <PortableText value={topic.body} components={portableTextComponents} />
          </div>
        ) : null}

        {topic.notes?.length ? (
          <section>
            <h2>相关笔记</h2>
            <div className="list">
              {topic.notes.map((note) => (
                <Link className="item" href={`/notes/${note.slug}`} key={note._id}>
                  <div className="meta">
                    <StatusBadge status={note.status} />
                  </div>
                  <h3>{note.title}</h3>
                  <p>{note.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {topic.essays?.length ? (
          <section>
            <h2>相关长文</h2>
            <div className="list">
              {topic.essays.map((essay) => (
                <Link className="item" href={`/essays/${essay.slug}`} key={essay._id}>
                  <h3>{essay.title}</h3>
                  <p>{essay.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
