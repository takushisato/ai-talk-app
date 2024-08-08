<template>
    <div>
        <h1>会員登録</h1>
        <CreateUserForm />
    </div>
</template>
<script lang="ts">
import CreateUserForm from './parts/CreateUserForm.vue';
export default defineComponent({
    components: {
        CreateUserForm,
    },
    name: 'RegisterPage',
});
</script>
<script lang="ts" setup></script>
