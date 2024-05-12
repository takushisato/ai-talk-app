<template>
  <div class="text-center w-100">
    <p>auth</p>
    <SettingAuthPage />
  </div>
</template>
<script lang="ts">
import SettingAuthPage from "@/components/settings/auth/SettingAuthPage.vue";
export default defineComponent({
  components: { SettingAuthPage },
  name: "settings-auth",
});
</script>
