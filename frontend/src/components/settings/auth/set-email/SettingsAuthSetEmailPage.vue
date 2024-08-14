<template>
    <div class="mt-5 md:col-span-2 md:mt-0">
        <SetEmailForm />
    </div>
</template>
<script lang="ts">
import SetEmailForm from '~/components/settings/auth/set-email/parts/SetEmailForm.vue';
export default defineComponent({
    name: 'SettingsAuthSetEmailPage',
    components: { SetEmailForm },
});
</script>
