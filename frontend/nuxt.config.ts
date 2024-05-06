// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  components: ["@/components"],
  css: [
    "vuetify/lib/styles/main.sass",
    "@/assets/styles/style.scss",
    "@mdi/font/css/materialdesignicons.css",
    "~/assets/styles/tailwind.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
