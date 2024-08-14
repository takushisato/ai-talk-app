<template>
    <div class="mt-5 md:col-span-2 md:mt-0">
        <SetPasswordForm />
    </div>
</template>
<script lang="ts">
import SetPasswordForm from '~/components/settings/auth/set-password/parts/SetPasswordForm.vue';
export default defineComponent({
    name: 'SettingsAuthSetPasswordPage',
    components: { SetPasswordForm },
});
</script>
