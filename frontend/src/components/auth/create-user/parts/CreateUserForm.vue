<template>
    <div class="form">
        <div>
            <label>【必須】名前：</label>
            <v-text-field
                label="例）山田太郎"
                variant="solo"
                type="email"
                v-model="authStore.$state.createForm.name"
                :rules="[requiredValid]"
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
                :rules="[requiredValid, passwordComparisonValid]"
            ></v-text-field>
        </div>
        <br />
        <v-btn v-if="validationResult()" type="submit" @click="createUser()">会員登録する</v-btn>
        <v-dialog v-model="authStore.$state.CreateUserSuccessDialog" max-width="400">
            <v-card>
                <v-card-text>
                    <p>入力されたメールアドレスに会員登録の案内を送信しました</p>
                    <br />
                    <p>指定のURLをクリックして会員登録を有効にしてください</p>
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
import { useAuthStore } from '@/composables/common/use-auth-store';
export default defineComponent({
    components: {},
    name: 'CreateUserForm',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        /**
         * バリデーションの結果、問題がなければtrue、問題があればfalseを返します
         * Formの送信ボタンの表示と非表示の判定をリアクティブに行っています
         */
        function validationResult() {
            const emailResult = formEmailValid(authStore.$state.createForm.email);
            const passwordResult = formPasswordValid(authStore.$state.createForm.password);
            const PasswordComparisonResult = formRePasswordComparison(
                authStore.$state.createForm.password,
                authStore.$state.createForm.re_password
            );
            if (
                emailResult?.result &&
                passwordResult?.result &&
                PasswordComparisonResult?.result &&
                authStore.$state.createForm.name != ''
            ) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * ２つのパスワードの比較
         * （Vuetifyのコンポーネントで使用）
         * 別ファイルに定義して引数でpasswordとrePasswordを渡すと何故か上手く読み込めないため、ここで定義
         */
        const passwordComparisonValid = () => {
            if (authStore.$state.createForm.password == authStore.$state.createForm.re_password) {
                return true;
            } else {
                return '２つのパスワードが一致しません。';
            }
        };

        /**
         * authStateからユーザー作成
         * @
         */
        async function createUser(): Promise<void> {
            await authStore.createUser();
        }

        /**
         * 処理が正常に終了したらダイアログを閉じてTOPページへ遷移
         */
        function topPageMove(): void {
            authStore.$state.CreateUserSuccessDialog = false;
            router.push('/');
        }

        return {
            authStore,
            validationResult,
            createUser,
            passwordComparisonValid,
            topPageMove,
        };
    },
});
</script>
