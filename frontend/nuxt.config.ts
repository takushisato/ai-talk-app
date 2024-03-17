// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  components: ["@/components", "@/components/parts", "@/components/blocks", "@/components/forms"],
  modules: [],
  css: ["vuetify/lib/styles/main.sass", "@/assets/styles/style.scss"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
