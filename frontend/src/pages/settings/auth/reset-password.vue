<template>
    <AuthResetPassword />
</template>
<script lang="ts">
import AuthResetPassword from '@/components/auth/reset-password/AuthResetPassword.vue';
export default defineComponent({
    components: { AuthResetPassword },
    name: 'settings-auth',
});
</script>
