import { createFileRoute } from "@tanstack/react-router";
import { SITE_TITLE } from "@/lib/title/site-title";
import { useDocumentTitle } from "@/lib/title/use-document-title";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  useDocumentTitle(`关于 ${SITE_TITLE}`);

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">关于</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          工程笔记，不是发布会讲稿。
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TreeZLock 用来沉淀偏实战的前端文字：流式 AI
          界面、大规模图可视化、可复用的组件体系、多厂商模型接口，以及长列表加重图表。写法上尽量把问题边界、权衡和能搬进项目的模式交代清楚。
        </p>
        <p className="mb-0 mt-6 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          站点本身用 TanStack Start 搭起来，享受类型安全的路由和现代 React
          默认能力——感谢 TanStack 团队把底座做得扎实。
        </p>
      </section>
    </main>
  );
}
