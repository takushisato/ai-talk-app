<template>
  <h3>ログイン</h3>
  <br />
  <nuxt-link to="/settings/reset-password">パスワードを忘れた方はこちら</nuxt-link>
  <br /><br />
  <AuthLoginForm />
</template>
<script lang="ts">
import AuthLoginForm from "./parts/AuthLoginForm.vue";
export default defineComponent({
  components: {
    AuthLoginForm,
  },
  name: "AuthLoginPage",
});
</script>
