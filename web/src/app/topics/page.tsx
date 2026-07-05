import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { TOPICS_INDEX_QUERY } from "@/sanity/queries";
import type { TopicIndexItem } from "@/sanity/types";

export default async function TopicsIndexPage() {
  const { data: topics } = await sanityFetch<TopicIndexItem[]>({ query: TOPICS_INDEX_QUERY });

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>Personal Garden</strong>
          <span>Topics</span>
        </Link>
      </header>

      <main className="article">
        <p className="kicker">Topics</p>
        <h1>主题地图</h1>
        <p className="lead">主题页是知识花园的骨架，用来聚合笔记、长文和资料来源。</p>

        {topics?.length ? (
          <div className="grid">
            {topics.map((topic) => (
              <Link className="item" href={`/topics/${topic.slug}`} key={topic._id}>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <div className="meta">
                  <span>{topic.noteCount || 0} notes</span>
                  <span>{topic.essayCount || 0} essays</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty">还没有公开主题。</p>
        )}
      </main>
    </>
  );
}
