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
        } else {
          this.isAuthenticated = false;
          this.error.isError = true;
          this.error.errorMessage = "ログインに失敗しました。パスワードとメールアドレスを確認してください。";
          console.error("Login failed");
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

    /**
     * パスワードリセット処理
     * TODO 動作確認未実施
     */
    async resetPassword(email: string) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.post(hostURL + "api/auth/users/reset_password/", { email: email });
        if (response.status === 200) {
          this.dialog = true;
        } else {
          this.error.isError = true;
          this.error.errorMessage = "パスワードリセットに失敗しました。メールアドレスを確認してください。";
          console.error("Reset password failed");
        }
      } catch (error) {
        this.error.isError = true;
        this.error.errorMessage = "パスワードリセットに失敗しました。メールアドレスを確認してください。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          await handleErrorResponse(axiosError.response);
        } else {
          console.error("An error occurred:", axiosError.message);
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
        if (response.status === 200) {
          this.dialog = true;
        } else {
          this.error.isError = true;
          this.error.errorMessage = "パスワード変更に失敗しました。";
          console.error("Set password failed");
        }
      } catch (error) {
        this.error.isError = true;
        this.error.errorMessage = "パスワード変更に失敗しました。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          await handleErrorResponse(axiosError.response);
        } else {
          console.error("An error occurred:", axiosError.message);
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
        if (response.status === 200) {
          this.dialog = true;
        } else {
          this.error.isError = true;
          this.error.errorMessage = "メールアドレス変更に失敗しました。";
          console.error("Set email failed");
        }
      } catch (error) {
        this.error.isError = true;
        this.error.errorMessage = "メールアドレス変更に失敗しました。";
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          await handleErrorResponse(axiosError.response);
        } else {
          console.error("An error occurred:", axiosError.message);
        }
      }
    },
  },
});
