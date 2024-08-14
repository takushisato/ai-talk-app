<template>
    <div class="text-center w-100 mt-8">
        <nuxt-link to="/settings/auth">ユーザー情報変更</nuxt-link>
        <br />
        <br />
        <nuxt-link to="/">AI設定変更</nuxt-link>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    components: {},
    name: 'settingsTopMenu',
});
</script>
