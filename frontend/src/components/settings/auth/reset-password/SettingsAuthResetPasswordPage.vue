<template>
    <div class="mt-5 md:col-span-2 md:mt-0">
        <ResetPasswordForm />
    </div>
</template>
<script lang="ts">
import ResetPasswordForm from '~/components/settings/auth/reset-password/parts/ResetPasswordForm.vue';
export default defineComponent({
    name: 'SettingsAuthSetEmailPage',
    components: { ResetPasswordForm },
});
</script>
