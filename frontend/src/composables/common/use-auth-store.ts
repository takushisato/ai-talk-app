import { defineStore } from 'pinia';
import { apiBaseUrl } from '~/utils/api-base-url';
import { processErrorResponse } from '~/domain/api/process-error-response';
import type { ErrorResponse } from '~/domain/api/error-response';
import type { User } from '~/domain/auth/user';
import type { LoginPostData, LoginResponse } from '~/domain/auth/login';
import type { CreateUserPostData } from '~/domain/auth/create-user';
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthenticated: false,
        token: '',
        user: null as User | null,
        loginForm: {
            email: '',
            password: '',
        },
        setPasswordForm: {
            new_password: '',
            re_new_password: '',
            current_password: '',
        },
        resetForm: {
            email: '',
        },
        createForm: {
            name: '',
            email: '',
            password: '',
            re_password: '',
        },
        confirmPasswordForm: {
            new_password: '',
            re_new_password: '',
            current_password: '',
        },
        setEmail: {
            new_email: '',
            re_new_email: '',
            current_password: '',
        },
        CreateUserSuccessDialog: false,
        confirmPasswordFormDialog: false,
        confirmSetPasswordDialog: false,
        loginSuccessDialog: false,
        resetPasswordSuccessDialog: false,
        setPasswordSuccessDialog: false,
        setEmailSuccessDialog: false,
    }),
    getters: {},
    actions: {
        /**
         * 会員登録
         */
        async createUser() {
            try {
                // TODO ローディング処理を追加する
                const hostURL = apiBaseUrl();
                const postData: CreateUserPostData = {
                    name: this.$state.createForm.name,
                    email: this.$state.createForm.email,
                    password: this.$state.createForm.password,
                    re_password: this.$state.createForm.re_password,
                };
                const response: AxiosResponse = await axios.post(hostURL + 'api/auth/users/', postData);
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            } finally {
                this.createForm.password = '';
                this.createForm.re_password = '';
            }
        },

        /**
         * ログイン処理
         */
        async login() {
            try {
                const hostURL = apiBaseUrl();
                const postData: LoginPostData = {
                    email: this.$state.loginForm.email,
                    password: this.$state.loginForm.password,
                };
                const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(
                    hostURL + 'api_token_auth/',
                    postData
                );
                this.token = response.data.auth_token;
                useCookie('token', {
                    secure: true,
                    maxAge: 86400,
                }).value = this.token;
                this.isAuthenticated = true;
                this.loginSuccessDialog = true;
                this.updateUserAuthenticationStatus();
            } catch (error) {
                this.isAuthenticated = false;
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            } finally {
                this.loginForm.password = '';
            }
        },

        /**
         * ログアウト処理
         */
        logout(): void {
            useCookie('token').value = null;
            this.isAuthenticated = false;
            this.token = '';
            this.user = null;
        },

        /**
         * ユーザー情報取得処理
         *
         * (取得できればログイン、tokenに問題がありユーザー情報が取得できない場合はログアウトになる）
         */
        async updateUserAuthenticationStatus(): Promise<void> {
            try {
                const hostURL = apiBaseUrl();
                const response: AxiosResponse<User> = await axios.get<User>(hostURL + 'api/auth/users/me/', {
                    headers: {
                        Authorization: 'Token ' + this.token,
                    },
                });
                this.user = response.data;
            } catch (error) {
                await this.logout();
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            }
        },

        /**
         * Cookieからトークンを取得してユーザー情報を取得
         */
        async authenticateFromCookie(): Promise<void> {
            const token: string | null | undefined = await useCookie('token').value;
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
                await this.updateUserAuthenticationStatus();
            }
        },

        /**
         * パスワードリセット処理
         */
        async resetPassword() {
            try {
                const hostURL = apiBaseUrl();
                const response: AxiosResponse<string> = await axios.post<string>(
                    hostURL + 'api/auth/users/reset_password/',
                    {
                        email: this.$state.resetForm.email,
                    }
                );
                this.resetPasswordSuccessDialog = true;
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            }
        },

        /**
         * パスワード変更確認処理
         */
        async resetPasswordConfirm(uid: string, token: string) {
            try {
                const hostURL = apiBaseUrl();
                const response: AxiosResponse<string> = await axios.post<string>(
                    hostURL + 'api/auth/users/reset_password_confirm/',
                    {
                        uid: uid,
                        token: token,
                        new_password: this.$state.confirmPasswordForm.new_password,
                    }
                );
                this.$state.confirmPasswordFormDialog = true;
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            } finally {
                this.$state.confirmPasswordForm.new_password = '';
                this.$state.confirmPasswordForm.re_new_password = '';
                this.$state.confirmPasswordForm.current_password = '';
            }
        },

        /**
         * パスワード変更処理
         */
        async setPassword() {
            try {
                const hostURL = apiBaseUrl();
                const response: AxiosResponse = await axios.post(
                    hostURL + 'api/auth/users/set_password/',
                    {
                        new_password: this.$state.setPasswordForm.new_password,
                        re_new_password: this.$state.setPasswordForm.re_new_password,
                        current_password: this.$state.setPasswordForm.current_password,
                    },
                    {
                        headers: {
                            Authorization: 'Token ' + this.token,
                        },
                    }
                );
                this.setPasswordSuccessDialog = true;
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            } finally {
                this.$state.setPasswordForm.new_password = '';
                this.$state.setPasswordForm.re_new_password = '';
                this.$state.setPasswordForm.current_password = '';
            }
        },

        /**
         * メールアドレス変更処理
         */
        async setEmail() {
            try {
                const hostURL = apiBaseUrl();
                const response: AxiosResponse = await axios.post(
                    hostURL + 'api/auth/users/set_email/',
                    {
                        new_email: this.$state.setEmail.new_email,
                        re_new_email: this.$state.setEmail.re_new_email,
                        current_password: this.$state.setEmail.current_password,
                    },
                    {
                        headers: {
                            Authorization: 'Token ' + this.token,
                        },
                    }
                );
                this.setEmailSuccessDialog = true;
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const errorData = axiosError.response.data as ErrorResponse;
                    const errorMessage = errorData[Object.keys(errorData)[0]][0];
                    processErrorResponse(axiosError.response.status, errorMessage);
                }
            } finally {
                this.$state.setEmail.current_password = '';
            }
        },
    },
});
