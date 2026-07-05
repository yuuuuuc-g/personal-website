import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { NOW_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";

export default async function NowPage() {
  const { data: settings } = await sanityFetch<SiteSettings | null>({ query: NOW_QUERY });

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <strong>Personal Garden</strong>
          <span>Now</span>
        </Link>
      </header>

      <main className="article">
        <p className="kicker">Now</p>
        <h1>现在正在关注什么</h1>
        <p className="lead">
          这一页用于记录阶段性研究方向、工作重点和生活重心。它应该经常更新。
        </p>

        {settings?.currentFocus?.length ? (
          <div className="list">
            {settings.currentFocus.map((item: string) => (
              <div className="item" key={item}>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">还没有设置当前关注。可以在 Site Settings 里添加。</p>
        )}
      </main>
    </>
  );
}
