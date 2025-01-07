import { defineStore } from 'pinia';
import { apiBaseUrl } from '~/utils/api-base-url';
import { processErrorResponse } from '~/domain/api/process-error-response';
import type { ErrorResponse } from '~/domain/api/error-response';
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { useAuthStore } from '~/composables/common/use-auth-store';
import { apiClient } from '~/domain/api/apiClient';

type TalkCollection = {
    next: string;
    previous: string;
    results: TalkDetail[];
};

type TalkDetail = {
    id: number;
    user: number;
    thread: number;
    question: string;
    answer: string;
};

export const useAiTalkStore = defineStore({
    id: 'ai-talk',
    state: () => ({
        talk: {} as TalkDetail,
        talks: [] as TalkDetail[],
        nextPage: '' as string,
        previousPage: '' as string,
        talkDeleteDialog: false,
        errorMessage: '' as string,
        postQuestion: '' as string,
        errorResult: false,
    }),
    getters: {},
    actions: {
        /**
         * スレッド内のAIとの過去のやり取りを取得します
         */
        async fetchThreadTalks(id: string): Promise<void> {
            const data = await apiClient<TalkCollection>({
                url: `ai_talk/get_talks/${id}`,
                method: 'GET',
            });
            this.talks = data.results;
            this.nextPage = data.next;
            this.previousPage = data.previous;
        },

        /**
         * ページネーションで次のオブジェクトを取得します
         *
         * TODO 動作確認
         */
        async nextPagination(): Promise<void> {
            const data = await apiClient<TalkCollection>({
                url: this.$state.nextPage,
                method: 'GET',
            });
            this.$state.talks = data.results;
        },

        /**
         * ページネーションで前のオブジェクトを取得します
         *
         * TODO 動作確認
         */
        async previousPagination(): Promise<void> {
            const data = await apiClient<TalkCollection>({
                url: this.$state.previousPage,
                method: 'GET',
            });
            this.$state.talks = data.results;
        },

        /**
         * 質問を投稿します
         */
        async postQuestionToAI(id: string): Promise<void> {
            if (!this.postQuestion) return;
            await apiClient({
                url: 'ai_talk/question-and-answer/',
                method: 'POST',
                data: {
                    thread: id,
                    question: this.postQuestion,
                },
            });
        },

        /**
         * AIとの会話を削除します
         */
        async deleteTalk(id: number): Promise<void> {
            await apiClient({
                url: `ai_talk/question-and-answer/${id}`,
                method: 'DELETE',
            });
        },

        /**
         * 画面上のtalksから要素をリアクティブに削除します
         *
         * TODO 動作確認
         */
        deleteTalkObject(key: number): void {
            this.$state.talks.splice(key, 1);
        },

        /**
         * 画面内の要素と、backendの要素２つを同時に削除します
         *
         * TODO 動作確認
         */
        deleteQuestionAndAnswer(id: number, key: number): void {
            this.deleteTalk(id);
            this.deleteTalkObject(key);
        },

        /**
         * スナックバーを閉じる
         */
        closeSnack(): void {
            this.$state.errorMessage = '';
            this.$state.errorResult = false;
        },
    },
});
