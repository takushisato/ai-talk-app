<template>
  <v-footer class="bg-footer mt-8 pa-0 footer">
    <LayoutFooterMenu />
  </v-footer>
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
<style scoped>
.footer {
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
