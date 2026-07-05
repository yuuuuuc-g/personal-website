import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/queries";
import type { HomeData } from "@/sanity/types";

export default async function HomePage() {
  const { data } = await sanityFetch<HomeData>({ query: HOME_QUERY });
  const settings = data?.settings;
  const latestNotes = data?.latestNotes || [];
  const topics = data?.topics || [];
  const essays = data?.featuredEssays || [];

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>{settings?.title || "Personal Garden"}</strong>
          <span>China, AI, world, work, life</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/notes">Notes</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/essays">Essays</Link>
          <Link href="/now">Now</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="kicker">Digital Garden</p>
            <h1>{settings?.title || "理解中国、AI 与变化中的世界"}</h1>
            <p className="lead">
              {settings?.description ||
                "这里记录日常观察、学习笔记、资料来源和逐渐成熟的判断。它不是完成品，而是一座持续生长的个人知识花园。"}
            </p>
          </div>

          <aside className="panel">
            <h2>当前关注</h2>
            <div className="list">
              {(settings?.currentFocus || [
                "中国宏观经济与地方财政",
                "AI Agent 与知识工作",
                "国际政治经济秩序",
              ]).map((item: string) => (
                <span className="badge" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <h2>主题地图</h2>
          {topics.length > 0 ? (
            <div className="grid">
              {topics.map((topic) => (
                <Link className="item" href={`/topics/${topic.slug}`} key={topic._id}>
                  <h3>{topic.title}</h3>
                  <p>{topic.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty">还没有公开主题。先在 Sanity Studio 创建几个 topic。</p>
          )}
        </section>

        <section>
          <h2>最新笔记</h2>
          {latestNotes.length > 0 ? (
            <div className="list">
              {latestNotes.map((note) => (
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
            <p className="empty">还没有公开笔记。创建第一篇 Seed 就可以开始生长。</p>
          )}
        </section>

        {essays.length > 0 ? (
          <section>
            <h2>代表文章</h2>
            <div className="grid">
              {essays.map((essay) => (
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
