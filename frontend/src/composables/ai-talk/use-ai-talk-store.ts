import { defineStore } from 'pinia';
import { apiBaseUrl } from '~/utils/api-base-url';
import { processErrorResponse } from '~/domain/api/process-error-response';
import type { ErrorResponse } from '~/domain/api/error-response';
import type { User } from '~/domain/auth/user';
import type { LoginPostData, LoginResponse } from '~/domain/auth/login';
import type { CreateUserPostData } from '~/domain/auth/create-user';
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

export const useAiTalkStore = defineStore({
    id: 'ai-talk',
    state: () => ({}),
    getters: {},
    actions: {},
});
