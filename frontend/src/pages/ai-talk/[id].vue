<template>
    <AiTalkConversationPage :id="id" />
</template>
<script lang="ts">
import AiTalkConversationPage from '~/components/ai-talk/conversation/AiTalkConversationPage.vue';
export default defineComponent({
    components: {
        AiTalkConversationPage,
    },
    name: 'ai-talk-conversation',
    setup() {
        /**
         * URLからidを取得してコンポーネントに渡し
         */
        const route = useRoute();
        const { id } = route.params;
        return { id };
    },
});
</script>
<style scoped></style>
