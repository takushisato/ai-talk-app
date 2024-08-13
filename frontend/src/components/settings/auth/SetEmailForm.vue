<template>
    <div>
        <h3>メールアドレスの変更はこちら</h3>
        <!-- <v-text-field
            label="現在のパスワード"
            variant="solo"
            type="password"
            v-model="authStore.$state.setPasswordForm.current_password"
            :rules="[requiredValid, passwordLengthValid]"
        ></v-text-field> -->

        <!-- <v-btn v-if="validationResult()" type="submit" @click="passwordSetConfirm()">このパスワードにする</v-btn> -->
        <!-- <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" /> -->

        <!-- <v-dialog v-model="authStore.$state.setPasswordSuccessDialog" max-width="400">
            <v-card>
                <v-card-text>
                    <p>パスワードの変更が完了しました</p>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="topPageMove()">閉じる</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>
<script lang="ts">
import { formPasswordValid, formRePasswordValid, formRePasswordComparison } from '@/utils/validation';
import { useAuthStore } from '~/composables/common/use-auth-store';
export default defineComponent({
    name: 'SetEmailForm',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        return {
            authStore,
        };
    },
});
</script>
