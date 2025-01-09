import { defineStore } from 'pinia';
import type { User } from '~/domain/auth/user';
import type { LoginPostData, LoginResponse } from '~/domain/auth/login';
import type { CreateUserPostData } from '~/domain/auth/create-user';
import { apiClient } from '~/domain/api/apiClient';

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
        dialog: {
            CreateUserSuccess: false,
            confirmPasswordForm: false,
            // confirmSetPassword: false,
            loginSuccess: false,
            resetPasswordSuccess: false,
            setPasswordSuccess: false,
            setEmailSuccess: false,
        },
    }),
    getters: {},
    actions: {
        /**
         * 会員登録
         */
        async createUser(): Promise<void> {
            try {
                const postData: CreateUserPostData = {
                    name: this.$state.createForm.name,
                    email: this.$state.createForm.email,
                    password: this.$state.createForm.password,
                    re_password: this.$state.createForm.re_password,
                };
                await apiClient<void>({
                    url: 'api/auth/users/',
                    method: 'POST',
                    data: postData,
                });
                this.dialog.CreateUserSuccess = true;
            } finally {
                this.createForm.password = '';
                this.createForm.re_password = '';
            }
        },

        /**
         * ログイン処理
         */
        async login(): Promise<void> {
            try {
                const postData: LoginPostData = {
                    email: this.$state.loginForm.email,
                    password: this.$state.loginForm.password,
                };
                const response = await apiClient<LoginResponse>({
                    url: 'api_token_auth/',
                    method: 'POST',
                    data: postData,
                });
                this.token = response.auth_token;
                useCookie('token', { secure: true, maxAge: 86400 }).value = this.token;
                this.isAuthenticated = true;
                this.dialog.loginSuccess = true;
                await this.updateUserAuthenticationStatus();
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
            const response = await apiClient<User>({
                url: 'api/auth/users/me/',
                method: 'GET',
            });
            this.user = response;
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
        async resetPassword(): Promise<void> {
            await apiClient<void>({
                url: 'api/auth/users/reset_password/',
                method: 'POST',
                data: { email: this.$state.resetForm.email },
            });
            this.dialog.resetPasswordSuccess = true;
        },

        /**
         * パスワード変更確認処理
         *
         * @param uid
         * @param token
         */
        async resetPasswordConfirm(uid: string, token: string): Promise<void> {
            try {
                await apiClient<void>({
                    url: 'api/auth/users/reset_password_confirm/',
                    method: 'POST',
                    data: {
                        uid,
                        token,
                        new_password: this.$state.confirmPasswordForm.new_password,
                    },
                });
                this.$state.dialog.confirmPasswordForm = true;
            } finally {
                this.$state.confirmPasswordForm.new_password = '';
                this.$state.confirmPasswordForm.re_new_password = '';
                this.$state.confirmPasswordForm.current_password = '';
            }
        },

        /**
         * パスワード変更処理
         */
        async setPassword(): Promise<void> {
            try {
                await apiClient<void>({
                    url: 'api/auth/users/set_password/',
                    method: 'POST',
                    data: {
                        new_password: this.$state.setPasswordForm.new_password,
                        re_new_password: this.$state.setPasswordForm.re_new_password,
                        current_password: this.$state.setPasswordForm.current_password,
                    },
                });
                this.dialog.setPasswordSuccess = true;
            } finally {
                this.$state.setPasswordForm.new_password = '';
                this.$state.setPasswordForm.re_new_password = '';
                this.$state.setPasswordForm.current_password = '';
            }
        },

        /**
         * メールアドレス変更処理
         */
        async setEmail(): Promise<void> {
            try {
                await apiClient<void>({
                    url: 'api/auth/users/set_email/',
                    method: 'POST',
                    data: {
                        new_email: this.$state.setEmail.new_email,
                        re_new_email: this.$state.setEmail.re_new_email,
                        current_password: this.$state.setEmail.current_password,
                    },
                });
                this.dialog.setEmailSuccess = true;
            } finally {
                this.$state.setEmail.current_password = '';
            }
        },
    },
});
