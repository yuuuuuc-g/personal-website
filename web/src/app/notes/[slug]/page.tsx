import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { StatusBadge } from "@/components/StatusBadge";
import { sanityFetch } from "@/sanity/lib/live";
import { NOTE_QUERY } from "@/sanity/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const { data: note } = await sanityFetch({
    query: NOTE_QUERY,
    params: { slug },
  });

  if (!note || note.visibility === "private") {
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
        <div className="meta">
          <StatusBadge status={note.status} />
          <span>{note.updatedAt || note.publishedAt}</span>
        </div>
        <h1>{note.title}</h1>
        {note.summary ? <p className="lead">{note.summary}</p> : null}

        {note.body ? (
          <div className="article-body">
            <PortableText value={note.body} components={portableTextComponents} />
          </div>
        ) : null}

        {note.relatedNotes?.length ? (
          <section>
            <h2>相关笔记</h2>
            <div className="list">
              {note.relatedNotes.map((related) => (
                <Link className="item" href={`/notes/${related.slug}`} key={related._id}>
                  <div className="meta">
                    <StatusBadge status={related.status} />
                  </div>
                  <h3>{related.title}</h3>
                  <p>{related.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {note.backlinks?.length ? (
          <section>
            <h2>反向链接</h2>
            <div className="list">
              {note.backlinks.map((backlink) => (
                <Link
                  className="item"
                  href={`/${backlink._type === "topic" ? "topics" : "notes"}/${backlink.slug}`}
                  key={backlink._id}
                >
                  <h3>{backlink.title}</h3>
                  <p>{backlink._type}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
