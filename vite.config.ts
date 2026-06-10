import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;

export default defineConfig({
base: "/thebox-ulsan/",
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  plugins: [
    {
      name: "serve-consultation",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0];
          if (url === "/consultation" || url === "/consultation/") {
            const filePath = path.resolve(import.meta.dirname, "public/consultation/index.html");
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(fs.readFileSync(filePath));
            return;
          }
          if (url === "/program" || url === "/program/") {
            const filePath = path.resolve(import.meta.dirname, "public/program/index.html");
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(fs.readFileSync(filePath));
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
