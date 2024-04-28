<template>
  <footer class="bg-footer mt-8 py-8">
    <LayoutFooterMenu />
  </footer>
</template>
<script lang="ts">
import LayoutFooterMenu from "./parts/LayoutFooterMenu.vue";
export default defineComponent({
  components: {
    LayoutFooterMenu,
  },
  name: "Footer",
});
</script>
<style scoped></style>
