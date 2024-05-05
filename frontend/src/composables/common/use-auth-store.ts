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
  getters: {
    // authedUser: (state) => state.user as User,
  },
  actions: {
    authenticate() {
      const token = useCookie("token").value;
      this.isAuthenticated = !!token;
    },
    logout() {
      useCookie("token").value = null;
      this.isAuthenticated = false;
      const router = useRouter();
      router.push("/");
    },
    async login(postData: login) {
      try {
        const hostURL = apiBaseUrl();
        const response: AxiosResponse = await axios.post(hostURL + "/api_token_auth/", postData);
        if (response.status === 200) {
          const token: string = response.data.auth_token;
          useCookie("token", {
            secure: true,
            maxAge: 86400,
          }).value = token;
          this.isAuthenticated = true;
          this.dialog = true;
          this.form.email = "";
          return true;
        } else {
          // エラー時はcatchに飛ぶため、ここは通らないが念の為falseを返す様に設定
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
  },
});
