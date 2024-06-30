<template>
  <div class="form">
    <div>
      <label>【必須】名前：</label>
      <v-text-field
        label="例）山田太郎"
        variant="solo"
        type="email"
        v-model="authStore.$state.createForm.name"
      ></v-text-field>
    </div>
    <br />
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
        v-model="authStore.$state.createForm.re_password"
        :rules="[requiredValid, passwordLengthValid]"
      ></v-text-field>
    </div>
    <br />
    <v-btn v-if="validationResult()" type="submit" @click="createUser()">会員登録する</v-btn>
  </div>
</template>
<script lang="ts">
import { useAuthStore } from "@/composables/common/use-auth-store";
import type { CreateUserPostData } from "@/domain/auth/create-user";
export default defineComponent({
  components: {},
  name: "CreateUserForm",
  setup() {
    const authStore = useAuthStore();

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult() {
      const emailResult = formEmailValid(authStore.$state.createForm.email);
      const passwordResult = formPasswordValid(authStore.$state.createForm.password);
      if (emailResult?.result && passwordResult?.result) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * authStateからユーザー作成
     * @
     */
    async function createUser(): Promise<void> {
      const postData: CreateUserPostData = {
        name: authStore.$state.createForm.name,
        email: authStore.$state.createForm.email,
        password: authStore.$state.createForm.password,
        re_password: authStore.$state.createForm.re_password,
      };
      console.log(postData);
      await authStore.createUser(postData);
    }

    return {
      authStore,
      validationResult,
      createUser,
    };
  },
});
</script>
