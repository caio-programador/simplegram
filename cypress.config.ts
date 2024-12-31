import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },

  fixturesFolder: false,
  video: false,
  
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
