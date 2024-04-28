<template>
  <p>logout</p>
  <AuthLogoutButton />
</template>
<script lang="ts">
import AuthLogoutButton from "./parts/AuthLogoutButton.vue";
export default defineComponent({
  components: {
    AuthLogoutButton,
  },
  name: "AuthLogoutPage",
});
</script>
<script lang="ts" setup></script>
