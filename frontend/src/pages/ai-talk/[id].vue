<template>
    <ServiceTalkForm :id="id" />
</template>
<script lang="ts">
export default {
    name: 'talks',
};
</script>
<script setup lang="ts">
/**
 * URLからidを取得してコンポーネントに渡し
 */
const route = useRoute();
const { id } = route.params;
</script>
<style scoped></style>
