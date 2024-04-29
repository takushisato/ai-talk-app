<template>
  <div class="form">
    <div>
      <label>【必須】メールアドレス：</label>
      <v-text-field
        label="【必須】メールアドレス"
        variant="solo"
        type="email"
        v-model="email"
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
        v-model="password"
        :rules="[requiredValid, passwordLengthValid]"
      ></v-text-field>
    </div>
    <br />
    <v-btn v-if="validationResult()" type="submit" @click="login()">ログインする</v-btn>
    <!-- <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" /> -->

    <v-dialog v-model="dialog" max-width="400">
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
</template>
<script lang="ts">
import { useAuthStore } from "@/composables/common/use-auth-store";
import { requiredValid, mailValid, passwordLengthValid } from "@/utils/validation";
import { formEmailValid, formPasswordValid } from "@/utils/validation";
import type { login } from "@/domain/auth/login";
export default defineComponent({
  name: "AuthLoginForm",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // TODO 状態はstateへ移行
    const email: globalThis.Ref<string> = ref("");
    const password: globalThis.Ref<string> = ref("");
    let dialog: globalThis.Ref<boolean> = ref(false);
    let errorMessages: any = [];
    let errorResult: globalThis.Ref<boolean> = ref(false);

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult() {
      const emailResult = formEmailValid(email);
      const passwordResult = formPasswordValid(password);

      if (emailResult && passwordResult) {
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
      const postData: login = {
        email: email.value,
        password: password.value,
      };
      const isApiResult: boolean = await authStore.login(postData);
      if (isApiResult) {
        dialog.value = true;
      }
    }

    /**
     * 処理が正常に終了したらダイアログを閉じてTOPページへ遷移
     */
    function topPageMove(): void {
      dialog.value = false;
      router.push("/");
    }

    /**
     * エラー文表示を閉じる。emitsでイベントを受け取り実行
     */
    function closeSnack(): void {
      errorMessages = [];
      errorResult.value = false;
    }

    return {
      email,
      password,
      dialog,
      errorMessages,
      errorResult,
      validationResult,
      login,
      topPageMove,
      closeSnack,
    };
  },
});
</script>
