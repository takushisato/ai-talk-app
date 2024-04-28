import { defineStore } from "pinia";
import { apiBaseUrl } from "~/utils/api-base-url";
import type { User } from "~/domain/auth/user";
import type { login, loginResponse } from "~/domain/auth/login";
import { ro } from "vuetify/locale";

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
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
    async fetchUser(postData: login) {
      const hostURL = apiBaseUrl();
      const { data, error } = await useFetch<loginResponse>(hostURL + "/api_token_auth/", {
        method: "POST",
        body: postData,
      });
      if (data.value) {
        // dataの戻り値を検証した後tokenを摘出。Cookieにセット
        if (!data.value) return { result: false, error: error };
        const token = data.value?.auth_token;
        useCookie("token", {
          secure: true,
          maxAge: 86400,
        }).value = token;
        // isAuthenticatedをtrueにしてログイン状態にする
        this.isAuthenticated = true;
        return { result: true, error: null };
      } else {
        // エラーはそのままreturnして呼び出し元で処理
        return { result: false, error: error };
      }
    },
  },
});
