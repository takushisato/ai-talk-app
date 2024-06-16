<template>
  <div>
    <div v-if="!authStore.$state.isAuthenticated" class="justify-center align-baseline d-flex" style="gap: 1rem">
      <v-btn to="/auth/login" variant="plain">ログイン</v-btn>
      <v-btn to="/auth/register" variant="outlined">新規登録</v-btn>
    </div>
    <div v-else>
      <div class="text-center">
        <p>{{ authStore.$state.user?.name }} さん</p>
        <br />
        <AuthLogoutButton />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useAuthStore } from "~/composables/common/use-auth-store";
import AuthLogoutButton from "~/components/auth/logout/parts/AuthLogoutButton.vue";
export default defineComponent({
  components: {
    AuthLogoutButton,
  },
  name: "LayoutLoginStateButton",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
});
</script>
<style></style>
