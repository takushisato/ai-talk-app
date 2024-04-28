<template>
  <div>
    <div v-if="!state.isAuthenticated" class="justify-center align-baseline d-flex" style="gap: 1rem">
      <v-btn to="/auth/login" variant="plain">ログイン</v-btn>
      <v-btn to="/auth/register" variant="outlined">新規登録</v-btn>
    </div>
    <div v-else>
      こんにちは！<br />
      {{ state.user?.name }} さん
      <br />
      <v-btn to="/auth/logout" variant="outlined">ログアウトする</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "LoginLogoutButton",
  setup() {
    const authStore = useAuthStore();
    const { state } = authStore;
    return { state };
  },
});
</script>
<style scoped>
.switch {
  display: none;
}
</style>
