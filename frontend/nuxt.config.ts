// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  components: ["@/components", "@/components/blocks", "@/components/forms", "@/components/layouts"],
  css: ["vuetify/lib/styles/main.sass", "@/assets/styles/style.scss", "@mdi/font/css/materialdesignicons.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
