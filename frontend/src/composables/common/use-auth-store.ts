import { defineStore } from "pinia";
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
    async fetchUser(postData: { email: string; password: string }) {
      const hostURL = "http://localhost:8000";
      const { data, error } = await useFetch<loginResponse>(hostURL + "/api-token-auth/", {
        method: "POST",
        body: postData,
      });
      console.log(data);
      console.log(error);
      return data.value;
    },
  },
});
