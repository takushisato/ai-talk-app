<template>
  <div class="form">
    <h3>パスワードを忘れた方はメールアドレスを入力してボタンをクリックしてください</h3>
    <v-text-field
      label="【必須】メールアドレス"
      variant="solo"
      type="email"
      v-model="authStore.$state.form.email"
      :rules="[requiredValid, mailValid]"
    ></v-text-field>
    <v-btn v-if="validationResult()" type="submit" @click="handleResetPassword">パスワードのリセットを希望する</v-btn>
    <CommonSnackBar v-model="authStore.$state.error.isError" :errorMessage="authStore.$state.error.errorMessage" />
    <v-dialog v-model="authStore.$state.resetPassWordDialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>ご登録のメールアドレスに再設定用のリンクを送信しました</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleTopPageMove()">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { requiredValid, mailValid } from "@/utils/validation";
import { formEmailValid } from "@/utils/validation";
import { useAuthStore } from "~/composables/common/use-auth-store";
import CommonSnackBar from "~/components/common/CommonSnackBar.vue";
export default defineComponent({
  components: {
    CommonSnackBar,
  },
  name: "AuthResetPassword",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult() {
      const emailResult = formEmailValid(authStore.$state.form.email);
      if (emailResult) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * パスワード変更の申請
     */
    const handleResetPassword = async () => {
      await authStore.resetPassword(authStore.$state.form.email);
    };

    /**
     * 処理が正常に終了したらダイアログを閉じてTOPページへ遷移
     */
    function handleTopPageMove(): void {
      authStore.$state.resetPassWordDialog = false;
      router.push("/");
    }

    return {
      email: authStore.$state.form.email,
      authStore,
      handleResetPassword,
      validationResult,
      handleTopPageMove,
    };
  },
});
</script>
