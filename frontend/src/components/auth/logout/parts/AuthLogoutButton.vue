<template>
  <v-btn variant="outlined" @click="logout">ログアウトする</v-btn>
</template>
<script lang="ts">
import { useAuthStore } from "~/composables/common/use-auth-store";
export default defineComponent({
  name: "AuthLogoutButton",
  setup() {
    const authStore = useAuthStore();

    const logout = async () => {
      await authStore.logout();
      const router = useRouter();
      router.push("/");
    };

    return { logout };
  },
});
</script>
<style></style>
