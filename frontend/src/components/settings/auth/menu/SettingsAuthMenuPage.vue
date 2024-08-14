<template>
    <div class="text-center w-100 mt-8">
        <AuthMenu />
    </div>
</template>
<script lang="ts">
import AuthMenu from '~/components/settings/auth/menu/parts/AuthMenu.vue';
export default defineComponent({
    components: { AuthMenu },
    name: 'SettingsTopMenuPage',
});
</script>
