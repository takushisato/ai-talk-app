<template>
  <!-- ログイン画面の「パスワードを忘れた方はこちら」からパスワードを変更するコンポーネント -->
  <div>
    <h3>パスワードの再設定はこちら</h3>
    <v-text-field label="【必須】新しいパスワード" variant="solo" type="password"
      v-model="authStore.$state.confirmPasswordForm.new_password"
      :rules="[requiredValid, passwordLengthValid]"></v-text-field>
    <v-text-field label="【必須】新しいパスワード（確認用）" variant="solo" type="password"
      v-model="authStore.$state.confirmPasswordForm.re_new_password"
      :rules="[requiredValid, passwordComparisonValid]"></v-text-field>
    <v-btn v-if="validationResult()" type="submit" @click="passwordConfirm()">このパスワードにする</v-btn>
    <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" />

    <v-dialog v-model="authStore.$state.confirmPasswordFormDialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>パスワードの再設定が完了しました。パスワードの紛失にお気を付けください</p>
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
import { defineComponent, ref } from "vue";
import { requiredValid, passwordLengthValid } from "@/utils/validation";
import { formPasswordValid, formRePasswordValid, formRePasswordComparison } from "@/utils/validation";
import { useAuthStore } from "~/composables/common/use-auth-store";
export default defineComponent({
  name: "ConfirmPasswordResetForm",
  props: {
    uid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const router = useRouter();
    let dialog: globalThis.Ref<boolean> = ref(false);
    let errorMessages: any = [];
    let errorResult: globalThis.Ref<boolean> = ref(false);

    /**
     * ２つのパスワードの比較
     * （Vuetifyのコンポーネントで使用）
     * 別ファイルに定義して引数でpasswordとrePasswordを渡すと何故か上手く読み込めないため、ここで定義
     */
    const passwordComparisonValid = () => {
      if (authStore.$state.confirmPasswordForm.new_password != authStore.$state.confirmPasswordForm.re_new_password) {
        return "２つのパスワードが一致しません。";
      } else {
        return false;
      }
    };

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult(): boolean {
      const passwordResult = formPasswordValid(authStore.$state.confirmPasswordForm.new_password);
      const rePasswordResult = formRePasswordValid(authStore.$state.confirmPasswordForm.re_new_password);
      const PasswordComparisonResult = formRePasswordComparison(authStore.$state.confirmPasswordForm.new_password, authStore.$state.confirmPasswordForm.re_new_password);
      console.log(passwordResult, rePasswordResult, PasswordComparisonResult);
      if (passwordResult && rePasswordResult && PasswordComparisonResult) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * パスワード変更
     * （ログイン不要）
     * backendから送られてきたリンクからパスワード変更
     */
    async function passwordConfirm(): Promise<void> {
      authStore.resetPasswordConfirm(props.uid, props.token);
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
      authStore,
      dialog,
      errorResult,
      errorMessages,
      validationResult,
      passwordConfirm,
      topPageMove,
      closeSnack,
      passwordComparisonValid,
    };
  },
});
</script>
<style scoped></style>
