/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import http from "node:http";

function makeMultiPortPlugin(PORTS) {
  return {
    name: "multiport-server",
    configureServer(server) {
      const others = PORTS.slice(1);
      for (const p of others) {
        const srv = http.createServer(server.middlewares);
        srv.on("error", (err) => {
          console.warn(`[multiport] failed to bind ${p}:`, err?.message || err);
        });
        srv.listen(p, () => console.log(`[multiport] http://localhost:${p}`));
      }
      console.log(`[multiport] active ports: ${PORTS.join(", ")}`);
    },
    configurePreviewServer(server) {
      const others = PORTS.slice(1);
      for (const p of others) {
        const srv = http.createServer(server.middlewares);
        srv.on("error", (err) => {
          console.warn(
            `[multiport-preview] failed to bind ${p}:`,
            err?.message || err
          );
        });
        srv.listen(p, () =>
          console.log(`[multiport-preview] http://localhost:${p}`)
        );
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const portsRaw = env.PORTS || "5000,5001,5002,5003,5004,5005";
  const PORTS = portsRaw
    .split(",")
    .map((p) => Number(p.trim()))
    .filter(Boolean);

  const BASE_PORT = PORTS[0] || 5000;

  return {
    plugins: [react(), makeMultiPortPlugin(PORTS)],
    server: {
      port: BASE_PORT,
      strictPort: true,
      hmr: { host: "localhost", port: BASE_PORT, clientPort: BASE_PORT },
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["import", "global-builtin"],
        },
      },
    },
  };
});
