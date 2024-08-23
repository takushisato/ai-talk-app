<template>
    <div>
        <h3>パスワードの変更はこちら</h3>
        <v-text-field
            label="【必須】現在のパスワード"
            variant="solo"
            type="password"
            v-model="authStore.$state.setPasswordForm.current_password"
            :rules="[requiredValid, passwordLengthValid]"
        ></v-text-field>
        <v-text-field
            label="【必須】新しいパスワード"
            variant="solo"
            type="password"
            v-model="authStore.$state.setPasswordForm.new_password"
            :rules="[requiredValid, passwordLengthValid]"
        ></v-text-field>
        <v-text-field
            label="【必須】新しいパスワード（確認用）"
            variant="solo"
            type="password"
            v-model="authStore.$state.setPasswordForm.re_new_password"
            :rules="[requiredValid, passwordComparisonValid]"
        ></v-text-field>
        <v-btn v-if="validationResult()" type="submit" @click="passwordSetConfirm()">このパスワードにする</v-btn>
        <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" />

        <v-dialog v-model="authStore.$state.setPasswordSuccessDialog" max-width="400">
            <v-card>
                <v-card-text>
                    <p>パスワードの変更が完了しました</p>
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
import { formPasswordValid, formRePasswordValid, formRePasswordComparison } from '@/utils/validation';
import { useAuthStore } from '~/composables/common/use-auth-store';
export default defineComponent({
    name: 'SetPasswordForm',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        let errorMessages: any = [];
        let errorResult: globalThis.Ref<boolean> = ref(false);

        /**
         * ２つのパスワードの比較
         * （Vuetifyのコンポーネントで使用）
         * 別ファイルに定義して引数でpasswordとrePasswordを渡すと何故か上手く読み込めないため、ここで定義
         */
        const passwordComparisonValid = () => {
            if (authStore.$state.setPasswordForm.new_password != authStore.$state.setPasswordForm.re_new_password) {
                return '２つのパスワードが一致しません。';
            } else {
                return false;
            }
        };

        /**
         * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
         * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
         */
        function validationResult(): boolean {
            const passwordResult = formPasswordValid(authStore.$state.setPasswordForm.new_password);
            const rePasswordResult = formRePasswordValid(authStore.$state.setPasswordForm.re_new_password);
            const PasswordComparisonResult = formRePasswordComparison(
                authStore.$state.setPasswordForm.new_password,
                authStore.$state.setPasswordForm.re_new_password
            );
            if (passwordResult && rePasswordResult && PasswordComparisonResult) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * パスワード更新処理
         */
        const passwordSetConfirm = () => {
            authStore.setPassword();
        };

        /**
         * 処理が正常に終了したらダイアログを閉じてTOPページへ遷移
         */
        function topPageMove(): void {
            router.push('/');
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
            errorMessages,
            errorResult,
            passwordComparisonValid,
            passwordSetConfirm,
            validationResult,
            topPageMove,
            closeSnack,
        };
    },
});
</script>
