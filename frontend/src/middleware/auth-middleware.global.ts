import { useAuthStore } from "~/composables/common/use-auth-store";

export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();

  // オートログイン処理
  if (!authStore.isAuthenticated) {
    authStore.authenticateFromCookie();
  }
});
