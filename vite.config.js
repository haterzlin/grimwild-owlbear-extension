import { basename, resolve } from "node:path";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { defineConfig } from "vite";

const STATIC_COPY_TARGETS = [
  {
    from: "assets",
    to: "assets",
    filter: sourcePath => basename(sourcePath) !== "index.js"
  },
  {
    from: "data",
    to: "data"
  },
  {
    from: "icon.svg",
    to: "icon.svg"
  },
  {
    from: "manifest.json",
    to: "manifest.json"
  }
];

const SHARED_SERVER_OPTIONS = {
  host: "localhost",
  port: 8000,
  strictPort: true,
  cors: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET"
  }
};

const copyStaticTargetsPlugin = () => ({
  name: "grimwild-copy-static-targets",
  closeBundle() {
    const outputRoot = resolve("dist");

    for (const target of STATIC_COPY_TARGETS) {
      const sourcePath = resolve(target.from);
      const outputPath = resolve(outputRoot, target.to);

      if (!existsSync(sourcePath)) continue;

      rmSync(outputPath, {
        recursive: true,
        force: true
      });
      mkdirSync(resolve(outputPath, ".."), {
        recursive: true
      });

      cpSync(sourcePath, outputPath, {
        recursive: true,
        filter: target.filter
      });
    }
  }
});

export default defineConfig({
  plugins: [
    copyStaticTargetsPlugin()
  ],
  server: SHARED_SERVER_OPTIONS,
  preview: SHARED_SERVER_OPTIONS,
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        chatpopover: resolve("chatpopover/index.html")
      }
    }
  }
});
