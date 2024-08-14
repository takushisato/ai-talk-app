<template>
    <div class="text-center w-100 mt-8">
        <SettingsTopMenu />
    </div>
</template>
<script lang="ts">
import SettingsTopMenu from '~/components/settings/top-menu/parts/SettingsTopMenu.vue';
export default defineComponent({
    components: { SettingsTopMenu },
    name: 'SettingsTopMenu',
});
</script>
