<template>
  <div class="form">
    <div>
      <label>【必須】メールアドレス：</label>
      <v-text-field
        label="例）abc@example.com"
        variant="solo"
        type="email"
        v-model="authStore.$state.createForm.email"
        :rules="[requiredValid, mailValid]"
      ></v-text-field>
    </div>
    <br />
    <div>
      <label>【必須】パスワード：</label>
      <v-text-field
        label="半角英数字8文字以上"
        variant="solo"
        type="password"
        v-model="authStore.$state.createForm.password"
        :rules="[requiredValid, passwordLengthValid]"
      ></v-text-field>
    </div>
    <br />
    <div>
      <label>【必須】確認のため再度パスワード：</label>
      <v-text-field
        label="半角英数字8文字以上"
        variant="solo"
        type="password"
        v-model="authStore.$state.createForm.password2"
        :rules="[requiredValid, passwordLengthValid]"
      ></v-text-field>
    </div>
  </div>
</template>
<script lang="ts">
import { useAuthStore } from "@/composables/common/use-auth-store";
export default defineComponent({
  components: {},
  name: "CreateUserForm",
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
});
</script>
