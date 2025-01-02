import { defineStore } from 'pinia';
import { apiBaseUrl } from '~/utils/api-base-url';
import { processErrorResponse } from '~/domain/api/process-error-response';
import type { ErrorResponse } from '~/domain/api/error-response';
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { useAuthStore } from '~/composables/common/use-auth-store';

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
    }),
    getters: {},
    actions: {
        /**
         * スレッド内のAIとの過去のやり取りを取得します
         */
        async fetchThreadTalks(id: string): Promise<void> {
            try {
                const hostURL = apiBaseUrl();
                const authStore = useAuthStore();
                const response: AxiosResponse<TalkCollection> = await axios.get(`${hostURL}ai_talk/get_talks/${id}`, {
                    headers: {
                        Authorization: 'Token ' + authStore.$state.token,
                    },
                });
                const dataValue: TalkCollection = response.data;
                this.talks = dataValue.results;
                this.nextPage = dataValue.next;
                this.previousPage = dataValue.previous;
                console.log(dataValue);
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    const errorData = axiosError.response.data;
                    this.$state.errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
                    processErrorResponse(axiosError.response.status, this.$state.errorMessage);
                } else {
                    console.error('Unknown error occurred:', error);
                }
            }
        },

        /**
         * ページネーションで次のオブジェクトを取得します
         *
         * TODO 動作確認
         */
        async nextPagination(): Promise<void> {
            try {
                const authStore = useAuthStore();
                const response: AxiosResponse<TalkCollection> = await axios.get(this.$state.nextPage, {
                    headers: {
                        Authorization: 'Token ' + authStore.$state.token,
                    },
                });
                this.$state.talks = response.data.results;
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    const errorData = axiosError.response.data;
                    this.$state.errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
                    processErrorResponse(axiosError.response.status, this.$state.errorMessage);
                } else {
                    console.error('Unknown error occurred:', error);
                }
            }
        },

        /**
         * ページネーションで前のオブジェクトを取得します
         *
         * TODO 動作確認
         */
        async previousPagination(): Promise<void> {
            try {
                const authStore = useAuthStore();
                const response: AxiosResponse<TalkCollection> = await axios.get(this.$state.previousPage, {
                    headers: {
                        Authorization: 'Token ' + authStore.$state.token,
                    },
                });
                this.$state.talks = response.data.results;
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    const errorData = axiosError.response.data;
                    this.$state.errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
                    processErrorResponse(axiosError.response.status, this.$state.errorMessage);
                } else {
                    console.error('Unknown error occurred:', error);
                }
            }
        },

        /**
         * 質問を投稿します
         *
         * TODO　動作確認
         */
        async postQuestionToAI(id: string): Promise<void> {
            if (!this.$state.postQuestion) return; // 質問がnullの場合、returnで終了
            try {
                const authStore = useAuthStore();
                const response: AxiosResponse = await axios.post('ai_talk/question-and-answer/', {
                    headers: {
                        Authorization: 'Token ' + authStore.$state.token,
                        body: {
                            thread: id,
                            question: this.$state.postQuestion,
                        },
                    },
                });
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    const errorData = axiosError.response.data;
                    this.$state.errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
                    processErrorResponse(axiosError.response.status, this.$state.errorMessage);
                } else {
                    console.error('Unknown error occurred:', error);
                }
            }
        },

        /**
         * backendからAIとの会話を削除します
         *
         * TODO 動作確認
         */
        async deleteTalk(id: string): Promise<void> {
            try {
                const authStore = useAuthStore();
                const response: AxiosResponse = await axios.delete('ai_talk/question-and-answer/' + id, {
                    headers: {
                        Authorization: 'Token ' + authStore.$state.token,
                    },
                });
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    const errorData = axiosError.response.data;
                    this.$state.errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
                    processErrorResponse(axiosError.response.status, this.$state.errorMessage);
                } else {
                    console.error('Unknown error occurred:', error);
                }
            }
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
        deleteQuestionAndAnswer(id: string, key: number): void {
            this.deleteTalk(id);
            this.deleteTalkObject(key);
        },
    },
});
