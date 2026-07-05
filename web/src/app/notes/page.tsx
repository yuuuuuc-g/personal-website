import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { sanityFetch } from "@/sanity/lib/live";
import { NOTES_INDEX_QUERY } from "@/sanity/queries";

export default async function NotesIndexPage() {
  const { data: notes } = await sanityFetch({ query: NOTES_INDEX_QUERY });

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>Personal Garden</strong>
          <span>Notes</span>
        </Link>
      </header>

      <main className="article">
        <p className="kicker">Notes</p>
        <h1>正在生长的笔记</h1>
        <p className="lead">
          Seed 是问题和碎片，Sapling 是逐渐成形的理解，Evergreen 是值得长期维护的判断。
        </p>

        {notes?.length ? (
          <div className="list">
            {notes.map((note) => (
              <Link className="item" href={`/notes/${note.slug}`} key={note._id}>
                <div className="meta">
                  <StatusBadge status={note.status} />
                  <span>{note.updatedAt || note.publishedAt}</span>
                </div>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty">还没有公开笔记。</p>
        )}
      </main>
    </>
  );
}
