<template>
  <div>
    <h3>パスワードの再設定はこちら</h3>
    <!-- TODO 2つのパスワードが一致しないと送信できない様にバリデーションをつける事 -->
    <v-text-field
      label="【必須】新しいパスワード"
      variant="solo"
      type="password"
      v-model="new_password"
      :rules="[requiredValid, passwordLengthValid]"
    ></v-text-field>
    <v-text-field
      label="【必須】新しいパスワード（確認用）"
      variant="solo"
      type="password"
      v-model="re_new_password"
      :rules="[requiredValid, passwordComparisonValid]"
    ></v-text-field>
    <v-btn v-if="validationResult()" type="submit" @click="passwordConfirm()">このパスワードにする</v-btn>
    <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" />

    <v-dialog v-model="dialog" max-width="400">
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
export default defineComponent({
  name: "ConfirmPasswordSetForm",
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
    const router = useRouter();
    const new_password: globalThis.Ref<string> = ref("");
    const re_new_password: globalThis.Ref<string> = ref("");
    let dialog: globalThis.Ref<boolean> = ref(false);
    let errorMessages: any = [];
    let errorResult: globalThis.Ref<boolean> = ref(false);

    /**
     * ２つのパスワードの比較
     * （Vuetifyのコンポーネントで使用）
     * 別ファイルに定義して引数でpasswordとrePasswordを渡すと何故か上手く読み込めないため、ここで定義
     */
    const passwordComparisonValid = () => {
      if (new_password.value != re_new_password.value) {
        return "２つのパスワードが一致しません。";
      } else {
        return false;
      }
    };

    /**
     * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
     * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
     */
    function validationResult() {
      const passwordResult = formPasswordValid(new_password.value);
      const rePasswordResult = formRePasswordValid(re_new_password.value);
      const PasswordComparisonResult = formRePasswordComparison(new_password.value, re_new_password.value);
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
    async function passwordConfirm(this: {
      new_password: import("vue").Ref<string>;
      re_new_password: import("vue").Ref<string>;
      passwordConfirm: () => Promise<void>;
    }) {
      // const postData = {
      //   uid: props.uid,
      //   token: props.token,
      //   new_password: this.new_password,
      //   re_new_password: this.re_new_password,
      // };
      // const { data, error } = await useFetch(hostURL + "/api/v1/auth/users/reset_password_confirm/", {
      //   method: "POST",
      //   body: postData,
      // });
      // if (error.value == null) {
      //   dialog.value = true;
      // } else {
      //   // backendからのエラーが来た場合は、SnackBarで処理
      //   errorResult.value = true;
      //   const errorValue: any = error.value;
      //   errorMessages = errorValue.data;
      // }
      console.log(props.uid, props.token, new_password.value, re_new_password.value);
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
      new_password,
      re_new_password,
      validationResult,
      passwordConfirm,
      dialog,
      topPageMove,
      errorMessages,
      errorResult,
      closeSnack,
      passwordComparisonValid,
    };
  },
});
</script>
<style scoped></style>
