<template>
    <h3 v-if="authStore.$state.user">{{ authStore.$state.user.name }} さんのスレッド</h3>
    <br />
    <div v-for="(thread, key) in threads" class="text-right">
        <v-icon class="mr-0 mb-2" @click="deleteThreads(thread.id, key)">{{ 'mdi-comment-remove-outline' }}</v-icon>
        <nuxt-link :to="/ai-talk/ + `${thread.id}`" style="text-decoration: none; text-align: left">
            <v-card class="cards">
                {{ thread.title }}
            </v-card>
        </nuxt-link>
    </div>
    <div class="container"></div>
    <v-btn v-if="previousPage != null" @click="previousPagination()">前へ</v-btn>
    <v-btn v-if="previousPage == null" style="opacity: 0.2; cursor: default">前へ</v-btn>
    <v-btn v-if="nextPage != null" @click="nextPagination()">次へ</v-btn>
    <v-btn v-if="nextPage == null" style="opacity: 0.2; cursor: default">次へ</v-btn>
    <br /><br />
    <div>
        <v-text-field label="新しいスレッドを作る" variant="solo" type="text" v-model="makeThread"></v-text-field>
        <v-btn type="submit" @click="postThread()">スレッドを作成</v-btn>
    </div>

    <!-- <SnackBar v-if="!!errorResult" :errorMessages="errorMessages" @closeSnack="closeSnack" /> -->

    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-text>
                <p>削除しました</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">閉じる</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
export default {
    name: 'ThreadForm',
};
</script>
<script setup lang="ts">
import { useAuthStore } from '~/composables/common/use-auth-store';
const authStore = useAuthStore();
const hostURL = apiBaseUrl();
let threads: any = ref([]);
let makeThread: globalThis.Ref<string> = ref('');
let dialog: globalThis.Ref<boolean> = ref(false);
let nextPage: globalThis.Ref<string> = ref('');
let previousPage: globalThis.Ref<string> = ref('');
let errorMessages: any = [];
let errorResult: globalThis.Ref<boolean> = ref(false);

/**
 * 自分の投稿したスレッドの一覧を取得します
 */
async function getThread() {
    const { data, error } = await useFetch(hostURL + 'ai_talk/get_thread/', {
        method: 'GET',
        headers: { Authorization: 'Token ' + authStore.$state.token },
    });
    console.log(error);
    if (error.value == null) {
        const dataValue: any = data.value;
        threads = dataValue.results;
        nextPage = dataValue.next;
        previousPage = dataValue.previousPage;
    } else {
        displayError();
    }
}
await getThread();

/**
 * ページネーションで次のオブジェクトを取得します
 */
async function nextPagination() {
    const { data, error } = await useFetch(nextPage, {
        method: 'GET',
        headers: { Authorization: 'Token ' + authStore.$state.token },
    });
    if (error.value == null) {
        threads.length = 0;
        const dataValue: any = data.value;
        for (let i = 0; i < dataValue.results.length; i++) {
            threads.push(dataValue.results[i]);
        }
        nextPage = dataValue.next;
        previousPage = dataValue.previous;
    } else {
        displayError();
    }
}

/**
 * ページネーションで前のオブジェクトを取得します
 */
async function previousPagination() {
    const { data, error } = await useFetch(previousPage, {
        method: 'GET',
        headers: { Authorization: 'Token ' + authStore.$state.token },
    });
    if (error.value == null) {
        threads.length = 0;
        const dataValue: any = data.value;
        for (let i = 0; i < dataValue.results.length; i++) {
            threads.push(dataValue.results[i]);
        }
        nextPage = dataValue.next;
        previousPage = dataValue.previous;
    } else {
        displayError();
    }
}

/**
 * 新しくスレッドを投稿します
 */
async function postThread() {
    // 最初にスレッド名が入力されているか判定。空の場合はreturnで終了
    if (makeThread.value != '') {
        const postData = {
            title: makeThread.value,
        };
        const { data, error } = await useFetch(hostURL + 'ai_talk/thread/', {
            method: 'POST',
            headers: { Authorization: 'Token ' + authStore.$state.token },
            body: postData,
        });
        if (error.value == null) {
            location.reload();
        } else {
            displayError();
        }
    } else {
        return;
    }
}

/**
 * スレッドを削除します
 */
async function deleteThreadName(id: any) {
    const { data, error } = await useFetch(hostURL + 'ai_talk/thread/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Token ' + authStore.$state.token },
    });
    if (error.value == null) {
        dialog.value = true;
    } else {
        displayError();
    }
}

/**
 * 配列threadsから要素をリアクティブに削除します
 */
function deleteThreadObject(key: any) {
    threads.splice(key, 1);
}

/**
 * 画面内の要素と、backendの要素２つを同時に削除します
 */
function deleteThreads(id: any, key: any) {
    deleteThreadName(id);
    deleteThreadObject(key);
}

/**
 * API関係のエラーが発生した際SnackBarを使ってエラーを表示します。
 */
function displayError() {
    errorResult.value = true;
    errorMessages[0] = ['エラーが発生しました。暫くお時間を置いてお試しください。'];
}

/**
 * エラー文表示を閉じる。emitsでイベントを受け取り実行
 */
function closeSnack(): void {
    errorMessages = [];
    errorResult.value = false;
}
</script>
<style scoped>
.container {
    min-height: 30vh;
}
.cards {
    padding: 15px;
    margin-top: 0;
    margin-bottom: 25px;
}
</style>
