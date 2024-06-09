<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    <SettingsConfirmPasswordSetForm :uid="uid" :token="token" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ConfirmPassword",
  setup() {
    const route = useRoute;
    const uid = ref(route().query.uid);
    const token = ref(route().query.token);

    return {
      uid,
      token,
    };
  },
});
</script>
