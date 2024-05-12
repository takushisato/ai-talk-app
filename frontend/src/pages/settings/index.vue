<template>
  <div class="text-center w-100">
    <p>setting</p>
    <SettingIndexPage />
  </div>
</template>
<script lang="ts">
import SettingIndexPage from "@/components/settings/SettingIndexPage.vue";
export default defineComponent({
  components: {
    SettingIndexPage,
  },
  name: "settings",
});
</script>
