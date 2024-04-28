<template>
  <v-btn variant="outlined" @click="authStore.logout">ログアウトする</v-btn>
</template>
<script lang="ts">
import { useAuthStore } from "~/composables/common/use-auth-store";
export default defineComponent({
  name: "AuthLogoutButton",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
});
</script>
<style></style>
