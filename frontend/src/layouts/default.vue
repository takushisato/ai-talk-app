<script lang="ts">
import Header from "~/components/layouts/Header.vue";
import Footer from "~/components/layouts/Footer.vue";
export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>
<template>
  <v-app id="inspire">
    <v-main class="bg-background">
      <v-container fluid>
        <Header />
        <div class="main">
          <slot />
        </div>
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.main {
  min-height: 80vh;
  max-width: 700px;
  margin: 0 auto;
}
</style>
