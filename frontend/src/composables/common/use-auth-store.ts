import { defineStore } from "pinia";
import { apiBaseUrl } from "~/utils/api-base-url";
import { handleErrorResponse } from "~/domain/api/api-error-handler";
import type { User } from "~/domain/auth/user";
import type { login } from "~/domain/auth/login";
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
    error: {
      errorMessage: "",
      isError: false,
    },
    dialog: false,
  }),
  getters: {},
  actions: {
    /**
     * ログイン処理
     */
    async login(postData: login) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.post(hostURL + "api_token_auth/", postData);
        if (response.status === 200) {
          this.token = response.data.auth_token;
          useCookie("token", {
            secure: true,
            maxAge: 86400,
          }).value = this.token;
          this.isAuthenticated = true;
          this.dialog = true;
          this.updateUserAuthenticationStatus();
          return true;
        } else {
          this.isAuthenticated = false;
          this.error.isError = true;
          this.error.errorMessage = "ログインに失敗しました。パスワードとメールアドレスを確認してください。";
          console.error("Login failed");
          return false;
        }
      } catch (error) {
        this.isAuthenticated = false;
        this.error.isError = true;
        this.error.errorMessage = "ログインに失敗しました。パスワードとメールアドレスを確認してください。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          await handleErrorResponse(axiosError.response);
        } else {
          console.error("An error occurred:", axiosError.message);
        }
        return false;
      } finally {
        this.form.password = "";
      }
    },

    /**
     * ログアウト処理
     */
    logout() {
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
    async updateUserAuthenticationStatus() {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.get(hostURL + "api/auth/users/me/", {
          headers: {
            Authorization: "Token " + this.token,
          },
        });
        if (response.status === 200) {
          this.user = response.data;
          return true;
        } else {
          this.logout();
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          await handleErrorResponse(axiosError.response);
        } else {
          console.error("getUserInfo error:", axiosError.message);
        }
        this.logout();
      }
    },

    /**
     * Cookieからトークンを取得してユーザー情報を取得
     */
    async authenticateFromCookie() {
      const token = await useCookie("token").value;
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        await this.updateUserAuthenticationStatus();
      }
    },
  },
});
