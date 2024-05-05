<template>
  <div class="text-center w-100">
    <LayoutFooterMenuList />
  </div>
</template>
<script lang="ts">
import LayoutFooterMenuList from "./LayoutFooterMenuList.vue";
export default defineComponent({
  components: {
    LayoutFooterMenuList,
  },
  name: "LayoutFooterMenu",
});
</script>
