<template>
  <AuthLoginPage />
</template>
<script lang="ts">
import AuthLoginPage from "~/components/auth/login/AuthLoginPage.vue";
export default defineComponent({
  components: {
    AuthLoginPage,
  },
  name: "login",
});
</script>
<script lang="ts" setup></script>
