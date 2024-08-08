<template>
    <PasswordSetForm />
</template>
<script lang="ts">
import PasswordSetForm from '@/components/settings/auth/PasswordSetForm.vue';
export default defineComponent({
    components: { PasswordSetForm },
    name: 'set-password',
});
</script>
