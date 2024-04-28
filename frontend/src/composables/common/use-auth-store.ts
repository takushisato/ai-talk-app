import { defineStore } from "pinia";
import { useBaseUrlStore } from "~/composables/common/base-url";
import type { User, loginResponse } from "~/domain/auth/user";

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
    },
    async fetchUser(postData: { email: string; password: string }) {
      const hostURL = useBaseUrlStore();
      const { data, error } = await useFetch<loginResponse>(hostURL + "/api_token_auth/", {
        method: "POST",
        body: postData,
      });
      console.log(hostURL);
      console.log(data.value);
      console.log(error);
      if (!!error.value) {
        // エラーはそのままreturnして呼び出し元で処理する
        return { result: false, error: error };
      } else {
        // dataの戻り値からtokenを摘出
        const dataValue: any = data.value;
        const token = dataValue.auth_token;
        // tokenをCookieにセット。有効期限はとりあえず24時間（86,400秒）に設定
        useCookie("token", {
          secure: true,
          maxAge: 86400,
        }).value = token;
        return { result: true, error: null };
      }
    },
  },
});
