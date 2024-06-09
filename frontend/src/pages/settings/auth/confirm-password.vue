<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    <SettingsConfirmPasswordSetForm :uid="uid" :token="token" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import SettingsConfirmPasswordSetForm from "~/components/settings/auth/ConfirmPasswordSetForm.vue";

export default defineComponent({
  name: "ConfirmPassword",
  components: {
    SettingsConfirmPasswordSetForm,
  },
  setup() {
    let uid = ref("");
    let token = ref("");
    const route = useRoute;
    // uid.value = route().query.uid as string;
    // token.value = route().query.token as string;

    return {
      uid,
      token,
    };
  },
});
</script>
