import { createFileRoute } from "@tanstack/react-router";
import { useHomeWelcomeTypewriterTitle } from "@/lib/title/use-home-welcome-typewriter-title";

export const Route = createFileRoute("/")({ component: App });

/** 路线图卡片；各专题页上线后可改为链接 + 摘要。 */
const UPCOMING_SCENARIOS: ReadonlyArray<readonly [string, string]> = [
  [
    "Next.js 上的 AI 流式交互",
    "首屏慢、逐字渲染卡顿、多窗口切换导致会话丢失——如何把实战优化落到可复用的方案里。深度稿筹备中。",
  ],
  [
    "D3.js 科研级知识图谱",
    "百万级节点与边的渲染卡顿，以及节点拖拽、关联查询如何保持流畅。深度稿筹备中。",
  ],
  [
    "Tailwind CSS + shadcn/ui 组件库",
    "组件复用冲突、样式污染，以及 PC / 平板多端适配怎么收口。深度稿筹备中。",
  ],
  [
    "多模型 API 的前端对接",
    "请求拦截、响应容错与异常降级：应对返回格式不一致与接口超时。深度稿筹备中。",
  ],
  [
    "长列表与大数据图表",
    "懒加载、虚拟滚动，以及图表联动时如何稳住帧率、避免页面崩溃。深度稿筹备中。",
  ],
];

function App() {
  useHomeWelcomeTypewriterTitle();

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--hero-blob-a),transparent_66%)]"
          aria-hidden={true}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--hero-blob-b),transparent_66%)]"
          aria-hidden={true}
        />
        <p className="island-kicker mb-3">TreeZLock</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          前端场景解决方案合集
        </h1>
        <p className="m-0 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          解决并记录前端各场景下，遇到的速度、流畅性、兼容性、异常处理方案的问题。
        </p>
      </section>

      <section
        id="scenarios"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {UPCOMING_SCENARIOS.map(([title, desc], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
