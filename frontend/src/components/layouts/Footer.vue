<template>
  <footer class="bg-footer mt-8 py-8">
    <FooterMenu />
  </footer>
</template>
<script lang="ts">
import FooterMenu from "./parts/FooterMenu.vue";
export default defineComponent({
  components: {
    FooterMenu,
  },
  name: "Footer",
});
</script>
<style scoped></style>
