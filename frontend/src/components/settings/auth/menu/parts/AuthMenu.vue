<template>
    <div class="text-center w-100 mt-8">
        <nuxt-link to="/settings/auth/set-email">メールアドレス変更</nuxt-link>
        <br />
        <br />
        <nuxt-link to="/settings/auth/set-password/">パスワード変更</nuxt-link>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    components: {},
    name: 'AuthMenu',
});
</script>
