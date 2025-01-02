<template>
    <!-- <v-dialog v-model="loading"><LoadingAnimationParts /></v-dialog> -->
    <h3>AIに質問してみよう</h3>
    <div v-for="(talk, key) in aiTalkStore.$state.talks" style="margin-top: 30px; margin-bottom: 20px">
        <!-- <v-icon class="mr-0 mb-2" style="float: right" @click="deleteQuestionAndAnswer(talk.id, key)">{{ -->
        <v-icon class="mr-0 mb-2" style="float: right" @click="">{{ 'mdi-comment-remove-outline' }}</v-icon>
        <p class="text-light-blue text-left">Question</p>
        <v-card class="ma-2 text-left">{{ talk.question }}</v-card>
        <p class="text-red text-left">Answer</p>
        <v-card class="ma-2 text-left">{{ talk.answer }}</v-card>
    </div>

    <div class="container"></div>

    <v-btn v-if="aiTalkStore.$state.previousPage != null" @click="">前へ</v-btn>
    <!-- <v-btn v-if="previousPage != null" @click="previousPagination()">前へ</v-btn> -->
    <v-btn v-if="aiTalkStore.$state.previousPage == null" style="opacity: 0.2; cursor: default">前へ</v-btn>
    <v-btn v-if="aiTalkStore.$state.nextPage != null" @click="">次へ</v-btn>
    <!-- <v-btn v-if="aiTalkStore.$state.nextPage != null" @click="nextPagination()">次へ</v-btn> -->
    <v-btn v-if="aiTalkStore.$state.nextPage == null" style="opacity: 0.2; cursor: default">次へ</v-btn>
    <br />
    <br />
    <v-form @submit.prevent>
        <label>AIにおすすめのレシピを聞いてみよう</label>
        <v-text-field label="食材や調理方法など" variant="solo" type="name" v-model="postQuestion"></v-text-field>
        <v-btn @click="">AIに質問する</v-btn>
        <!-- <v-btn @click="postTalk()">AIに質問する</v-btn> -->
    </v-form>

    <!-- <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" /> -->

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
import { useAuthStore } from '~/composables/common/use-auth-store';
import { useAiTalkStore } from '~/composables/ai-talk/use-ai-talk-store';
// let dialog: globalThis.Ref<boolean> = ref(false);
// let loading: globalThis.Ref<boolean> = ref(false);
// let nextPage: globalThis.Ref<string> = ref('');
// let previousPage: globalThis.Ref<string> = ref('');
// let errorMessages: any = [];
let errorResult: globalThis.Ref<boolean> = ref(false);
let talks: any = ref([]);
let postQuestion: globalThis.Ref<string> = ref('');

const aiTalkStore = useAiTalkStore();
const authStore = useAuthStore();
const hostURL = apiBaseUrl();

const props = defineProps<{
    id: string | undefined;
}>();
const id = props.id;

onMounted(() => {
    if (id) {
        aiTalkStore.fetchThreadTalks(id);
    }
});

/**
 * スレッド内のAIとの過去のやり取りを取得します
 */
// async function getTalks() {
//     const { data, error } = await useFetch(hostURL + 'ai_talk/get_talks/' + id, {
//         method: 'GET',
//         headers: { Authorization: 'Token ' + authStore.$state.token },
//     });
//     if (error.value == null) {
//         const dataValue: any = data.value;
//         talks = dataValue.results;
//         nextPage = dataValue.next;
//         previousPage = dataValue.previousPage;
//     } else {
//         displayError();
//     }
// }
// await getTalks();

/**
 * ページネーションで次のオブジェクトを取得します
 */
// async function nextPagination() {
//     const { data, error } = await useFetch(nextPage, {
//         method: 'GET',
//         headers: { Authorization: 'Token ' + authStore.$state.token },
//     });
//     if (error.value == null) {
//         talks.length = 0;
//         const dataValue: any = data.value;
//         for (let i = 0; i < dataValue.results.length; i++) {
//             talks.push(dataValue.results[i]);
//         }
//         nextPage = dataValue.next;
//         previousPage = dataValue.previous;
//     } else {
//         displayError();
//     }
// }

/**
 * ページネーションで前のオブジェクトを取得します
 */
// async function previousPagination() {
//     const { data, error } = await useFetch(previousPage, {
//         method: 'GET',
//         headers: { Authorization: 'Token ' + authStore.$state.token },
//     });
//     if (error.value == null) {
//         talks.length = 0;
//         const dataValue: any = data.value;
//         for (let i = 0; i < dataValue.results.length; i++) {
//             talks.push(dataValue.results[i]);
//         }
//         nextPage = dataValue.next;
//         previousPage = dataValue.previous;
//     } else {
//         displayError();
//     }
// }

/**
 * 質問を投稿します
 */
// async function postTalk() {
//     // 質問が入力されているか判定。されていない場合はreturnで終了
//     if (postQuestion.value != '') {
//         loading.value = true;
//         const postData = {
//             thread: id,
//             question: postQuestion.value,
//         };
//         const { data, error } = await useFetch(hostURL + 'ai_talk/question-and-answer/', {
//             method: 'POST',
//             headers: { Authorization: 'Token ' + authStore.$state.token },
//             body: postData,
//         });
//         if (error.value == null) {
//             location.reload();
//         } else {
//             displayError();
//         }
//         loading.value = false;
//     } else {
//         return;
//     }
// }

/**
 * backendからAIとの会話を削除します
 */
// async function deleteTalks(id: any) {
//     const { data, error } = await useFetch(hostURL + 'ai_talk/question-and-answer/' + id, {
//         method: 'DELETE',
//         headers: { Authorization: 'Token ' + authStore.$state.token },
//     });
//     if (error.value == null) {
//         aiTalkStore.$state.talkDeleteDialog = true;
//     } else {
//         displayError();
//     }
// }

/**
 * 配列talksから要素をリアクティブに削除します
 */
// function deleteTalkObject(key: any) {
//     talks.splice(key, 1);
// }

/**
 * 画面内の要素と、backendの要素２つを同時に削除します
 */
// function deleteQuestionAndAnswer(id: any, key: any) {
//     deleteTalks(id);
//     deleteTalkObject(key);
// }

/**
 * API関係のエラーが発生した際SnackBarを使ってエラーを表示します。
 */
// function displayError() {
//     errorResult.value = true;
//     errorMessages[0] = ['エラーが発生しました。暫くお時間を置いてお試しください。'];
// }

/**
 * エラー文表示を閉じる。emitsでイベントを受け取り実行
 */
// function closeSnack(): void {
//     errorMessages = [];
//     errorResult.value = false;
// }
</script>
<style scoped>
.container {
    min-height: 30vh;
}
</style>
