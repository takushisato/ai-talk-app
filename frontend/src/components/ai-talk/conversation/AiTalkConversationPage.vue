<template>
    <!-- <v-dialog v-model="loading"><LoadingAnimationParts /></v-dialog> -->
    <h3>AIに質問してみよう</h3>
    <div v-for="(talk, key) in aiTalkStore.$state.talks" style="margin-top: 30px; margin-bottom: 20px">
        <v-icon class="mr-0 mb-2" style="float: right" @click="aiTalkStore.deleteQuestionAndAnswer(talk.id, key)">{{
            'mdi-comment-remove-outline'
        }}</v-icon>
        <p class="text-light-blue text-left">Question</p>
        <v-card class="ma-2 text-left">{{ talk.question }}</v-card>
        <p class="text-red text-left">Answer</p>
        <v-card class="ma-2 text-left">{{ talk.answer }}</v-card>
    </div>

    <div class="container"></div>

    <v-btn v-if="aiTalkStore.$state.previousPage != null" @click="aiTalkStore.previousPagination()">前へ</v-btn>
    <v-btn v-else style="opacity: 0.2; cursor: default">前へ</v-btn>
    <v-btn v-if="aiTalkStore.$state.nextPage != null" @click="aiTalkStore.nextPagination()">次へ</v-btn>
    <v-btn v-else style="opacity: 0.2; cursor: default">次へ</v-btn>
    <br />
    <br />
    <v-form @submit.prevent>
        <label>AIにおすすめのレシピを聞いてみよう</label>
        <v-text-field
            label="食材や調理方法など"
            variant="solo"
            type="name"
            v-model="aiTalkStore.$state.postQuestion"
        ></v-text-field>
        <v-btn @click="aiTalkStore.postQuestionToAI">AIに質問する</v-btn>
    </v-form>

    <SnackBar
        v-if="!!aiTalkStore.$state.errorResult"
        :errorMessages="aiTalkStore.$state.errorMessage"
        @closeSnack="aiTalkStore.closeSnack()"
    />

    <v-dialog v-model="aiTalkStore.$state.talkDeleteDialog" max-width="400">
        <v-card>
            <v-card-text>
                <p>削除しました</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="aiTalkStore.$state.talkDeleteDialog = false">閉じる</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
export default {
    name: 'TalkForm',
};
</script>
<script setup lang="ts">
import { useAiTalkStore } from '~/composables/ai-talk/use-ai-talk-store';
const aiTalkStore = useAiTalkStore();

const props = defineProps<{
    id: string | undefined;
}>();
const id = props.id;

onMounted(() => {
    if (id) {
        aiTalkStore.fetchThreadTalks(id);
    }
});
</script>
<style scoped>
.container {
    min-height: 30vh;
}
</style>
