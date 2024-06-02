import { defineStore } from "pinia";
import { apiBaseUrl } from "~/utils/api-base-url";
import { handleErrorResponse } from "~/domain/api/api-error-handler";
import type { User } from "~/domain/auth/user";
import type { LoginPostData, LoginResponse } from "~/domain/auth/login";
import type { AxiosResponse, AxiosError } from "axios";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    token: "",
    user: null as User | null,
    form: {
      email: "",
      password: "",
    },
    dialog: false,
  }),
  getters: {},
  actions: {
    /**
     * ログイン処理
     */
    async login(postData: LoginPostData) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(
          hostURL + "api_token_auth/",
          postData
        );
        this.token = response.data.auth_token;
        useCookie("token", {
          secure: true,
          maxAge: 86400,
        }).value = this.token;
        this.isAuthenticated = true;
        this.dialog = true;
        this.updateUserAuthenticationStatus();
      } catch (error) {
        this.isAuthenticated = false;
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // TODO バックエンドのエラーメッセージを取得して渡したい。現状バックエンドからのエラーメッセージが微妙なためて入力している。
          const errorMessage = "ログインに失敗しました。パスワードとメールアドレスを確認してください。";
          handleErrorResponse(axiosError.response.status, errorMessage);
        }
      } finally {
        this.form.password = "";
      }
    },

    /**
     * ログアウト処理
     */
    logout(): void {
      useCookie("token").value = null;
      this.isAuthenticated = false;
      this.token = "";
      this.user = null;
      this.form.email = "";
      this.form.password = "";
    },

    /**
     * ユーザー情報取得処理
     *
     * (取得できればログイン、tokenに問題がありユーザー情報が取得できない場合はログアウトになる）
     */
    async updateUserAuthenticationStatus(): Promise<void> {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse<User> = await axios.get<User>(hostURL + "api/auth/users/me/", {
          headers: {
            Authorization: "Token " + this.token,
          },
        });
        this.user = response.data;
      } catch (error) {
        // TODO バックエンドのエラーメッセージを取得して渡したい。現状バックエンドからのエラーメッセージが微妙なためて入力している。
        const errorMessage = "認証情報の期限が切れました。再度ログインしてください。";
        await this.logout();
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          handleErrorResponse(axiosError.response.status, errorMessage);
        }
      }
    },

    /**
     * Cookieからトークンを取得してユーザー情報を取得
     */
    async authenticateFromCookie(): Promise<void> {
      const token: string | null | undefined = await useCookie("token").value;
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        await this.updateUserAuthenticationStatus();
      }
    },

    /**
     * パスワードリセット処理
     * TODO 動作確認未実施
     */
    async resetPassword(email: string) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse<string> = await axios.post<string>(hostURL + "api/auth/users/reset_password/", {
          email: email,
        });
        this.dialog = true;
      } catch (error) {
        // TODO バックエンドのエラーメッセージを取得して渡したい。現状バックエンドからのエラーメッセージが微妙なためて入力している。
        const errorMessage = "パスワードリセットに失敗しました。メールアドレスを確認してください。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          handleErrorResponse(axiosError.response.status, errorMessage);
        }
      }
    },

    /**
     * パスワード変更処理
     * TODO 動作確認未実施
     */
    async setPassword(new_password: string, re_new_password: string, current_password: string) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.post(
          hostURL + "api/auth/users/set_password/",
          {
            new_password: new_password,
            re_new_password: re_new_password,
            current_password: current_password,
          },
          {
            headers: {
              Authorization: "Token " + this.token,
            },
          }
        );
        this.dialog = true;
      } catch (error) {
        // TODO バックエンドのエラーメッセージを取得して渡したい。現状バックエンドからのエラーメッセージが微妙なためて入力している。
        const errorMessage = "パスワード変更に失敗しました。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          handleErrorResponse(axiosError.response.status, errorMessage);
        }
      }
    },

    /**
     * メールアドレス変更処理
     * TODO 動作確認未実施
     */
    async setEmail(current_password: string, new_email: string, re_new_email: string) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.post(
          hostURL + "api/auth/users/set_email/",
          {
            new_email: new_email,
            re_new_email: re_new_email,
            current_password: current_password,
          },
          {
            headers: {
              Authorization: "Token " + this.token,
            },
          }
        );
        this.dialog = true;
      } catch (error) {
        // TODO バックエンドのエラーメッセージを取得して渡したい。現状バックエンドからのエラーメッセージが微妙なためて入力している。
        const errorMessage = "メールアドレス変更に失敗しました。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          handleErrorResponse(axiosError.response.status, errorMessage);
        }
      }
    },
  },
});
