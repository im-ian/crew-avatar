// Bundles the React, Vue and Angular demos. The vanilla demo needs no build.
import * as esbuild from "esbuild";
import { createRequire } from "node:module";

const at = (p) => new URL(p, import.meta.url).pathname;
const common = { bundle: true, format: "esm", sourcemap: true, logLevel: "info", tsconfig: at("tsconfig.json") };

await Promise.all([
  esbuild.build({ ...common, entryPoints: [at("react/main.tsx")], outfile: at("react/out/app.js"), jsx: "automatic", define: { "process.env.NODE_ENV": '"production"' } }),
  esbuild.build({
    ...common,
    entryPoints: [at("vue/main.ts")],
    outfile: at("vue/out/app.js"),
    alias: { vue: createRequire(import.meta.url).resolve("vue/dist/vue.esm-bundler.js") }, // in-browser template compiler
    define: { __VUE_OPTIONS_API__: "true", __VUE_PROD_DEVTOOLS__: "false", __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false" },
  }),
  esbuild.build({ ...common, entryPoints: [at("angular/main.ts")], outfile: at("angular/out/app.js") }),
]);
