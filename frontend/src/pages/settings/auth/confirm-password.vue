<template>
    <div class="mt-5 md:col-span-2 md:mt-0">
        <SettingsAuthConfirmResetPassword :uid="uid" :token="token" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import SettingsAuthConfirmResetPassword from '~/components/settings/auth/confirm-reset-password/SettingAuthConfirmResetPassword.vue';

export default defineComponent({
    name: 'ConfirmPassword',
    components: {
        SettingsAuthConfirmResetPassword,
    },
    setup() {
        let uid = ref('');
        let token = ref('');
        const route = useRoute;
        uid.value = route().query.uid as string;
        token.value = route().query.token as string;

        return {
            uid,
            token,
        };
    },
});
</script>
