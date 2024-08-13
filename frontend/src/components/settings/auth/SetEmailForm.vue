<template>
    <div>
        <h3>メールアドレスの変更はこちら</h3>
        <v-text-field
            label="【必須】現在のパスワード"
            variant="solo"
            type="password"
            v-model="authStore.$state.setEmail.current_password"
            :rules="[requiredValid, passwordLengthValid]"
        ></v-text-field>
        <v-text-field
            label="【必須】変更希望のメールアドレス"
            variant="solo"
            type="email"
            v-model="authStore.$state.setEmail.new_email"
            :rules="[requiredValid, mailValid]"
        ></v-text-field>
        <v-text-field
            label="【必須】変更希望のメールアドレス（確認用）"
            variant="solo"
            type="email"
            v-model="authStore.$state.setEmail.re_new_email"
            :rules="[requiredValid, mailComparisonValid]"
        ></v-text-field>

        <v-btn v-if="validationResult()" type="submit" @click="setEmailConfirm()">このメールアドレスにする</v-btn>
        <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" />

        <v-dialog v-model="authStore.$state.setEmailSuccessDialog" max-width="400">
            <v-card>
                <v-card-text>
                    <p>メールアドレスの変更が完了しました</p>
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
import { formPasswordValid, formEmailValid, formRePasswordValid, formReEmailComparison } from '@/utils/validation';
import { useAuthStore } from '~/composables/common/use-auth-store';
export default defineComponent({
    name: 'SetEmailForm',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        let errorMessages: any = [];
        let errorResult: globalThis.Ref<boolean> = ref(false);

        /**
         * ２つのメールアドレスの比較
         * @returns {string | boolean} ２つのメールアドレスが一致しない場合はエラーメッセージを返す
         */
        const mailComparisonValid = () => {
            if (authStore.$state.setEmail.new_email != authStore.$state.setEmail.re_new_email) {
                return '２つのメールアドレスが一致しません。';
            } else {
                return false;
            }
        };

        /**
         * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
         * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
         */
        function validationResult(): boolean {
            const passwordResult = formPasswordValid(authStore.$state.setEmail.current_password);
            const newEmailResult = formEmailValid(authStore.$state.setEmail.new_email);
            const reNewEmailResult = formRePasswordValid(authStore.$state.setEmail.re_new_email);
            const reNewEmailComparisonResult = formReEmailComparison(
                authStore.$state.setEmail.new_email,
                authStore.$state.setEmail.re_new_email
            );
            if (passwordResult && newEmailResult && reNewEmailResult && reNewEmailComparisonResult) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * メールアドレスの変更処理
         */
        const setEmailConfirm = () => {
            authStore.setEmail();
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
            validationResult,
            topPageMove,
            closeSnack,
            mailComparisonValid,
            setEmailConfirm,
        };
    },
});
</script>
