import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { ESSAYS_INDEX_QUERY } from "@/sanity/queries";

export default async function EssaysIndexPage() {
  const { data: essays } = await sanityFetch({ query: ESSAYS_INDEX_QUERY });

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>Personal Garden</strong>
          <span>Essays</span>
        </Link>
      </header>

      <main className="article">
        <p className="kicker">Essays</p>
        <h1>成熟文章</h1>
        <p className="lead">这里放更完整、更适合对外传播的文章。</p>

        {essays?.length ? (
          <div className="list">
            {essays.map((essay) => (
              <Link className="item" href={`/essays/${essay.slug}`} key={essay._id}>
                <div className="meta">
                  {essay.featured ? <span className="badge">Featured</span> : null}
                  <span>{essay.publishedAt}</span>
                </div>
                <h3>{essay.title}</h3>
                <p>{essay.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty">还没有公开长文。</p>
        )}
      </main>
    </>
  );
}
