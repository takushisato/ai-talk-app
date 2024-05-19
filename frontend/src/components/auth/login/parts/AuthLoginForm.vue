<template>
  <div class="form">
    <div>
      <label>【必須】メールアドレス：</label>
      <v-text-field
        label="【必須】メールアドレス"
        variant="solo"
        type="email"
        v-model="authStore.$state.form.email"
        :rules="[requiredValid, mailValid]"
      ></v-text-field>
    </div>
    <br />
    <div>
      <label>【必須】パスワード：</label>
      <v-text-field
        label="【必須】パスワード"
        variant="solo"
        type="password"
        v-model="authStore.$state.form.password"
        :rules="[requiredValid, passwordLengthValid]"
      ></v-text-field>
    </div>
    <br />
    <v-btn v-if="validationResult()" type="submit" @click="login()">ログインする</v-btn>
    <v-dialog v-model="authStore.$state.dialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>ログインしました</p>
          <br />
          <p>自動ログインが２４時間有効となります</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="topPageMove()">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div class="h-screen"></div>
</template>
<script lang="ts">
import { useAuthStore } from "@/composables/common/use-auth-store";
import { requiredValid, mailValid, passwordLengthValid } from "@/utils/validation";
import { formEmailValid, formPasswordValid } from "@/utils/validation";
import CommonSnackBar from "~/components/common/CommonSnackBar.vue";
import type { LoginPostData } from "@/domain/auth/login";
export default defineComponent({
  name: "AuthLoginForm",
  components: {
    CommonSnackBar,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult() {
      const emailResult = formEmailValid(authStore.$state.form.email);
      const passwordResult = formPasswordValid(authStore.$state.form.password);
      if (emailResult?.result && passwordResult?.result) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * authStateからログイン
     * @param state
     * @returns
     */
    async function login(): Promise<void> {
      const postData: LoginPostData = {
        email: authStore.$state.form.email,
        password: authStore.$state.form.password,
      };
      await authStore.login(postData);
    }

    /**
     * 処理が正常に終了したらダイアログを閉じてTOPページへ遷移
     */
    function topPageMove(): void {
      authStore.$state.dialog = false;
      router.push("/");
    }

    return {
      authStore,
      validationResult,
      login,
      topPageMove,
    };
  },
});
</script>
