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
    }),
    getters: {},
    actions: {
        /**
         * スレッド内のAIとの過去のやり取りを取得します
         */
        async fetchThreadTalks(id: string) {
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
        async nextPagination() {
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
    },
});
