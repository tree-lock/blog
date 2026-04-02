/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** GitHub Pages 项目站等子路径部署：CI 注入 VITE_BASE_PATH=/仓库名/ */
function viteBase(): string {
  const raw = process.env.VITE_BASE_PATH?.trim();
  if (!raw || raw === "/") return "/";
  const inner = raw.replace(/^\/+|\/+$/g, "");
  return inner ? `/${inner}/` : "/";
}

const config = defineConfig({
  base: viteBase(),
  test: {
    passWithNoTests: true,
  },
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/route-tree.gen.ts",
    }),
    viteReact(),
  ],
});

export default config;
